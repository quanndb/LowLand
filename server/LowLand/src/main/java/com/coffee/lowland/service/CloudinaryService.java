package com.coffee.lowland.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;
import java.nio.file.Files;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class CloudinaryService {
    Cloudinary cloudinary;
    public CloudinaryService(@Value("${CLOUD_NAME}") String cloudName,
                             @Value("${API_KEY}") String apiKey,
                             @Value("${API_SECRET}") String apiSecret) {
        Map<String, String> valuesMap = new HashMap<>();
        valuesMap.put("cloud_name", cloudName);
        valuesMap.put("api_key", apiKey);
        valuesMap.put("api_secret", apiSecret);
        cloudinary = new Cloudinary(valuesMap);
    }

    public Map upload(File file) throws IOException {
        // File file = convert(multipartFile);
        Map result = cloudinary.uploader().upload(file, ObjectUtils.asMap("overwrite", true));
        if (!Files.deleteIfExists(file.toPath())) {
            throw new IOException("Failed to delete temporary file: " + file.getAbsolutePath());
        }
        return result;
    }

    public Map delete(String id) throws IOException {
        return cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(String.valueOf(multipartFile));
        try (FileOutputStream fo = new FileOutputStream(file)) {
            fo.write(multipartFile.getBytes());
        }
        return file;
    }

    public File convertToMultipartFile(String base64String) throws IOException {
        if (base64String.startsWith("data:image/jpeg;base64,")) {
            base64String = base64String.substring("data:image/jpeg;base64,".length());
        } else if (base64String.startsWith("data:image/png;base64,")) {
            base64String = base64String.substring("data:image/png;base64,".length());
        }
        byte[] decodedBytes = Base64.getDecoder().decode(base64String);

        File tempFile = File.createTempFile("base64Temp", ".jpeg");
        tempFile.deleteOnExit();
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(decodedBytes);
        }

        return tempFile;
    }

}