USE study_app;

INSERT INTO topics (name, group_type, is_custom) VALUES ('Java OOP Cơ bản', 'SYSTEM', false);

SET @topic_id = LAST_INSERT_ID();

-- Question 1: Multiple Choice
INSERT INTO questions (topic_id, content, type, explanation, source) VALUES (@topic_id, 'Đặc điểm nào sau đây KHÔNG PHẢI là một trong 4 tính chất cơ bản của Lập trình hướng đối tượng (OOP)?', 'MULTIPLE_CHOICE', '4 tính chất của OOP là: Đóng gói (Encapsulation), Kế thừa (Inheritance), Đa hình (Polymorphism), và Trừu tượng (Abstraction). Đa luồng không phải là tính chất của OOP.', 'SYSTEM');
SET @q1_id = LAST_INSERT_ID();

INSERT INTO answers (question_id, content, is_correct) VALUES (@q1_id, 'Tính đóng gói (Encapsulation)', false);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q1_id, 'Tính kế thừa (Inheritance)', false);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q1_id, 'Tính đa hình (Polymorphism)', false);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q1_id, 'Tính đa luồng (Multithreading)', true);

-- Question 2: Multiple Choice
INSERT INTO questions (topic_id, content, type, explanation, source) VALUES (@topic_id, 'Từ khóa nào trong Java được sử dụng để kế thừa một lớp (class)?', 'MULTIPLE_CHOICE', 'Từ khóa extends được dùng để kế thừa một lớp (class), trong khi implements dùng để triển khai interface.', 'SYSTEM');
SET @q2_id = LAST_INSERT_ID();

INSERT INTO answers (question_id, content, is_correct) VALUES (@q2_id, 'implements', false);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q2_id, 'extends', true);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q2_id, 'inherits', false);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q2_id, 'super', false);

-- Question 3: Multiple Choice
INSERT INTO questions (topic_id, content, type, explanation, source) VALUES (@topic_id, 'Phương thức nào được gọi tự động khi một đối tượng được tạo ra?', 'MULTIPLE_CHOICE', 'Constructor (hàm tạo) được gọi tự động khi khởi tạo đối tượng bằng từ khóa new.', 'SYSTEM');
SET @q3_id = LAST_INSERT_ID();

INSERT INTO answers (question_id, content, is_correct) VALUES (@q3_id, 'main()', false);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q3_id, 'finalize()', false);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q3_id, 'Constructor', true);
INSERT INTO answers (question_id, content, is_correct) VALUES (@q3_id, 'init()', false);

-- Question 4: Essay
INSERT INTO questions (topic_id, content, type, explanation, source) VALUES (@topic_id, 'Hãy giải thích ngắn gọn sự khác nhau giữa Overloading (Nạp chồng) và Overriding (Ghi đè) trong Java.', 'ESSAY', 'Overloading: Cùng tên phương thức, khác tham số, xảy ra trong cùng một lớp. Overriding: Cùng tên, cùng tham số, xảy ra giữa lớp cha và lớp con.', 'SYSTEM');

-- Question 5: Essay
INSERT INTO questions (topic_id, content, type, explanation, source) VALUES (@topic_id, 'Interface trong Java là gì? Nêu một điểm khác biệt cơ bản giữa Interface và Abstract Class.', 'ESSAY', 'Interface là một bản thiết kế của lớp, chỉ chứa hằng số và khai báo phương thức trừu tượng (trước Java 8). Khác biệt: Một class có thể implements nhiều interface nhưng chỉ có thể extends một abstract class.', 'SYSTEM');
