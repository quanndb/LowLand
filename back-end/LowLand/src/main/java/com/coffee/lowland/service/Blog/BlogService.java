package com.coffee.lowland.service.Blog;

import com.coffee.lowland.DTO.request.blog.CreateBlogRequest;
import com.coffee.lowland.DTO.response.blog.BlogDetails;
import com.coffee.lowland.DTO.response.blog.Blogs;
import com.coffee.lowland.DTO.response.blog.DetailsAuthor;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.Mongo.repository.BlogRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.BlogMapper;
import com.coffee.lowland.model.Blog;
import com.coffee.lowland.service.Account.AccountService;
import com.coffee.lowland.service.Account.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogService {

    BlogRepository blogRepository;
    AuthenticationService authenticationService;
    AccountService accountService;
    MongoTemplate mongoTemplate;
    BlogMapper blogMapper;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public Blog createBlog(CreateBlogRequest req){
        Blog request = blogMapper.createBlog(req);
        request.setIsActive(true);
        request.setBlogId(UUID.randomUUID().toString());
        request.setAccountId(authenticationService.getMyInfo().getAccountId());
        request.setDate(LocalDateTime.now());
        return blogRepository.save(request);
    }

    public PageServiceResponse<Blogs> getBlogs(Integer page, Integer size, String query,
                                              String sortedBy, String sortDirection,
                                              String accountId, String categoryId, Boolean isActive) {
        List<Criteria> criteriaList = new ArrayList<>();
        criteriaList.add(Criteria.where("blogId").exists(true));
        if (query != null && !query.isEmpty()) {
            criteriaList.add(Criteria.where("blogId").regex(query, "i"));
            criteriaList.add(Criteria.where("title").regex(query, "i"));
            criteriaList.add(Criteria.where("accountId").regex(query, "i"));
            criteriaList.add(Criteria.where("categoryId").regex(query, "i"));
            criteriaList.add(Criteria.where("description").regex(query, "i"));
            criteriaList.add(Criteria.where("content.data").regex(query, "i"));
            criteriaList.add(Criteria.where("content.title").regex(query, "i"));
            criteriaList.add(Criteria.where("dateString").regex(query, "i"));
            criteriaList.add(Criteria.where("lastUpdateString").regex(query, "i"));
            criteriaList.add(Criteria.where("updatedBy").regex(query, "i"));
        }

        if (accountId != null && !accountId.isEmpty()) {
            criteriaList.add(Criteria.where("accountId").is(accountId));
        }
        if (categoryId != null && !categoryId.isEmpty()) {
            criteriaList.add(Criteria.where("categoryId").is(categoryId));
        }
        if (isActive != null) {
            criteriaList.add(Criteria.where("isActive").is(isActive));
        }

        ProjectionOperation project = Aggregation.project()
                .andExpression("date").dateAsFormattedString().as("dateString")
                .andExpression("lastUpdate").dateAsFormattedString().as("lastUpdateString")
                .and("blogId").as("blogId")
                .and("accountId").as("accountId")
                .and("categoryId").as("categoryId")
                .and("imageURL").as("imageURL")
                .and("title").as("title")
                .and("date").as("date")
                .and("lastUpdate").as("lastUpdate")
                .and("updatedBy").as("updatedBy")
                .and("description").as("description")
                .and("content").as("content")
                .and("isActive").as("isActive");

        Aggregation aggregation = Aggregation.newAggregation(
                project,
                Aggregation.match(new Criteria().andOperator(criteriaList.toArray(new Criteria[0]))),
                Aggregation.sort(Sort.by(Sort.Direction.fromString(sortDirection),sortedBy)),
                Aggregation.skip((long) (page - 1) * size),
                Aggregation.limit(size)
        );

        List<Blogs> res = mongoTemplate.aggregate(aggregation, Blog.class, Blogs.class)
                                            .getMappedResults();

        Query mongoQuery = new Query(new Criteria()
                .andOperator(criteriaList.toArray(new Criteria[0])));

        long count = mongoTemplate.count(mongoQuery, Blog.class);

        Boolean isFirst = page == 1;
        Boolean isLast =  ((long) page * size) >= count;

        return PageServiceResponse.<Blogs>builder()
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

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public Blog updateBlog(String blogId, CreateBlogRequest req){
        Blog found = blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        blogMapper.update(found, req);
        return blogRepository.save(found);
    }

    public BlogDetails getDetails(String blogId) {
        Blog found =  blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        if(!found.getIsActive()) throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        DetailsAuthor foundAuthor = accountService.getAuthorInfo(found.getAccountId());
        var res = BlogDetails.builder().author(foundAuthor).build();
        blogMapper.getDetails(res, found);
        return res;
    }

    public PageServiceResponse<Blogs> getAuthorBlogs(String authorId,
                                      Integer page, Integer size, String query,
                                      String sortedBy, String sortDirection,
                                      String categoryId, Boolean isActive) {
        return getBlogs(page, size, query,
                sortedBy, sortDirection, authorId, categoryId, isActive);
    }

    public boolean isExitsBlog(String blogId){
        return blogRepository.existsByBlogId(blogId);
    }
}
