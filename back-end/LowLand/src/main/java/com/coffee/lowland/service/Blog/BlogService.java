package com.coffee.lowland.service.Blog;

import com.coffee.lowland.DTO.request.blog.BlogContentDTO;
import com.coffee.lowland.DTO.request.blog.CreateNewBlogRequest;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.DTO.response.blog.BlogDetails;
import com.coffee.lowland.DTO.response.blog.Blogs;
import com.coffee.lowland.DTO.response.blog.DetailsAuthor;
import com.coffee.lowland.DTO.response.utilities.CloudResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.Mongo.repository.BlogImageRepository;
import com.coffee.lowland.Mongo.repository.BlogRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.AccountMapper;
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
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    AccountMapper accountMapper;
    MongoTemplate mongoTemplate;
    BlogMapper blogMapper;
    FileHashingService fileHashingService;

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public Blog createBlog(CreateNewBlogRequest request, List<MultipartFile> images) throws IOException, NoSuchAlgorithmException {
        String blogId = UUID.randomUUID().toString();
        Blog req = blogMapper.createBlog(request);
        categoryService.getOrCreate(request.getCategoryName());
        Map<String, String> savedImages = uploadBlogImage(blogId, request, images);
        req.setBlogId(blogId);
        req.setIsActive(true);
        req.setViews(0);
        req.setAccountId(authenticationService.getMyInfo().getAccountId());
        req.setDate(LocalDateTime.now(ZoneId.of("UTC+7")));
        if(savedImages.get(req.getImageURL()) != null){
            req.setImageURL(savedImages.get(req.getImageURL()));
        }
        for(BlogContent item : req.getContent()){
            String data = item.getData();
            if(Objects.equals(item.getType(), "img") && data != null
                    && savedImages.get(data) != null){
                item.setData(savedImages.get(data));
            }
        }
        return blogRepository.save(req);
    }

    public PageServiceResponse<Blogs> getBlogs(Integer page, Integer size, String query,
                                              String sortedBy, String sortDirection,
                                              String accountId, String categoryName, Boolean isActive) {
        List<Criteria> criteriaList = new ArrayList<>();
        List<Criteria> queryCriteriaList = new ArrayList<>();

        if (accountId != null && !accountId.isEmpty()) {
            criteriaList.add(Criteria.where("accountId").is(accountId));
        }
        if (categoryName != null && !categoryName.isEmpty()) {
            criteriaList.add(Criteria.where("categoryName").is(categoryName));
        }
        if (isActive != null) {
            criteriaList.add(Criteria.where("isActive").is(isActive));
        }

         if (query != null && !query.isEmpty()) {
           // Add query criteria to queryCriteriaList
             String regex = ".*" + query + ".*"; // Adjust regex as needed
             queryCriteriaList.add(Criteria.where("blogId").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("title").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("accountId").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("categoryName").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("description").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("content.data").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("content.title").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("dateString").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("lastUpdateString").regex(regex, "i"));
             queryCriteriaList.add(Criteria.where("updatedBy").regex(regex, "i"));
        }


        ProjectionOperation project = Aggregation.project()
                .andExpression("date").dateAsFormattedString().as("dateString")
                .andExpression("lastUpdate").dateAsFormattedString().as("lastUpdateString")
                .and("blogId").as("blogId")
                .and("accountId").as("accountId")
                .and("author").as("author")
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

        List<AggregationOperation> aggregationOperations = new ArrayList<>();
        aggregationOperations.add(project);
        if (!queryCriteriaList.isEmpty()) {
            aggregationOperations.add(Aggregation.match(new Criteria().orOperator(queryCriteriaList)));
        }
        if (!criteriaList.isEmpty()) {
             aggregationOperations.add(Aggregation.match(new Criteria().andOperator(criteriaList)));
        }
        aggregationOperations.add(Aggregation.sort(Sort.by(Sort.Direction.fromString(sortDirection), sortedBy)));
        aggregationOperations.add(Aggregation.skip((long) (page - 1) * size));
        aggregationOperations.add(Aggregation.limit(size));

        Aggregation aggregation = Aggregation.newAggregation(aggregationOperations);
        List<Blogs> res = mongoTemplate.aggregate(aggregation, Blog.class, Blogs.class)
                                            .getMappedResults();
        for(Blogs item : res){
            item.setAuthor(getDetailAuthorByAccountId(item.getAccountId()));
            item.setAccountId(null);
        }

        Criteria combinedCriteria = new Criteria();
        if (!queryCriteriaList.isEmpty()) {
            combinedCriteria = combinedCriteria.orOperator(queryCriteriaList);
        }
        if (!criteriaList.isEmpty()) {
            combinedCriteria = combinedCriteria.andOperator(criteriaList);
        }
        Query mongoQuery = new Query(combinedCriteria);
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
    public Blog updateBlog(String blogId,CreateNewBlogRequest request, List<MultipartFile> images) throws IOException, NoSuchAlgorithmException {
        Blog found = blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        blogMapper.update(found, request);
        categoryService.getOrCreate(request.getCategoryName());
        Map<String, String> savedImages = uploadBlogImage(blogId,request,images);
        if(savedImages.get(found.getImageURL()) != null){
            found.setImageURL(savedImages.get(found.getImageURL()));
        }
        for(BlogContent item : found.getContent()){
            String data = item.getData();
            if(Objects.equals(item.getType(), "img") && data != null
                    && savedImages.get(data) != null){
                 item.setData(savedImages.get(data));
            }
        }
        found.setUpdatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        found.setLastUpdate(LocalDateTime.now(ZoneId.of("UTC+7")));
        deleteAllUnusedImages(found);
        return blogRepository.save(found);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','EMPLOYEE')")
    public String deleteBLog(String blogId) throws IOException {
        blogRepository.findBlogByBlogId(blogId)
                .orElseThrow(()->new AppExceptions(ErrorCode.BLOG_NOT_FOUND));
        List<BlogImage> images = blogImageRepository.findAllByBlogId(blogId);
        for(BlogImage item : images){
            cloudinaryService.delete(item.getCloudId());
        }
        blogImageRepository.deleteAllByBlogId(blogId);
        interactService.deleteBlogInteraction(blogId);
        blogRepository.deleteByBlogId(blogId);
        return "Delete blog successfully!";
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

    public Map<String, String> uploadBlogImage(String blogId,
                                               CreateNewBlogRequest request,
                                               List<MultipartFile> images) throws IOException, NoSuchAlgorithmException {
        Map<String, String> savedImage = new HashMap<>();
        if(images != null){
            Map<String, MultipartFile> hashedImage = new HashMap<>();
//      step 1: get hashed image
            for(MultipartFile item : images){
                String hashed = fileHashingService.hashFile(item);
                hashedImage.put(hashed, item);
            }
//      step 2: loop through content that contains images then upload them if it contains true hexString
            MultipartFile banner = hashedImage.get(request.getImageURL());
            if(banner != null){
                uploader(savedImage,blogId,request.getImageURL(),banner);
            }
            for(BlogContentDTO item : request.getContent()){
                if(Objects.equals(item.getType(), "img")){
                    MultipartFile file = hashedImage.get(item.getData());
                    if(file != null){
                        uploader(savedImage,blogId,item.getData(),file);
                    }
                }
            }
        }
        return savedImage;
    }

    public void uploader(Map<String, String> savedImage,
                         String blogId, String hexString, MultipartFile file) throws IOException {
        if(savedImage.get(hexString) == null){
            Map<?,?> res = cloudinaryService.upload(file);
            CloudResponse mappedRes = cloudImageMapper.toCloudResponse(res);
            blogImageRepository.save(BlogImage.builder()
                    .imageURL(mappedRes.getUrl())
                    .cloudId(mappedRes.getPublicId())
                    .hexString(hexString)
                    .blogId(blogId)
                    .fileName(mappedRes.getOriginalFilename())
                    .build());
            savedImage.put(hexString, mappedRes.getUrl());
        }
    }

    public void deleteAllUnusedImages(Blog current) throws IOException {
        List<String> allBlogImageURL = new ArrayList<>();
        if(current.getImageURL() != null
                && current.getImageURL().startsWith("http"))
                    allBlogImageURL.add(current.getImageURL());
        for(BlogContent item : current.getContent()){
            if(Objects.equals(item.getType(), "img") && item.getData() != null
                    && item.getData().startsWith("http")){
                allBlogImageURL.add(item.getData());
            }
        }
        List<BlogImage> allBlogImage = blogImageRepository
                .findAllByBlogId(current.getBlogId());
        allBlogImage.removeIf(item -> allBlogImageURL.contains(item.getImageURL()));
        for(BlogImage item : allBlogImage){
            cloudinaryService.delete(item.getCloudId());
        }
        blogImageRepository.deleteAll(allBlogImage);
    }

    public PageServiceResponse<Blogs> getAuthorBlogs(String authorId,
                                      Integer page, Integer size, String query,
                                      String sortedBy, String sortDirection,
                                      String categoryName, Boolean isActive) {
        return getBlogs(page, size, query,
                sortedBy, sortDirection, authorId, categoryName, isActive);
    }

    public boolean isExitsBlog(String blogId){
        return blogRepository.existsByBlogId(blogId);
    }

    public DetailsAuthor getDetailAuthorByAccountId(String accountId){
        UserResponse found = accountService.getInfoAfterAuthenticated(accountId);
        return accountMapper.UserResponseToAuthor(found);
    }
}
