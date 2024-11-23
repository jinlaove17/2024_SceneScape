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
import com.ssafy.enjoytrip.model.dto.ImageDTO;

@Service
public class ImageService {
    private ImageDAO imageDao;
    private String basePath = "http://localhost:8080/";
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

    public String upload(Long postNo, MultipartFile image) {
        // 1. 저장할 디렉토리 경로 설정
        String directoryPath = mediaPath + "/" + postNo;
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs(); // 경로가 없으면 생성
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
        
        // 브라우저 접근 가능한 URL로 변경
        String url = basePath + "media/" + postNo + "/" + fileName;
        System.out.println("imageService: " + url);
        
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setPostNo(postNo);
        imageDTO.setUrl(url);
        imageDTO.setMediaType("IMAGE");

        imageDao.insert(imageDTO); // 데이터베이스에 이미지 정보 저장

        // 4. 저장된 파일의 URL 반환
        return url;
    }

}