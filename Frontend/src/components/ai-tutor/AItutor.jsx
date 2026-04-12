import { useState } from 'react';
import { callGenAi } from '../services/aiService';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../../global_components/Header/Icon';
import ReactMarkdown from "react-markdown";

export default function AItutor() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I'm your AI learning assistant. I can help you understand concepts, solve problems, and clarify doubts. What would you like to learn about today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { colour } = useTheme();

  const loadReply = async () => {
    if (!question.trim()) return;

    const userMessage = { type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    try {
      const res = await callGenAi({ message: question });
      const aiMessage = { type: 'ai', content: res.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { type: 'ai', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loadReply();
    }
  };

  return (
    <>
    <div className="p-5 max-w-4xl mx-auto min-h-9 flex flex-col">
        <div
          className="p-3 rounded-2xl bg-white text-black font-medium flex items-center gap-2"
          style={{ boxShadow: `0 2px 4px ${colour}30` }}>
          <Icon />
          <span>AI Learning Assistant</span>
        </div>

      <div className="p-3 mb-5 flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className="max-w-[75%] p-4 rounded-2xl break-words leading-6 text-[15px]" style={{
              backgroundColor: message.type === 'user' ? colour : '#fff',
              color: message.type === 'user' ? '#fff' : '#000',
              boxShadow: `0 2px 4px ${colour}30`
            }}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="max-w-[70%] p-3 rounded-xl bg-white text-black" style={{ boxShadow: `0 2px 4px ${colour}30` }}>
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center p-3 rounded-2xl bg-white" style={{ boxShadow: `0 4px 8px ${colour}40` }}>
        <input
          type="text"
          placeholder="Ask me anything about your current topic..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 border-none rounded outline-none bg-transparent"
        />
        <button
          onClick={loadReply}
          disabled={isLoading || !question.trim()}
          className="ml-3 p-3 center rounded-2xl text-white cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: colour, boxShadow: `0 2px 4px ${colour}50` }}
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
    </>
  );
}
