package com.ssafy.enjoytrip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.enjoytrip.service.ImageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


@RequestMapping("/images")
@Controller
@Tag(name = "Image API", description = "이미지 업로드 관련 API")
public class ImageController {
	private ImageService imageService;
	
	@Autowired
	public ImageController(ImageService imageService) {
		this.imageService = imageService;
	}
	

	@PostMapping
	@Operation(
	    summary = "이미지 업로드",
	    description = "게시글 번호와 함께 이미지를 업로드하고 이미지 URL을 반환합니다."
	)
	@ApiResponses({
	    @ApiResponse(
	        responseCode = "200",
	        description = "이미지 업로드 성공",
	        content = @Content(mediaType = "text/plain", schema = @Schema(example = "https://example.com/images/123.jpg"))
	    ),
	    @ApiResponse(
	        responseCode = "500",
	        description = "이미지 업로드 실패",
	        content = @Content(mediaType = "text/plain", schema = @Schema(example = "이미지 업로드 실패"))
	    )
	})
	public ResponseEntity<String> uploadImage(
	    @Parameter(description = "업로드할 이미지 파일", required = true)
	    @RequestParam("image") MultipartFile imageFile,

	    @Parameter(description = "게시글 번호", required = true, example = "1001")
	    @RequestParam("postNo") Long postNo
	) {

        try {
            // 서비스에서 이미지 업로드 처리
            String imageUrl = imageService.upload(postNo, imageFile);
            return ResponseEntity.ok(imageUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
