package com.coffee.lowland.service.Utilities;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
public class FileHashingService {

    public String hashFile(MultipartFile file) throws IOException, NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] fileBytes = file.getBytes();  // Read file bytes
        byte[] hashBytes = digest.digest(fileBytes);  // Hash the bytes

        // Convert hash bytes to a hexadecimal string
        return HexFormat.of().formatHex(hashBytes);
    }
}