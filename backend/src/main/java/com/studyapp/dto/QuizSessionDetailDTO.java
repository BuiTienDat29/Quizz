package com.studyapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuizSessionDetailDTO {
    private Long sessionId;
    private String topicName;
    private Integer score;
    private Integer total;
    private List<QuizAnswerDetailDTO> answers;
}
