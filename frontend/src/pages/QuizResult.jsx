import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api'
});

function QuizResult() {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get(`/quiz/session/${sessionId}`)
            .then(res => {
                setDetail(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [sessionId]);

    if (loading) return <div className="text-center p-10">Đang tải kết quả...</div>;

    if (!detail) {
        return (
            <div className="text-center p-10">
                <p>Không tìm thấy kết quả.</p>
                <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">Về trang chủ</button>
            </div>
        );
    }

    const percentage = Math.round((detail.score / detail.total) * 100) || 0;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Kết quả Ôn Tập</h1>
                <h2 className="text-xl text-gray-500 mb-6">{detail.topicName}</h2>
                
                <div className="my-10 relative">
                    <div className={`w-48 h-48 mx-auto rounded-full border-8 flex items-center justify-center
                        ${percentage >= 80 ? 'border-green-400 text-green-600' : percentage >= 50 ? 'border-yellow-400 text-yellow-600' : 'border-red-400 text-red-600'}`}>
                        <div className="text-center">
                            <span className="text-5xl font-black">{detail.score}</span>
                            <span className="text-2xl text-gray-400">/{detail.total}</span>
                        </div>
                    </div>
                    <p className="mt-6 text-xl font-medium text-gray-600">
                        Bạn đạt {percentage}%
                    </p>
                    <p className="text-sm text-gray-400 mt-2">*Lưu ý: Các câu hỏi tự luận mặc định được tính là 0 điểm do chưa có AI chấm tự động.</p>
                </div>

                <button 
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
                >
                    Về Dashboard
                </button>
            </div>

            {/* Chi tiết từng câu */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Chi tiết Bài Làm</h2>
                {detail.answers && detail.answers.map((ans, idx) => (
                    <div key={idx} className={`p-6 bg-white rounded-xl shadow-sm border-l-4 ${ans.isCorrect ? 'border-green-500' : ans.questionType === 'MULTIPLE_CHOICE' ? 'border-red-500' : 'border-blue-500'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                <span className="text-gray-500 mr-2">Câu {idx + 1}:</span> 
                                {ans.questionContent}
                            </h3>
                            <span className={`px-3 py-1 rounded text-sm font-bold ${ans.isCorrect ? 'bg-green-100 text-green-700' : ans.questionType === 'MULTIPLE_CHOICE' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                {ans.isCorrect ? 'Đúng' : ans.questionType === 'MULTIPLE_CHOICE' ? 'Sai' : 'Tự luận'}
                            </span>
                        </div>

                        {ans.questionType === 'MULTIPLE_CHOICE' ? (
                            <div className="space-y-2 mt-4">
                                {ans.options && ans.options.map(opt => {
                                    // Kiểm tra xem user có chọn câu này không
                                    const isUserChoice = ans.userAnswerContent === opt.content;
                                    const isCorrectOpt = opt.isCorrect;
                                    
                                    let bgClass = "bg-gray-50 border-gray-200";
                                    let icon = "";
                                    
                                    if (isCorrectOpt) {
                                        bgClass = "bg-green-50 border-green-500 text-green-800 font-medium";
                                        icon = " ✓ Đáp án đúng";
                                    } else if (isUserChoice && !isCorrectOpt) {
                                        bgClass = "bg-red-50 border-red-500 text-red-800";
                                        icon = " ✗ Bạn chọn sai";
                                    }

                                    return (
                                        <div key={opt.id} className={`p-3 border rounded-lg ${bgClass}`}>
                                            {opt.content}
                                            <span className="ml-2 font-bold text-sm">{icon}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="mt-4">
                                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-sm font-semibold text-gray-500 mb-1">Bài làm của bạn:</p>
                                    <p className="text-gray-800 whitespace-pre-wrap">{ans.userAnswerContent || <span className="italic text-gray-400">Không có câu trả lời</span>}</p>
                                </div>
                            </div>
                        )}

                        {ans.explanation && (
                            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-sm font-bold text-yellow-800 mb-1">Giải thích / Đáp án mẫu:</p>
                                <p className="text-yellow-900 whitespace-pre-wrap">{ans.explanation}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizResult;
