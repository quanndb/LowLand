package com.coffee.lowland.controller;


import com.coffee.lowland.service.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping ("/images")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ImageController {

    CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<Object> upload(@RequestParam("file") File multipartFile) throws IOException {
        if (ImageIO.read(multipartFile) == null) {
            return new ResponseEntity<>("Image non valid!", HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> upload(@RequestParam String id) throws IOException {
        Map result = cloudinaryService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
