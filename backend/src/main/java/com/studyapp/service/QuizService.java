package com.studyapp.service;

import com.studyapp.dto.QuizAnswerSubmitDTO;
import com.studyapp.dto.QuizSessionResponseDTO;
import com.studyapp.dto.QuizSubmissionRequestDTO;
import com.studyapp.entity.Answer;
import com.studyapp.entity.Question;
import com.studyapp.entity.QuizAnswer;
import com.studyapp.entity.QuizSession;
import com.studyapp.entity.Topic;
import com.studyapp.repository.AnswerRepository;
import com.studyapp.repository.QuestionRepository;
import com.studyapp.repository.QuizAnswerRepository;
import com.studyapp.repository.QuizSessionRepository;
import com.studyapp.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final QuizSessionRepository quizSessionRepository;
    private final QuizAnswerRepository quizAnswerRepository;

    @Transactional
    public QuizSessionResponseDTO submitQuiz(QuizSubmissionRequestDTO request) {
        Topic topic = topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        QuizSession session = QuizSession.builder()
                .topic(topic)
                .score(0)
                .total(request.getAnswers() != null ? request.getAnswers().size() : 0)
                .build();
        QuizSession savedSession = quizSessionRepository.save(session);

        int score = 0;

        if (request.getAnswers() != null) {
            for (QuizAnswerSubmitDTO ansDTO : request.getAnswers()) {
                Question question = questionRepository.findById(ansDTO.getQuestionId()).orElse(null);
                if (question == null) continue;

                boolean isCorrect = false;

                if ("MULTIPLE_CHOICE".equals(question.getType())) {
                    if (ansDTO.getSelectedAnswerId() != null) {
                        Answer selectedAns = answerRepository.findById(ansDTO.getSelectedAnswerId()).orElse(null);
                        if (selectedAns != null) {
                            ansDTO.setUserAnswerContent(selectedAns.getContent());
                            if (Boolean.TRUE.equals(selectedAns.getIsCorrect())) {
                                isCorrect = true;
                                score++;
                            }
                        }
                    }
                }

                QuizAnswer quizAnswer = QuizAnswer.builder()
                        .session(savedSession)
                        .question(question)
                        .isCorrect(isCorrect)
                        .userAnswerContent(ansDTO.getUserAnswerContent())
                        .build();
                quizAnswerRepository.save(quizAnswer);
            }
        }

        savedSession.setScore(score);
        quizSessionRepository.save(savedSession);

        QuizSessionResponseDTO response = new QuizSessionResponseDTO();
        response.setSessionId(savedSession.getId());
        response.setScore(score);
        response.setTotal(savedSession.getTotal());
        return response;
    }

    public com.studyapp.dto.QuizSessionDetailDTO getSessionDetail(Long sessionId) {
        QuizSession session = quizSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        java.util.List<QuizAnswer> quizAnswers = quizAnswerRepository.findAll().stream()
                .filter(qa -> qa.getSession().getId().equals(sessionId))
                .toList();

        com.studyapp.dto.QuizSessionDetailDTO dto = new com.studyapp.dto.QuizSessionDetailDTO();
        dto.setSessionId(session.getId());
        dto.setTopicName(session.getTopic().getName());
        dto.setScore(session.getScore());
        dto.setTotal(session.getTotal());

        java.util.List<com.studyapp.dto.QuizAnswerDetailDTO> answerDTOs = new java.util.ArrayList<>();
        for (QuizAnswer qa : quizAnswers) {
            com.studyapp.dto.QuizAnswerDetailDTO ansDto = new com.studyapp.dto.QuizAnswerDetailDTO();
            ansDto.setQuestionId(qa.getQuestion().getId());
            ansDto.setQuestionContent(qa.getQuestion().getContent());
            ansDto.setQuestionType(qa.getQuestion().getType());
            ansDto.setExplanation(qa.getQuestion().getExplanation());
            ansDto.setIsCorrect(qa.getIsCorrect());
            ansDto.setUserAnswerContent(qa.getUserAnswerContent());

            if ("MULTIPLE_CHOICE".equals(qa.getQuestion().getType())) {
                java.util.List<Answer> options = answerRepository.findByQuestionId(qa.getQuestion().getId());
                ansDto.setOptions(options.stream().map(opt -> {
                    com.studyapp.dto.AnswerDTO optDto = new com.studyapp.dto.AnswerDTO();
                    optDto.setId(opt.getId());
                    optDto.setContent(opt.getContent());
                    optDto.setIsCorrect(opt.getIsCorrect());
                    return optDto;
                }).toList());
            }

            answerDTOs.add(ansDto);
        }

        dto.setAnswers(answerDTOs);
        return dto;
    }
}
