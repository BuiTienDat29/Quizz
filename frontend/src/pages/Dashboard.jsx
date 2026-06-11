import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [newTopicName, setNewTopicName] = useState('');

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    axiosClient.get('/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.error("Error fetching topics:", err));
  };

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;
    
    axiosClient.post('/topics', {
      name: newTopicName,
      groupType: 'CUSTOM',
      isCustom: true
    }).then(res => {
      setNewTopicName('');
      fetchTopics();
    }).catch(err => console.error("Error creating topic:", err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold mb-4">Thêm Chủ Đề Mới</h2>
        <form onSubmit={handleAddTopic} className="flex gap-4">
          <input 
            type="text" 
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            placeholder="Tên chủ đề..." 
            className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Thêm
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Các Chủ Đề Ôn Tập</h2>
        {topics.length === 0 ? (
          <p className="text-gray-500">Chưa có chủ đề nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map(t => (
              <Link key={t.id} to={`/topics/${t.id}`} className="block border border-gray-200 p-4 rounded hover:border-blue-500 hover:shadow-sm transition">
                <h3 className="font-medium text-lg text-gray-800">{t.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{t.isCustom ? 'Chủ đề tự tạo' : 'Hệ thống'}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
