package com.studyapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class AiQuestionDTO {
    private String content;
    private String type;
    private String explanation;
    private List<AiAnswerDTO> answers;

    @Data
    public static class AiAnswerDTO {
        private String content;
        private Boolean isCorrect;
    }
}
