package com.studyapp.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studyapp.dto.AiGenerateRequestDTO;
import com.studyapp.dto.AiQuestionDTO;
import com.studyapp.entity.Answer;
import com.studyapp.entity.Question;
import com.studyapp.entity.Topic;
import com.studyapp.repository.AnswerRepository;
import com.studyapp.repository.QuestionRepository;
import com.studyapp.repository.TopicRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OllamaService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public OllamaService(TopicRepository topicRepository, QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    public void generateQuestions(AiGenerateRequestDTO request) throws Exception {
        Topic topic = topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        String typeLabel = "ESSAY".equals(request.getQuestionType()) 
            ? "Tự luận" 
            : "Trắc nghiệm có 4 đáp án (1 đáp án đúng, 3 đáp án nhiễu)";

        String prompt = "Bạn là một giáo sư đại học. Dựa vào nội dung tài liệu tôi cung cấp sau đây, hãy tạo ra " 
            + request.getQuestionCount() + " câu hỏi loại " + typeLabel + ".\n\n"
            + "Tài liệu:\n" + request.getMaterial() + "\n\n"
            + "CHÚ Ý QUAN TRỌNG: BẠN CHỈ ĐƯỢC PHÉP TRẢ VỀ DUY NHẤT MỘT MẢNG JSON, KHÔNG BỌC TRONG BẤT KỲ CÚ PHÁP MARKDOWN HAY THẺ NÀO KHÁC. Đừng thêm bất kỳ chữ nào ngoài JSON.\n"
            + "Cấu trúc JSON yêu cầu:\n"
            + "[\n  {\n    \"content\": \"Nội dung câu hỏi\",\n    \"type\": \"" + request.getQuestionType() + "\",\n    \"explanation\": \"Giải thích chi tiết tại sao lại chọn đáp án đó\",\n    \"answers\": [\n      {\"content\": \"Đáp án A\", \"isCorrect\": true},\n      {\"content\": \"Đáp án B\", \"isCorrect\": false}\n    ]\n  }\n]";

        String url = "http://localhost:11434/api/chat";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestMap = new HashMap<>();
        requestMap.put("model", "minimax-m2.5:cloud");
        requestMap.put("stream", false);
        
        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);
        messages.add(userMessage);
        
        requestMap.put("messages", messages);

        String requestBody = objectMapper.writeValueAsString(requestMap);
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
        Map<String, Object> body = response.getBody();
        Map<String, Object> message = (Map<String, Object>) body.get("message");
        String content = (String) message.get("content");

        // Parse JSON (bỏ qua thẻ <think> của deepseek-r1)
        String jsonStr = extractJsonArray(content);
        if (jsonStr == null) {
            throw new RuntimeException("Could not extract JSON from AI response: " + content);
        }

        List<AiQuestionDTO> generatedQuestions = objectMapper.readValue(jsonStr, new TypeReference<List<AiQuestionDTO>>() {});

        for (AiQuestionDTO aiQ : generatedQuestions) {
            Question q = new Question();
            q.setTopic(topic);
            q.setContent(aiQ.getContent());
            q.setType(aiQ.getType() != null ? aiQ.getType() : request.getQuestionType());
            q.setExplanation(aiQ.getExplanation());
            q.setSource("AI_GENERATED");
            questionRepository.save(q);

            if ("MULTIPLE_CHOICE".equals(q.getType()) && aiQ.getAnswers() != null) {
                for (AiQuestionDTO.AiAnswerDTO aiA : aiQ.getAnswers()) {
                    Answer a = new Answer();
                    a.setQuestion(q);
                    a.setContent(aiA.getContent());
                    a.setIsCorrect(aiA.getIsCorrect() != null ? aiA.getIsCorrect() : false);
                    answerRepository.save(a);
                }
            }
        }
    }

    private String extractJsonArray(String text) {
        Pattern pattern = Pattern.compile("\\[.*?\\]", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group(0);
        }
        return null;
    }
}
