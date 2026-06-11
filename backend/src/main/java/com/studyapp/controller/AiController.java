package com.studyapp.controller;

import com.studyapp.dto.AiGenerateRequestDTO;
import com.studyapp.service.OllamaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final OllamaService ollamaService;

    public AiController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateQuestions(@RequestBody AiGenerateRequestDTO request) {
        try {
            ollamaService.generateQuestions(request);
            return ResponseEntity.ok().body("{\"message\": \"Generated successfully\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
