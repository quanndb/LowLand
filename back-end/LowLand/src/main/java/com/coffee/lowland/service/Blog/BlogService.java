package com.coffee.lowland.service.Blog;

import com.coffee.lowland.DTO.request.blog.CreateNewBlogRequest;
import com.coffee.lowland.DTO.response.blog.BlogDetails;
import com.coffee.lowland.DTO.response.blog.Blogs;
import com.coffee.lowland.DTO.response.blog.DetailsAuthor;
import com.coffee.lowland.DTO.response.utilities.CloudResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.Mongo.repository.BlogImageRepository;
import com.coffee.lowland.Mongo.repository.BlogRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.BlogMapper;
import com.coffee.lowland.mapper.CloudImageMapper;
import com.coffee.lowland.model.Blog;
import com.coffee.lowland.model.BlogContent;
import com.coffee.lowland.model.BlogImage;
import com.coffee.lowland.service.Account.AccountService;
import com.coffee.lowland.service.Account.AuthenticationService;
import com.coffee.lowland.service.Utilities.CloudinaryService;
import com.coffee.lowland.service.Utilities.FileHashingService;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogService {

    BlogRepository blogRepository;
    CategoryService categoryService;
    BlogImageRepository blogImageRepository;
    InteractService interactService;
    CloudinaryService cloudinaryService;
    CloudImageMapper cloudImageMapper;
    AuthenticationService authenticationService;
    AccountService accountService;
    MongoTemplate mongoTemplate;
    BlogMapper blogMapper;
    FileHashingService fileHashingService;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public Blog createBlog(CreateNewBlogRequest request, MultipartFile[] images) throws IOException, NoSuchAlgorithmException {
        String blogId = UUID.randomUUID().toString();
        Map<String, CloudResponse> imagesSaved = new HashMap<>();
        for(MultipartFile item : images){
            Map<?,?> res = cloudinaryService.upload(item);
            CloudResponse mappedRes = cloudImageMapper.toCloudResponse(res);
            String hashed = fileHashingService.hashFile(item);
            imagesSaved.put(hashed,mappedRes);
            blogImageRepository.save(BlogImage.builder()
                            .imageURL(mappedRes.getUrl())
                            .cloudId(mappedRes.getPublicId())
                            .hexString(hashed)
                            .blogId(blogId)
                            .fileName(mappedRes.getOriginalFilename())
                    .build());
        }
        categoryService.getOrCreate(request.getCategoryName());
        Blog req = blogMapper.createBlog(request);
        req.setBlogId(blogId);
        req.setIsActive(true);
        req.setViews(0);
        req.setAccountId(authenticationService.getMyInfo().getAccountId());
        req.setDate(LocalDateTime.now());
        req.setImageURL(imagesSaved.get(req.getImageURL()).getUrl());
        for(BlogContent item : req.getContent()){
            String data = item.getData();
            if(Objects.equals(item.getType(), "img") && data != null){
                String imageURL = imagesSaved.get(data).getUrl();
                item.setData(imageURL);
            }
        }
        return blogRepository.save(req);
    }

  public PageServiceResponse<Blogs> getBlogs(Integer page, Integer size, String query,
                                              String sortedBy, String sortDirection,
                                              String accountId, String categoryName, Boolean isActive) {
        List<Criteria> criteriaList = new ArrayList<>();
        criteriaList.add(Criteria.where("blogId").exists(true));
        if (query != null && !query.isEmpty()) {
            criteriaList.add(Criteria.where("blogId").regex(query, "i"));
            criteriaList.add(Criteria.where("title").regex(query, "i"));
            criteriaList.add(Criteria.where("accountId").regex(query, "i"));
            criteriaList.add(Criteria.where("categoryName").regex(query, "i"));
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
        if (categoryName != null && !categoryName.isEmpty()) {
            criteriaList.add(Criteria.where("categoryName").is(categoryName));
        }
        if (isActive != null) {
            criteriaList.add(Criteria.where("isActive").is(isActive));
        }

        ProjectionOperation project = Aggregation.project()
                .andExpression("date").dateAsFormattedString().as("dateString")
                .andExpression("lastUpdate").dateAsFormattedString().as("lastUpdateString")
                .and("blogId").as("blogId")
                .and("accountId").as("accountId")
                .and("categoryName").as("categoryName")
                .and("imageURL").as("imageURL")
                .and("title").as("title")
                .and("date").as("date")
                .and("lastUpdate").as("lastUpdate")
                .and("updatedBy").as("updatedBy")
                .and("description").as("description")
                .and("content").as("content")
                .and("isActive").as("isActive")
                .and("views").as("views");

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
    public Blog updateBlog(String blogId,CreateNewBlogRequest request, MultipartFile[] images){
        Blog found = blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        blogMapper.update(found, request);
        return blogRepository.save(found);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public void deleteBLog(String blogId) throws IOException {
        blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        List<BlogImage> images = blogImageRepository.findAllByBlogId(blogId);
        for(BlogImage item : images){
            cloudinaryService.delete(item.getCloudId());
        }
        blogImageRepository.deleteAllByBlogId(blogId);
        interactService.deleteBlogInteraction(blogId);
        blogRepository.deleteById(blogId);
    }

    public BlogDetails getDetails(String blogId) {
        Blog found =  blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        found.setViews(found.getViews() + 1);
        blogRepository.save(found);
        if(!found.getIsActive()) throw new AppExceptions(ErrorCode.BLOG_NOT_FOUND);
        DetailsAuthor foundAuthor = accountService.getAuthorInfo(found.getAccountId());
        var res = BlogDetails.builder().author(foundAuthor).build();
        blogMapper.getDetails(res, found);
        return res;
    }

    public void deleteBlogImage(String blogId, String imageUrl) throws IOException {
        Blog found =  blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        for(BlogContent item : found.getContent()){
            if(Objects.equals(item.getType(), "img") && Objects.equals(item.getData(), imageUrl)){
                BlogImage foundImage = blogImageRepository
                        .findByImageURL(imageUrl);
                cloudinaryService.delete(foundImage.getCloudId());
                blogImageRepository.delete(foundImage);
            }
        }
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
