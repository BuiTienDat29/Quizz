package com.studyapp.controller;

import com.studyapp.dto.QuizSessionResponseDTO;
import com.studyapp.dto.QuizSubmissionRequestDTO;
import com.studyapp.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    @PostMapping("/submit")
    public QuizSessionResponseDTO submitQuiz(@RequestBody QuizSubmissionRequestDTO request) {
        return quizService.submitQuiz(request);
    }

    @GetMapping("/session/{sessionId}")
    public com.studyapp.dto.QuizSessionDetailDTO getSessionDetail(@PathVariable Long sessionId) {
        return quizService.getSessionDetail(sessionId);
    }
}
