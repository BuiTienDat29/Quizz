package com.studyapp.controller;

import com.studyapp.dto.QuestionRequestDTO;
import com.studyapp.dto.QuestionResponseDTO;
import com.studyapp.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public List<QuestionResponseDTO> getQuestionsByTopic(@RequestParam Long topicId) {
        return questionService.getQuestionsByTopic(topicId);
    }

    @PostMapping
    public QuestionResponseDTO createQuestion(@RequestBody QuestionRequestDTO dto) {
        return questionService.createQuestion(dto);
    }
}
