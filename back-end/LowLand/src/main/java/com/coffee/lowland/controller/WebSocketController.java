package com.coffee.lowland.controller;

import com.coffee.lowland.service.Blog.InteractService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WebSocketController {
    InteractService interactService;

    @MessageMapping("/loadBlogLikes")
    @SendTo("/topic/blogLikes")
    public String loadBlogLikes(String blogId){
        return interactService.getLikedAndTotalOfBlog(blogId);
    }
}
