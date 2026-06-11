# 🎓 Quizz AI - Nền tảng Tạo và Luyện Thi Trắc Nghiệm Thông Minh

**Quizz AI** là một ứng dụng Web Fullstack hiện đại giúp người dùng dễ dàng tạo các bộ đề thi trắc nghiệm/tự luận, đồng thời luyện tập và kiểm tra kiến thức của mình. Điểm nhấn đặc biệt của hệ thống là tính năng **Tích hợp Trí Tuệ Nhân Tạo (AI)**, cho phép giáo viên hoặc học sinh tự động tạo ra hàng chục câu hỏi trắc nghiệm chất lượng cao chỉ từ một đoạn văn bản tài liệu duy nhất trong vài giây.

🔗 **[Trải nghiệm bản Live Demo ngay tại đây!](https://quizz-mu-henna.vercel.app/)**

---

## 🌟 Các tính năng nổi bật
* **Quản lý chủ đề:** Tạo, sửa, xóa các chủ đề học tập (Topics) linh hoạt.
* **Ngân hàng câu hỏi đa dạng:** Hỗ trợ câu hỏi Trắc nghiệm (nhiều đáp án) và Câu hỏi Tự luận.
* **Bộ não AI siêu tốc (Groq - Llama 3.3 70B):** Tự động đọc hiểu tài liệu và sinh ra bộ câu hỏi trắc nghiệm kèm giải thích đáp án cực kỳ chi tiết chỉ với 1 cú click chuột.
* **Luyện thi tương tác:** Giao diện làm bài thi trực quan, chấm điểm ngay lập tức và xem lại giải thích cho những câu sai.
* **Thiết kế UI/UX hiện đại:** Sử dụng CSS thuần với các hiệu ứng Glassmorphism, Gradient và Micro-animations mang lại trải nghiệm người dùng cao cấp, mượt mà.
* **Chuẩn DevOps & Cloud:** Sẵn sàng triển khai trên các nền tảng mây.

---

## 🛠 Công nghệ sử dụng
Dự án được xây dựng dựa trên kiến trúc tiên tiến và tách biệt hoàn toàn giữa Frontend và Backend:

### Frontend
* **Core:** React.js (khởi tạo bằng Vite cho tốc độ siêu nhanh)
* **Styling:** Vanilla CSS (Tự thiết kế Design System riêng biệt, giao diện Dark/Light phong cách Glassmorphism)
* **Routing:** React Router DOM
* **API Client:** Axios
* **Deploy:** Vercel

### Backend
* **Core:** Java 17 + Spring Boot 3
* **Database:** MySQL (Triển khai trên đám mây TiDB Serverless)
* **ORM:** Spring Data JPA / Hibernate
* **AI Integration:** RESTful API giao tiếp với **Groq Cloud API** (Model `llama-3.3-70b-versatile`)
* **Build tool:** Maven
* **Deploy:** Docker Container chạy trên Render

---

## 🚀 Hướng dẫn cài đặt và chạy trên máy tính cá nhân (Local)

### Yêu cầu hệ thống
* Node.js (phiên bản 16+)
* Java JDK 17
* Maven

### Bước 1: Thiết lập cơ sở dữ liệu và AI
Bạn cần chuẩn bị sẵn một Database MySQL (ví dụ dùng XAMPP, MySQL Workbench hoặc TiDB) và lấy 1 API Key miễn phí từ [Groq Console](https://console.groq.com/keys).

### Bước 2: Chạy Backend (Spring Boot)
1. Mở terminal, di chuyển vào thư mục `backend`.
2. Tạo file `application.properties` (nếu chưa có) trong `src/main/resources/` và thiết lập biến môi trường, hoặc truyền thẳng biến vào máy tính:
   * `DB_URL`: Link JDBC kết nối tới MySQL
   * `DB_USERNAME`: Tên đăng nhập DB
   * `DB_PASSWORD`: Mật khẩu DB
   * `GROQ_API_KEY`: API Key lấy từ Groq
3. Chạy lệnh để khởi động:
   ```bash
   ./mvnw spring-boot:run
   ```
   Backend sẽ chạy tại cổng `http://localhost:8080`.

### Bước 3: Chạy Frontend (React)
1. Mở một terminal mới, di chuyển vào thư mục `frontend`.
2. Chạy lệnh cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Khởi động giao diện người dùng:
   ```bash
   npm run dev
   ```
4. Truy cập vào `http://localhost:5173` trên trình duyệt và bắt đầu trải nghiệm!

---

## 👨‍💻 Tác giả
Phát triển bởi **Bùi Tiến Đạt** (@BuiTienDat29).
Được thiết kế từ con số 0 với niềm đam mê mang lại trải nghiệm học tập đỉnh cao. Mọi ý kiến đóng góp xin vui lòng gửi Pull Request hoặc mở Issue trên kho lưu trữ này!
