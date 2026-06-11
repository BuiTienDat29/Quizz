package com.studyapp.dto;

import lombok.Data;

@Data
public class AiGenerateRequestDTO {
    private Long topicId;
    private String material;
    private Integer questionCount;
    private String questionType; // MULTIPLE_CHOICE or ESSAY
}
