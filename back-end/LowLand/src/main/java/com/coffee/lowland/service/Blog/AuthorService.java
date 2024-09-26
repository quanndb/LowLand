package com.coffee.lowland.service.Blog;

import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.DTO.response.blog.DetailsAuthor;
import com.coffee.lowland.Mongo.repository.AuthorRepository;
import com.coffee.lowland.mapper.AccountMapper;
import com.coffee.lowland.model.Author;
import com.coffee.lowland.service.Account.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthorService {

    AuthorRepository authorRepository;

    public Author save(Author request){
        return authorRepository.save(request);
    }

    public Author getOrCreateAuthorByAccountId(String accountId){
        return authorRepository.findByAccountId(accountId)
                .orElseGet(()->save(Author.builder()
                        .accountId(accountId)
                        .build()));
    }
}
