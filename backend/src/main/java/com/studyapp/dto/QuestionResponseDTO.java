package com.studyapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuestionResponseDTO {
    private Long id;
    private Long topicId;
    private String content;
    private String type;
    private String source;
    private String explanation;
    private List<AnswerDTO> answers;
}
