package com.studyapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuizAnswerDetailDTO {
    private Long questionId;
    private String questionContent;
    private String questionType;
    private String explanation;
    
    private Boolean isCorrect;
    private String userAnswerContent;
    
    // Đối với câu trắc nghiệm
    private List<AnswerDTO> options;
}
