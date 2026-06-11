package com.studyapp.dto;

import lombok.Data;

@Data
public class AnswerDTO {
    private Long id;
    private String content;
    private Boolean isCorrect;
}
