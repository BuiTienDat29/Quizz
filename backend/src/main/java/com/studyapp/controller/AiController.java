package com.studyapp.controller;

import com.studyapp.dto.AiGenerateRequestDTO;
import com.studyapp.service.AiGenerationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final AiGenerationService aiService;

    public AiController(AiGenerationService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateQuestions(@RequestBody AiGenerateRequestDTO request) {
        try {
            aiService.generateQuestions(request);
            return ResponseEntity.ok().body("{\"message\": \"Generated successfully\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
