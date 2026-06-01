'use client';

import { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '@/lib/chatbotEngine';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am AdPulse Assistant. What can I help you? (I support English, Urdu, Arabic, and Spanish)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Alert user when bot sends initial message or updates while closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessageAlert(true);
    }
  }, [messages, isOpen]);

  // Auto-open chatbot window after page load with a 1.5s delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessageAlert(false);
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    // Add user message to conversation list
    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Simulate AI thinking status
    setIsTyping(true);

    setTimeout(() => {
      // Fetch engine response
      const response = getChatbotResponse(text);
      
      const botMsg = {
        sender: 'bot',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickReplies = [
    { label: '📺 Our Services', query: 'What are your services?' },
    { label: '💰 Pricing Packages', query: 'Tell me about pricing packages' },
    { label: '📍 Office Location', query: 'Where is your head office?' },
    { label: '✉️ Contact Details', query: 'How can I contact you?' },
    { label: '🇵🇰 اردو (Urdu)', query: 'میں اردو میں بات کرنا چاہتا ہوں' },
    { label: '🇸🇦 العربية (Arabic)', query: 'أريد التحدث باللغة العربية' },
    { label: '🇪🇸 Español (Spanish)', query: 'Hola, me gustaría hablar en español' }
  ];

  return (
    <div className="chatbot-wrapper">
      {/* Floating trigger button */}
      <button 
        className={`chatbot-trigger ${isOpen ? 'active' : ''} ${hasNewMessageAlert ? 'pulse-alert' : ''}`}
        onClick={handleToggle}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <div className="trigger-content">
            <span className="chat-bubble-icon">💬</span>
            {hasNewMessageAlert && <span className="alert-dot"></span>}
          </div>
        )}
      </button>

      {/* Floating alert tip */}
      {!isOpen && hasNewMessageAlert && (
        <div className="chatbot-tooltip" onClick={handleToggle}>
          New message from AdPulse Assistant!
        </div>
      )}

      {/* Chat window panel */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-brand">
            <span className="chatbot-avatar">
              <img src="/images/chatbot_logo.png" alt="AdPulse Logo" />
            </span>
            <div className="chatbot-brand-text">
              <h4>AdPulse Assistant</h4>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={handleToggle}>×</button>
        </div>

        {/* Conversation list */}
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.sender}`}>
              <div className="message-bubble">
                <div 
                  className="message-text" 
                  dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}
                />
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-row bot typing">
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="chatbot-suggestions">
          <div className="suggestions-scroll">
            {quickReplies.map((reply, idx) => (
              <button 
                key={idx} 
                className="suggestion-chip"
                onClick={() => handleSendMessage(reply.query)}
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="chatbot-input-area">
          <input 
            type="text" 
            placeholder="Type a message in any language..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="chatbot-send-btn" 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
          >
            ➔
          </button>
        </div>
      </div>
    </div>
  );
}
