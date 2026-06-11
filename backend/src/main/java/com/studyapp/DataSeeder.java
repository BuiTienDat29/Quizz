package com.studyapp;

import com.studyapp.entity.*;
import com.studyapp.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public DataSeeder(TopicRepository topicRepository, QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        boolean hasSeedData = topicRepository.findAll().stream()
                .anyMatch(t -> "Java OOP Cơ bản".equals(t.getName()));
                
        if (!hasSeedData) {
            Topic topic = Topic.builder().name("Java OOP Cơ bản").groupType("SYSTEM").isCustom(false).build();
            topicRepository.save(topic);

            Question q1 = Question.builder().topic(topic).content("Đặc điểm nào sau đây KHÔNG PHẢI là một trong 4 tính chất cơ bản của Lập trình hướng đối tượng (OOP)?").type("MULTIPLE_CHOICE").source("SYSTEM").build();
            questionRepository.save(q1);
            answerRepository.save(Answer.builder().question(q1).content("Tính đóng gói (Encapsulation)").isCorrect(false).build());
            answerRepository.save(Answer.builder().question(q1).content("Tính kế thừa (Inheritance)").isCorrect(false).build());
            answerRepository.save(Answer.builder().question(q1).content("Tính đa hình (Polymorphism)").isCorrect(false).build());
            answerRepository.save(Answer.builder().question(q1).content("Tính đa luồng (Multithreading)").isCorrect(true).build());

            Question q2 = Question.builder().topic(topic).content("Từ khóa nào trong Java được sử dụng để kế thừa một lớp (class)?").type("MULTIPLE_CHOICE").source("SYSTEM").build();
            questionRepository.save(q2);
            answerRepository.save(Answer.builder().question(q2).content("implements").isCorrect(false).build());
            answerRepository.save(Answer.builder().question(q2).content("extends").isCorrect(true).build());
            answerRepository.save(Answer.builder().question(q2).content("inherits").isCorrect(false).build());
            answerRepository.save(Answer.builder().question(q2).content("super").isCorrect(false).build());

            Question q3 = Question.builder().topic(topic).content("Phương thức nào được gọi tự động khi một đối tượng được tạo ra?").type("MULTIPLE_CHOICE").source("SYSTEM").build();
            questionRepository.save(q3);
            answerRepository.save(Answer.builder().question(q3).content("main()").isCorrect(false).build());
            answerRepository.save(Answer.builder().question(q3).content("finalize()").isCorrect(false).build());
            answerRepository.save(Answer.builder().question(q3).content("Constructor").isCorrect(true).build());
            answerRepository.save(Answer.builder().question(q3).content("init()").isCorrect(false).build());

            Question q4 = Question.builder().topic(topic).content("Hãy giải thích ngắn gọn sự khác nhau giữa Overloading (Nạp chồng) và Overriding (Ghi đè) trong Java.").type("ESSAY").source("SYSTEM").build();
            questionRepository.save(q4);
            
            Question q5 = Question.builder().topic(topic).content("Interface trong Java là gì? Nêu một điểm khác biệt cơ bản giữa Interface và Abstract Class.").type("ESSAY").source("SYSTEM").build();
            questionRepository.save(q5);
            
            System.out.println("====== SEED DATA CREATED SUCCESSFULLY! ======");
        }

        // Cập nhật lại explanation cho các câu hỏi bị thiếu
        questionRepository.findAll().forEach(q -> {
            if (q.getContent().contains("Overloading") && q.getExplanation() == null) {
                q.setExplanation("Overloading (Nạp chồng): Cùng tên phương thức, khác tham số, xảy ra trong cùng một lớp. Overriding (Ghi đè): Cùng tên, cùng tham số, xảy ra giữa lớp cha và lớp con.");
                questionRepository.save(q);
            }
            if (q.getContent().contains("Interface trong Java") && q.getExplanation() == null) {
                q.setExplanation("Interface là một bản thiết kế của lớp, chỉ chứa hằng số và khai báo phương thức trừu tượng. Khác biệt: Một class có thể implements nhiều interface nhưng chỉ có thể extends một abstract class.");
                questionRepository.save(q);
            }
            if (q.getContent().contains("KHÔNG PHẢI") && q.getExplanation() == null) {
                q.setExplanation("4 tính chất của OOP là: Đóng gói, Kế thừa, Đa hình, và Trừu tượng. Đa luồng không phải là tính chất của OOP.");
                questionRepository.save(q);
            }
            if (q.getContent().contains("Từ khóa nào") && q.getExplanation() == null) {
                q.setExplanation("Từ khóa extends được dùng để kế thừa một lớp, trong khi implements dùng để triển khai interface.");
                questionRepository.save(q);
            }
            if (q.getContent().contains("Phương thức nào") && q.getExplanation() == null) {
                q.setExplanation("Constructor (hàm tạo) được gọi tự động khi khởi tạo đối tượng bằng từ khóa new.");
                questionRepository.save(q);
            }
        });
    }
}
