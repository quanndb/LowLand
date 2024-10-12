package com.coffee.lowland.service.Blog;

import com.coffee.lowland.DTO.request.blog.CommentAResponse;
import com.coffee.lowland.DTO.request.blog.CommentBlog;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.DTO.response.blog.CommentsResponse;
import com.coffee.lowland.DTO.response.blog.PostCommentResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.Mongo.repository.CommentRepository;
import com.coffee.lowland.Mongo.repository.LikeRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Comment;
import com.coffee.lowland.model.Like;
import com.coffee.lowland.service.Account.AccountService;
import com.coffee.lowland.service.Account.AuthenticationService;
import com.coffee.lowland.service.Account.SecurityService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InteractService {
    CommentRepository commentRepository;
    LikeRepository likeRepository;
    AuthenticationService authenticationService;
    AccountService accountService;
    SecurityService securityService;
    MongoTemplate mongoTemplate;

    public String getLikedAndTotalOfBlog(String blogId){
        return "{" +
                "\"isLiked\":" + (getCurrentAccountId()!=null && likeRepository.existsByBlogIdAndAccountId(blogId, getCurrentAccountId()))+"," +
                "\"totalLikes\":" + likeRepository.countByBlogId(blogId)+","+
                "\"totalComments\":"+ commentRepository.countByBlogId(blogId)+
                "}";
    }

    public String changeLikeBlog(String blogId) {
        String accountId = getCurrentAccountId();
        if(accountId == null) throw new AppExceptions(ErrorCode.UNAUTHENTICATED);
        Like existingLike = likeRepository.findByBlogIdAndAccountId(blogId, accountId)
                .orElse(null);
        if (existingLike != null) {
            likeRepository.delete(existingLike);
        } else {
            Like newLike = Like.builder()
                    .likedDate(LocalDateTime.now(ZoneId.of("UTC+7")))
                    .blogId(blogId)
                    .accountId(accountId)
                    .build();
            likeRepository.save(newLike);
        }
        return "Change success";
    }

    public String changeLikeComment(String blogId, String commentId,String parentsId) {
        String accountId = getCurrentAccountId();
        if(accountId == null) throw new AppExceptions(ErrorCode.UNAUTHENTICATED);
        Like existingLike = likeRepository.findByCommentIdAndAccountId(new ObjectId(commentId), accountId)
                .orElse(null);
        if (existingLike != null) {
            likeRepository.delete(existingLike);
        } else {
            Like newLike = Like.builder()
                    .likedDate(LocalDateTime.now(ZoneId.of("UTC+7")))
                    .commentId(new ObjectId(commentId))
                    .blogId(blogId)
                    .parentsId(new ObjectId(parentsId!=null?parentsId:commentId))
                    .accountId(accountId)
                    .build();
            likeRepository.save(newLike);
        }
        return "Change success";
    }

    public PageServiceResponse<CommentsResponse> getCommentsPage(String blogId, String parentsId, int page, int size, String query,
                                                                 String sortedBy, String sortDirection,
                                                                 String accountId) {
        String currentAccountId = getCurrentAccountId();
        List<Criteria> criteriaList = new ArrayList<>();
        if(blogId != null && !blogId.isEmpty())
            criteriaList.add(Criteria.where("blogId").is(blogId));
        if(parentsId != null && !parentsId.isEmpty())
            criteriaList.add(Criteria.where("parentsId").is(new ObjectId(parentsId)));
        else criteriaList.add(Criteria.where("parentsId").exists(false));
        if (query != null && !query.isEmpty()) {
            criteriaList.add(Criteria.where("blogId").regex(query, "i"));
            criteriaList.add(Criteria.where("accountId").regex(query, "i"));
            criteriaList.add(Criteria.where("commentId").regex(query, "i"));
            criteriaList.add(Criteria.where("content").regex(query, "i"));
            criteriaList.add(Criteria.where("commentedDateString").regex(query, "i"));
        }

        if (accountId != null && !accountId.isEmpty()) {
            criteriaList.add(Criteria.where("accountId").is(accountId));
        }

        ProjectionOperation project = Aggregation.project()
                .andExpression("commentedDate").dateAsFormattedString().as("commentedDateString")
                .and("blogId").as("blogId")
                .and("accountId").as("accountId")
                .and("email").as("email")
                .and("imageURL").as("imageURL")
                .and("commentId").as("commentId")
                .and("replyTo").as("replyTo")
                .and("parentsId").as("parentsId")
                .and("content").as("content")
                .and("commentedDate").as("commentedDate")
                .and("updatedDate").as("updatedDate")
                .and("updatedBy").as("updatedBy")
                .and("isLiked").as("isLiked")
                .and("totalLikes").as("totalLikes")
                .and("totalComments").as("totalComments");

        LookupOperation lookupLike = Aggregation
                .lookup("like","_id","commentId","likes");
        LookupOperation lookupComment;
        if(parentsId != null && !parentsId.isEmpty()){
            lookupComment = Aggregation
                    .lookup("comment","_id","commentId","subComments");
        }else lookupComment = Aggregation
                .lookup("comment","_id","parentsId","subComments");
        AggregationOperation addLikesCountAndIsLiked = context -> new Document("$addFields",
                new Document("totalLikes", new Document("$size", "$likes"))
                        .append("totalComments", new Document("$size", "$subComments"))
                        .append("isLiked",
                                currentAccountId!=null ?
                                        new Document("$in", List.of(currentAccountId, "$likes.accountId"))
                                        : false));

        Aggregation aggregation = Aggregation.newAggregation(
                lookupLike,
                lookupComment,
                addLikesCountAndIsLiked,
                Aggregation.match(new Criteria().andOperator(criteriaList.toArray(new Criteria[0]))),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "totalLikes", "totalComments","commentId")
                                .and(Sort.by(Sort.Direction.fromString(sortDirection), sortedBy))),
                Aggregation.skip((long) (page - 1) * size),
                Aggregation.limit(size),
                project
        );

        List<CommentsResponse> res = mongoTemplate.aggregate(aggregation, Comment.class, CommentsResponse.class)
                .getMappedResults();
        for(CommentsResponse item : res){
            Account found = accountService.findAccountById(item.getAccountId());
            item.setEmail(found.getEmail());
            item.setImageURL(found.getImageURL());
        }

        Query mongoQuery = new Query(new Criteria()
                .andOperator(criteriaList.toArray(new Criteria[0])));

        long count = mongoTemplate.count(mongoQuery, Comment.class);

        Boolean isFirst = page == 1;
        Boolean isLast =  ((long) page * size) >= count;

        return PageServiceResponse.<CommentsResponse>builder()
                .totalRecords((int)count)
                .totalPages((int) Math.ceil((double) count / size))
                .page(page)
                .isFirst(isFirst)
                .isLast(isLast)
                .size(size)
                .query(query)
                .sortedBy(sortedBy)
                .sortDirection(sortDirection)
                .response(res)
                .build();
    }

    public PostCommentResponse commentBlog(String blogId, CommentBlog content) {
        String accountId = getCurrentAccountId();
        if(accountId == null) throw new AppExceptions(ErrorCode.UNAUTHENTICATED);
        Comment newComment = commentRepository.save(Comment.builder()
                        .commentedDate(LocalDateTime.now(ZoneId.of("UTC+7")))
                        .content(content.getContent())
                        .blogId(blogId)
                        .accountId(accountId)
                .build());
        return PostCommentResponse.builder()
                ._id(newComment.get_id().toHexString())
                .accountId(newComment.getAccountId())
                .blogId(newComment.getBlogId())
                .content(newComment.getContent())
                .commentedDate(newComment.getCommentedDate())
                .build();
    }
    public PostCommentResponse commentResponse(String blogId, String parentsId, String commentId, CommentAResponse content) {
        String accountId = getCurrentAccountId();
        if(accountId == null) throw new AppExceptions(ErrorCode.UNAUTHENTICATED);
        Comment parentComment = commentRepository.findById(commentId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.COMMENT_NOT_FOUND));
        String replyTo = accountService.findAccountById(parentComment.getAccountId()).getEmail();
        Comment newComment = commentRepository.save(Comment.builder()
                .commentedDate(LocalDateTime.now(ZoneId.of("UTC+7")))
                .content(content.getContent())
                .blogId(blogId)
                .parentsId(new ObjectId(parentsId))
                .commentId(new ObjectId(commentId))
                .replyTo(replyTo)
                .accountId(accountId)
                .build());

        return PostCommentResponse.builder()
                ._id(newComment.get_id().toHexString())
                .accountId(newComment.getAccountId())
                .blogId(newComment.getBlogId())
                .content(newComment.getContent())
                .commentedDate(newComment.getCommentedDate())
                .commentId(newComment.getCommentId().toHexString())
                .replyTo(newComment.getReplyTo())
                .parentsId(newComment.getParentsId().toHexString())
                .build();
    }


    public String deleteComment(String commentId){
        Comment foundComment = commentRepository.findById(commentId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.COMMENT_NOT_FOUND));
        if(!securityService
                .isIncludeRoleOrOwner(foundComment.getAccountId(), "ADMIN", "EMPLOYEE"))
            throw new AppExceptions(ErrorCode.FORBIDDEN_EXCEPTION);
        if(foundComment.getParentsId() == null){
            commentRepository.deleteAllByParentsId(new ObjectId(commentId));
            likeRepository.deleteAllByParentsId(new ObjectId(commentId));
        }
        commentRepository.deleteById(commentId);
        likeRepository.deleteAllByCommentId(new ObjectId(commentId));
        return "Delete success";
    }

    public void deleteBlogInteraction(String blogId){
        likeRepository.deleteAllByBlogId(blogId);
        commentRepository.deleteAllByBlogId(blogId);
    }

    public Comment updateComment(String commentId, CommentAResponse content){
        Comment foundComment = commentRepository.findById(commentId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.COMMENT_NOT_FOUND));
        if(!securityService
                .isIncludeRoleOrOwner(foundComment.getAccountId(), "ADMIN", "EMPLOYEE"))
            throw new AppExceptions(ErrorCode.FORBIDDEN_EXCEPTION);
        foundComment.setContent(content.getContent());
        foundComment.setUpdatedDate(LocalDateTime.now(ZoneId.of("UTC+7")));
        foundComment.setUpdatedBy(getCurrentUser().getEmail());
        return commentRepository.save(foundComment);
    }

    public boolean isExistsComment(String commentId){
        return commentRepository.existsById(commentId);
    }

    public UserResponse getCurrentUser(){
        try{
            return authenticationService.getMyInfo();
        }
        catch (Exception ignored){
        }
        return null;
    }

    public String getCurrentAccountId(){
        var current = getCurrentUser();
        if(current != null) return current.getAccountId();
        return null;
    }
}
