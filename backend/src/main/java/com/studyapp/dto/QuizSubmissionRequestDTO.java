package com.studyapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuizSubmissionRequestDTO {
    private Long topicId;
    private List<QuizAnswerSubmitDTO> answers;
}
