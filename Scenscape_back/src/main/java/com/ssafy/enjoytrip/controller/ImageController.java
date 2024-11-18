package com.ssafy.enjoytrip.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.enjoytrip.service.ImageService;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/image")
@Controller
public class ImageController {
	private ImageService imageService;
	
	@Autowired
	public ImageController(ImageService imageService) {
		this.imageService = imageService;
	}
	
    @PostMapping("/uploadImage.do")
    public ResponseEntity<Map<String, Object>> uploadImage(
            @RequestParam("image") MultipartFile imageFile,
            @RequestParam("postNo") Long postNo) {

        Map<String, Object> response = new HashMap<>();
        
        System.out.println("uploadImage: " + postNo);

        try {
            // 서비스에서 이미지 업로드 처리
            String imageUrl = imageService.upload(postNo, imageFile);

            // 응답 데이터 설정
            response.put("url", imageUrl);
            response.put("message", "이미지 업로드 성공");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "이미지 업로드 실패");
            return ResponseEntity.status(500).body(response);
        }
    }
}
