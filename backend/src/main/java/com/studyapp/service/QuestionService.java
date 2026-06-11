package com.studyapp.service;

import com.studyapp.dto.AnswerDTO;
import com.studyapp.dto.QuestionRequestDTO;
import com.studyapp.dto.QuestionResponseDTO;
import com.studyapp.entity.Answer;
import com.studyapp.entity.Question;
import com.studyapp.entity.Topic;
import com.studyapp.repository.AnswerRepository;
import com.studyapp.repository.QuestionRepository;
import com.studyapp.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final TopicRepository topicRepository;

    @Transactional
    public QuestionResponseDTO createQuestion(QuestionRequestDTO dto) {
        Topic topic = topicRepository.findById(dto.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        Question question = Question.builder()
                .topic(topic)
                .content(dto.getContent())
                .type(dto.getType())
                .source(dto.getSource())
                .explanation(dto.getExplanation())
                .build();
        
        Question savedQuestion = questionRepository.save(question);
        
        List<AnswerDTO> savedAnswersDto = null;

        if ("MULTIPLE_CHOICE".equals(dto.getType()) && dto.getAnswers() != null) {
            List<Answer> answers = dto.getAnswers().stream().map(a -> Answer.builder()
                    .question(savedQuestion)
                    .content(a.getContent())
                    .isCorrect(a.getIsCorrect())
                    .build()).collect(Collectors.toList());
            
            List<Answer> savedAnswers = answerRepository.saveAll(answers);
            
            savedAnswersDto = savedAnswers.stream().map(a -> {
                AnswerDTO adto = new AnswerDTO();
                adto.setContent(a.getContent());
                adto.setIsCorrect(a.getIsCorrect());
                return adto;
            }).collect(Collectors.toList());
        }

        return mapToResponseDTO(savedQuestion, savedAnswersDto);
    }

    public List<QuestionResponseDTO> getQuestionsByTopic(Long topicId) {
        List<Question> questions = questionRepository.findByTopicId(topicId);
        return questions.stream().map(q -> {
            List<Answer> answers = answerRepository.findByQuestionId(q.getId());
            List<AnswerDTO> answerDTOs = answers.stream().map(a -> {
                AnswerDTO adto = new AnswerDTO();
                adto.setId(a.getId());
                adto.setContent(a.getContent());
                adto.setIsCorrect(a.getIsCorrect());
                return adto;
            }).collect(Collectors.toList());
            return mapToResponseDTO(q, answerDTOs);
        }).collect(Collectors.toList());
    }
    
    private QuestionResponseDTO mapToResponseDTO(Question q, List<AnswerDTO> answers) {
        QuestionResponseDTO res = new QuestionResponseDTO();
        res.setId(q.getId());
        res.setTopicId(q.getTopic().getId());
        res.setContent(q.getContent());
        res.setType(q.getType());
        res.setSource(q.getSource());
        res.setExplanation(q.getExplanation());
        res.setAnswers(answers);
        return res;
    }
}
