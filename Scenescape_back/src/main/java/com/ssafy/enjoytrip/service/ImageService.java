package com.ssafy.enjoytrip.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.enjoytrip.model.dao.ImageDAO;

@Service
public class ImageService {
    private ImageDAO imageDao;
    private String mediaPath = "src/main/resources/static/media";
    
    @Autowired
    public ImageService(ImageDAO imageDao) {
        this.imageDao = imageDao;

        // mediaPath 디렉토리가 없으면 생성
        File directory = new File(mediaPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    public String upload(String dirName, MultipartFile image) {
        // 1. media/dirName 경로 생성
        String directoryPath = mediaPath + "/" + dirName;
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 2. 고유한 파일 이름 생성
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(directoryPath, fileName);

        // 3. 파일 저장
        try {
            Files.write(filePath, image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("이미지 저장 중 오류 발생");
        }

        // 4. 저장된 파일의 URL 반환
        return "/" + directoryPath + "/" + fileName;
    }
}
