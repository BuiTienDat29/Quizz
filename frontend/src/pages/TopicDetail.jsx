import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states thủ công
  const [content, setContent] = useState('');
  const [type, setType] = useState('MULTIPLE_CHOICE');
  const [explanation, setExplanation] = useState('');
  const [answers, setAnswers] = useState([
    { content: '', isCorrect: true },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false }
  ]);

  // AI Modal states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiMaterial, setAiMaterial] = useState('');
  const [aiQuestionCount, setAiQuestionCount] = useState(3);
  const [aiQuestionType, setAiQuestionType] = useState('MULTIPLE_CHOICE');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const fetchQuestions = () => {
    setLoading(true);
    axiosClient.get(`/questions?topicId=${id}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  // --- Handlers thủ công ---
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].content = value;
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index) => {
    const newAnswers = answers.map((a, i) => ({
      ...a,
      isCorrect: i === index
    }));
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const payload = {
      topicId: parseInt(id),
      content,
      type,
      explanation,
      source: 'USER_CREATED',
      answers: type === 'MULTIPLE_CHOICE' ? answers : []
    };

    axiosClient.post('/questions', payload)
      .then(res => {
        setContent('');
        setExplanation('');
        setAnswers([
          { content: '', isCorrect: true },
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
          { content: '', isCorrect: false }
        ]);
        fetchQuestions();
      })
      .catch(err => console.error(err));
  };

  // --- Handlers AI ---
  const handleAiGenerate = (e) => {
    e.preventDefault();
    if (!aiMaterial.trim()) return;
    setAiLoading(true);

    const payload = {
      topicId: parseInt(id),
      material: aiMaterial,
      questionCount: parseInt(aiQuestionCount),
      questionType: aiQuestionType
    };

    axiosClient.post('/ai/generate', payload)
      .then(res => {
        alert("Tạo câu hỏi bằng AI thành công!");
        setIsAiModalOpen(false);
        setAiMaterial('');
        fetchQuestions();
      })
      .catch(err => {
        console.error(err);
        alert("Có lỗi xảy ra hoặc Ollama chưa khởi động. Hãy kiểm tra Terminal!");
      })
      .finally(() => setAiLoading(false));
  };

  return (
    <div>
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">&larr; Quay lại Dashboard</Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Câu hỏi</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAiModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
          >
            ✨ Tạo bằng AI
          </button>
          <button 
            onClick={() => navigate(`/quiz/${id}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
          >
            ▶ Bắt đầu Ôn Tập
          </button>
        </div>
      </div>

      {/* Form thêm câu hỏi thủ công */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold mb-4">Thêm Câu Hỏi Mới (Thủ công)</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại câu hỏi</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
              <option value="ESSAY">Tự luận</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung câu hỏi</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 min-h-[100px]"
              placeholder="Nhập nội dung..."
              required
            ></textarea>
          </div>

          {type === 'MULTIPLE_CHOICE' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Các đáp án (Chọn 1 đáp án đúng)</label>
              {answers.map((ans, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="correctAnswer" 
                    checked={ans.isCorrect}
                    onChange={() => handleCorrectChange(idx)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <input 
                    type="text" 
                    value={ans.content}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder={`Đáp án ${String.fromCharCode(65 + idx)}`}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giải thích (Tùy chọn)</label>
            <textarea 
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Giải thích tại sao đáp án lại đúng..."
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium">
            Lưu Câu Hỏi
          </button>
        </form>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Danh sách câu hỏi hiện có</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-500">Chưa có câu hỏi nào.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={q.id} className="border border-gray-200 p-4 rounded bg-gray-50">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800">
                    <span className="text-blue-600 mr-2">Câu {i + 1}:</span> 
                    {q.content}
                    {q.source === 'AI_GENERATED' && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">✨ AI Tạo</span>}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${q.type === 'MULTIPLE_CHOICE' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
                    {q.type === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm' : 'Tự luận'}
                  </span>
                </div>
                
                {q.type === 'MULTIPLE_CHOICE' && q.answers && (
                  <ul className="mt-3 space-y-1 pl-6">
                    {q.answers.map((a, idx) => (
                      <li key={idx} className={`${a.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                        {String.fromCharCode(65 + idx)}. {a.content}
                        {a.isCorrect && ' ✓'}
                      </li>
                    ))}
                  </ul>
                )}
                
                {q.explanation && (
                  <div className="mt-3 text-sm text-gray-500 bg-white p-2 rounded border border-gray-100">
                    <strong>Giải thích:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">✨</span> Tạo câu hỏi tự động (Ollama)
              </h2>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >&times;</button>
            </div>
            
            <form onSubmit={handleAiGenerate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dán tài liệu học tập của bạn vào đây (Bài giảng, ghi chú, Wikipedia...)
                </label>
                <textarea 
                  value={aiMaterial}
                  onChange={(e) => setAiMaterial(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-500 min-h-[200px]"
                  placeholder="Ví dụ: Lập trình hướng đối tượng có 4 tính chất cơ bản là..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại câu hỏi</label>
                  <select 
                    value={aiQuestionType} 
                    onChange={(e) => setAiQuestionType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-purple-500"
                  >
                    <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
                    <option value="ESSAY">Tự luận</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                  <input 
                    type="number" 
                    min="1" max="10"
                    value={aiQuestionCount}
                    onChange={(e) => setAiQuestionCount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={aiLoading}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className={`px-5 py-2 rounded-lg text-white font-semibold flex items-center gap-2 ${aiLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý (có thể mất 10-30s)...
                    </>
                  ) : "Bắt đầu phân tích"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
