package com.studyapp.dto;

import lombok.Data;

@Data
public class QuizSessionResponseDTO {
    private Long sessionId;
    private Integer score;
    private Integer total;
}
