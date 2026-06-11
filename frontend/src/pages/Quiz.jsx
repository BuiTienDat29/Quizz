import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api'
});

function Quiz() {
    const { id } = useParams(); // topicId
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: { selectedAnswerId, textContent } }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get(`/questions?topicId=${id}`)
            .then(res => {
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleAnswerSelect = (questionId, answerId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: { selectedAnswerId: answerId, textContent: '' }
        }));
    };

    const handleTextChange = (questionId, text) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: { selectedAnswerId: null, textContent: text }
        }));
    };

    const handleSubmit = () => {
        const payloadAnswers = Object.entries(answers).map(([qId, data]) => ({
            questionId: parseInt(qId),
            selectedAnswerId: data.selectedAnswerId,
            userAnswerContent: data.textContent
        }));

        axiosClient.post('/quiz/submit', {
            topicId: id,
            answers: payloadAnswers
        }).then(res => {
            navigate(`/quiz/result/${res.data.sessionId}`, { state: res.data });
        }).catch(err => console.error(err));
    };

    if (loading) return <div className="text-center p-10">Đang tải câu hỏi...</div>;
    if (questions.length === 0) return <div className="text-center p-10">Chưa có câu hỏi nào trong chủ đề này.</div>;

    const question = questions[currentIndex];
    const currentAnswer = answers[question.id] || {};

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-between text-gray-500 mb-6 font-medium">
                    <span>Câu hỏi {currentIndex + 1} / {questions.length}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {question.type === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm' : 'Tự luận'}
                    </span>
                </div>

                <h2 className="text-2xl font-bold mb-8 text-gray-800 leading-relaxed">{question.content}</h2>

                {question.type === 'MULTIPLE_CHOICE' ? (
                    <div className="space-y-4">
                        {question.answers && question.answers.map(ans => (
                            <div 
                                key={ans.id}
                                onClick={() => handleAnswerSelect(question.id, ans.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${currentAnswer.selectedAnswerId === ans.id ? 'bg-blue-50 border-blue-500 shadow-sm' : 'hover:bg-gray-50 border-gray-200'}`}
                            >
                                <label className="flex items-center cursor-pointer w-full">
                                    <input 
                                        type="radio" 
                                        name={`q-${question.id}`} 
                                        checked={currentAnswer.selectedAnswerId === ans.id}
                                        onChange={() => handleAnswerSelect(question.id, ans.id)}
                                        className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-4 text-lg text-gray-700">{ans.content}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <textarea
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                        rows="5"
                        placeholder="Nhập câu trả lời của bạn..."
                        value={currentAnswer.textContent || ''}
                        onChange={(e) => handleTextChange(question.id, e.target.value)}
                    ></textarea>
                )}

                <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                    <button 
                        onClick={() => setCurrentIndex(prev => prev - 1)}
                        disabled={currentIndex === 0}
                        className="px-6 py-2.5 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Quay lại
                    </button>
                    
                    {currentIndex === questions.length - 1 ? (
                        <button 
                            onClick={handleSubmit}
                            className="px-8 py-2.5 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 shadow-md transition-colors"
                        >
                            Nộp bài
                        </button>
                    ) : (
                        <button 
                            onClick={() => setCurrentIndex(prev => prev + 1)}
                            className="px-8 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
                        >
                            Tiếp theo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
