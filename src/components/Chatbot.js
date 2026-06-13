'use client';

import { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '@/lib/chatbotEngine';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am AdPulse Assistant. What can I help you?',
      time: '12:00 PM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

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

  // Auto-open chatbot window after page load with a 1.5s delay & set local time
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: 'Hello! I am AdPulse Assistant. What can I help you?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'ur-PK'; // Pakistani region (handles English & Urdu mixed speech well)
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => (prev ? prev + ' ' + transcript : transcript));
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Text to Speech
  const speakText = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Clean HTML tags, emojis, icons and markdown links
    const cleanText = text
      .replace(/<[^>]*>/g, '') // remove HTML tags
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // replace markdown links with text
      .replace(/[•📺🏙️📊🤝📱🚌🚀📈👑📍✉️💬📞➔×]/g, '') // remove emojis/icons
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Dynamic language selection based on content
    const isUrdu = /[\u0600-\u06FF]/.test(cleanText);
    utterance.lang = isUrdu ? 'ur-PK' : 'en-US';

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Speech recognition start failed:', err);
      }
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessageAlert(false);
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    // Add user message to conversation list
    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = [...messages];

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Simulate AI thinking status
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: currentHistory
        }),
      });

      if (!res.ok) {
        throw new Error('Chat API route returned non-OK status');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg = {
        sender: 'bot',
        text: data.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (!isMuted) {
        speakText(data.text);
      }
    } catch (err) {
      console.warn('API error, falling back to local chatbot engine:', err);
      
      // Fallback: Local getChatbotResponse
      setTimeout(() => {
        const response = getChatbotResponse(text);
        const botMsg = {
          sender: 'bot',
          text: response.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);

        if (!isMuted) {
          speakText(response.text);
        }
      }, 700);
    }
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
              <span className="online-status">
                <span className="status-dot"></span> Online
              </span>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button 
              className={`chatbot-sound-toggle ${isMuted ? 'muted' : 'unmuted'}`}
              onClick={() => {
                const newMuted = !isMuted;
                setIsMuted(newMuted);
                if (newMuted) {
                  window.speechSynthesis?.cancel();
                } else {
                  const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
                  if (lastBotMsg) speakText(lastBotMsg.text);
                }
              }}
              title={isMuted ? "Unmute Bot Voice" : "Mute Bot Voice"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <button className="chatbot-close-btn" onClick={handleToggle}>×</button>
          </div>
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
                <div className="message-meta">
                  <span className="message-time">{msg.time}</span>
                  {msg.sender === 'bot' && (
                    <button 
                      className="message-speak-btn"
                      onClick={() => speakText(msg.text)}
                      title="Read aloud"
                    >
                      🔊
                    </button>
                  )}
                </div>
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
          <button 
            className={`chatbot-mic-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleListening}
            title={isListening ? "Stop listening" : "Type with voice"}
          >
            {isListening ? "🎙️" : "🎤"}
          </button>
          <input 
            type="text" 
            placeholder={isListening ? "Listening... Speak now" : "Type a message in any language..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isListening}
          />
          <button 
            className="chatbot-send-btn" 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isListening}
          >
            ➔
          </button>
        </div>
      </div>
    </div>
  );
}
