package com.studyapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuestionRequestDTO {
    private Long topicId;
    private String content;
    private String type; // MULTIPLE_CHOICE or ESSAY
    private String source;
    private String explanation;
    private List<AnswerDTO> answers;
}
