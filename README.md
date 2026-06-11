# 🎓 Quizz AI

<div align="center">

### 🚀 Nền tảng tạo và luyện thi trắc nghiệm thông minh bằng Trí tuệ Nhân tạo

<img src="https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/>

<img src="https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>

<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>

<img src="https://img.shields.io/badge/AI-Llama_3.3_70B-purple?style=for-the-badge"/>

<br><br>

🌐 **Demo:** https://quizz-mu-henna.vercel.app/

</div>

---

# 📖 Giới thiệu

**Quizz AI** là nền tảng học tập thông minh giúp người dùng:

✅ Tạo bộ đề trắc nghiệm nhanh chóng

✅ Quản lý ngân hàng câu hỏi

✅ Luyện thi trực tuyến

✅ Chấm điểm tức thời

✅ Sinh câu hỏi tự động bằng AI

Thay vì mất hàng giờ để biên soạn đề thi, người dùng chỉ cần nhập tài liệu học tập và hệ thống sẽ tự động tạo ra hàng loạt câu hỏi chất lượng cao trong vài giây.

---

# ✨ Tính năng nổi bật

## 🤖 AI Sinh Câu Hỏi Tự Động

* Phân tích nội dung tài liệu
* Trích xuất kiến thức quan trọng
* Sinh câu hỏi trắc nghiệm
* Tạo đáp án và lời giải
* Hỗ trợ học tập hiệu quả

---

## 📚 Quản Lý Chủ Đề

* ➕ Thêm chủ đề
* ✏️ Chỉnh sửa chủ đề
* 🗑️ Xóa chủ đề
* 📂 Phân loại nội dung học tập

---

## 📝 Ngân Hàng Câu Hỏi

### 🎯 Trắc nghiệm

* Nhiều lựa chọn
* Một đáp án đúng
* Chấm điểm tự động

### 📄 Tự luận

* Nhập đáp án mở
* Hỗ trợ ôn luyện chuyên sâu

---

## 🏆 Luyện Thi Trực Tuyến

* Làm bài thi online
* Xem điểm ngay lập tức
* Theo dõi kết quả
* Xem giải thích đáp án

---

## 🎨 Giao Diện Hiện Đại

* 🌙 Dark Mode
* ☀️ Light Mode
* ✨ Glassmorphism
* 🎭 Gradient Design
* 📱 Responsive

---

# 🏗️ Kiến Trúc Hệ Thống

```text
┌───────────────┐
│   React App   │
└───────┬───────┘
        │
 REST API
        │
        ▼
┌───────────────┐
│ Spring Boot 3 │
└───────┬───────┘
        │
 ┌──────┴──────┐
 ▼             ▼

MySQL      Groq AI
(TiDB)    (Llama 3.3)
```

---

# 🛠️ Công Nghệ Sử Dụng

## 🎨 Frontend

| Công nghệ       | Vai trò            |
| --------------- | ------------------ |
| ⚛️ ReactJS      | Xây dựng giao diện |
| ⚡ Vite          | Build Tool         |
| 🔄 Axios        | Gọi API            |
| 🧭 React Router | Điều hướng         |
| 🎨 CSS          | Thiết kế UI        |
| ▲ Vercel        | Deploy             |

---

## ⚙️ Backend

| Công nghệ           | Vai trò            |
| ------------------- | ------------------ |
| ☕ Java 17           | Ngôn ngữ lập trình |
| 🍃 Spring Boot 3    | Backend Framework  |
| 🗄️ Spring Data JPA | ORM                |
| 🔄 Hibernate        | Mapping Database   |
| 📦 Maven            | Quản lý thư viện   |
| 🐳 Docker           | Containerization   |
| 🚀 Render           | Deploy             |

---

## 🤖 AI Layer

| Công nghệ             | Vai trò           |
| --------------------- | ----------------- |
| 🧠 Groq Cloud API     | AI Gateway        |
| 🚀 Llama 3.3 70B      | Sinh câu hỏi      |
| 📖 Prompt Engineering | Điều khiển đầu ra |

---

# 📸 Demo Hệ Thống

## 🏠 Trang Chủ
<img width="1918" height="872" alt="image" src="https://github.com/user-attachments/assets/31fbd10e-146c-4021-8e83-179404fbb02b" />


---

## 🤖 Tạo Câu Hỏi Bằng AI

<img width="1918" height="878" alt="image" src="https://github.com/user-attachments/assets/e8af5b05-44bc-467b-80c0-7ab6a2a854da" />


---

## 📝 Làm Bài Thi
<img width="1917" height="877" alt="image" src="https://github.com/user-attachments/assets/667689cf-b743-440c-a415-5eda67568de1" />


---

## 📊 Kết Quả

<img width="1916" height="886" alt="image" src="https://github.com/user-attachments/assets/d661439c-eee9-4100-bf99-42adbc6c0358" />


---

# 🚀 Khởi Chạy Dự Án

## 1️⃣ Clone Source

```bash
git clone https://github.com/your-username/quizz-ai.git
```

## 2️⃣ Chạy Backend

```bash
./mvnw spring-boot:run
```

## 3️⃣ Chạy Frontend

```bash
npm install

npm run dev
```

---

# 📈 Hướng Phát Triển

* 🔐 JWT Authentication
* 👨‍🏫 Phân quyền Giáo viên / Học sinh
* 📊 Dashboard thống kê
* 🏅 Leaderboard
* 🤖 AI chấm điểm tự luận
* 📄 Import PDF
* 🌍 Đa ngôn ngữ

---

# 💡 Điểm Nổi Bật Kỹ Thuật

### Backend

* RESTful API Design
* Spring Boot 3
* JPA/Hibernate
* Exception Handling
* Validation
* AI Integration

### Frontend

* Component-based Architecture
* Reusable UI
* Responsive Design
* API Integration

### Cloud & DevOps

* Docker
* Render
* Vercel
* TiDB Serverless

---

# 👨‍💻 Tác Giả

**Bùi Tiến Đạt**

Java Backend Developer

⭐ Nếu thấy dự án hữu ích hãy để lại một Star để ủng hộ nhé!
