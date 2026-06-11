package com.studyapp.dto;

import lombok.Data;

@Data
public class QuizAnswerSubmitDTO {
    private Long questionId;
    private Long selectedAnswerId;
    private String userAnswerContent;
}
