Import React, { useState, useRef, useEffect } from ‘react’;
Import { 
  Mic, 
  Send, 
  FileText, 
  HeartPulse, 
  Clock, 
  Upload, 
  Smile, 
  Pause, 
  Play,
  Image,
  Paperclip,
  X
} from ‘lucide-react’;

Const AIHealthCoach = () => {
  Const [messages, setMessages] = useState([
    {
      Id: 1,
      Type: ‘system’,
      Content: “Welcome! I’m your AI Health Coach. Feel free to chat, upload documents, images, or voice notes. How can I support your health journey today?”,
      Timestamp: new Date()
    }
  ]);
  Const [inputMessage, setInputMessage] = useState(‘’);
  Const [isRecording, setIsRecording] = useState(false);
  Const [audioRecorder, setAudioRecorder] = useState(null);
  Const [uploadedFiles, setUploadedFiles] = useState([]);
  Const fileInputRef = useRef(null);
  Const imageInputRef = useRef(null);
  Const audioInputRef = useRef(null);
  Const messagesEndRef = useRef(null);

  Const handleFileUpload = (e, fileType) => {
    Const files = Array.from(e.target.files);
    Const newFiles = files.map(file => ({
      Name: file.name,
      Type: fileType,
      Size: file.size,
      Preview: fileType === ‘image’ ? URL.createObjectURL(file) : null
    }));

    setUploadedFiles(prev => […prev, …newFiles]);
    
    // Create upload message
    Const uploadMessage = {
      Id: messages.length + 1,
      Type: ‘user’,
      Content: `Uploaded ${newFiles.length} ${fileType}(s)`,
      Files: newFiles,
      Timestamp: new Date()
    };

    Const aiResponse = {
      Id: messages.length + 2,
      Type: ‘system’,
      Content: generateAIFileResponse(newFiles),
      Timestamp: new Date()
    };

    setMessages(prev => […prev, uploadMessage, aiResponse]);
  };

  Const generateAIFileResponse = (files) => {
    Const responses = [
      `I see you’ve uploaded ${files.length} file(s). I’ll carefully analyze the content to provide personalized health insights.`,
      `Thank you for sharing these documents. Let me review and extract relevant health information.`,
      `Your uploaded files are being processed. I’ll help you understand their health implications shortly.`
    ];

    Return responses[Math.floor(Math.random() * responses.length)];
  };

  Const handleSendMessage = () => {
    If (inputMessage.trim() || uploadedFiles.length) {
      Const newMessage = {
        Id: messages.length + 1,
        Type: ‘user’,
        Content: inputMessage,
        Files: uploadedFiles.length ? uploadedFiles : null,
        Timestamp: new Date()
      };
      
      Const aiResponse = {
        Id: messages.length + 2,
        Type: ‘system’,
        Content: generateAIResponse(inputMessage, uploadedFiles),
        Timestamp: new Date()
      };

      setMessages(prev => […prev, newMessage, aiResponse]);
      setInputMessage(‘’);
      setUploadedFiles([]);
    }
  };

  Const generateAIResponse = (userInput, files) => {
    Const responses = [
      “I’ve carefully analyzed your input and uploaded files. Here are some personalized health recommendations.”,
      “Based on the information you’ve shared, I have some targeted insights for you.”,
      “Let me break down the health information and provide actionable advice.”
    ];

    Return responses[Math.floor(Math.random() * responses.length)];
  };

  Const removeUploadedFile = (index) => {
    Const newFiles = […uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  Const startVoiceRecording = async () => {
    Try {
      Const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      Const recorder = new MediaRecorder(stream);
      Const chunks = [];

      Recorder.ondataavailable = € => chunks.push(e.data);
      Recorder.onstop = () => {
        Const audioBlob = new Blob(chunks, { type: ‘audio/webm’ });
        Const audioFile = new File([audioBlob], ‘recording.webm’, { type: ‘audio/webm’ });
        
        Const voiceMessage = {
          Name: ‘Voice Recording’,
          Type: ‘audio’,
          Size: audioBlob.size
        };

        setUploadedFiles(prev => […prev, voiceMessage]);
        
        const uploadMessage = {
          id: messages.length + 1,
          type: ‘user’,
          content: ‘Voice note recorded’,
          files: [voiceMessage],
          timestamp: new Date()
        };

        Const aiResponse = {
          Id: messages.length + 2,
          Type: ‘system’,
          Content: “I’ve received your voice note. I’ll transcribe and analyze it shortly.”,
          Timestamp: new Date()
        };

        setMessages(prev => […prev, uploadMessage, aiResponse]);
      };

      Recorder.start();
      setAudioRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      Console.error(‘Voice recording error:’, error);
    }
  };

  Const stopVoiceRecording = () => {
    If (audioRecorder) {
      audioRecorder.stop();
      setIsRecording(false);
    }
  };

  Const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: “smooth” });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className=”min-h-screen bg-gray-50 flex flex-col”>
      {/* Header */}
      <header className=”bg-white shadow-md p-4 flex justify-between items-center”>
        <div className=”flex items-center space-x-3”>
          <HeartPulse className=”w-8 h-8 text-blue-500” />
          <h1 className=”text-2xl font-bold text-gray-900”>AI Health Coach</h1>
        </div>
        <div className=”flex space-x-4”>
          <button 
            onClick={() => fileInputRef.current.click()} 
            className=”bg-blue-50 p-2 rounded-full hover:bg-blue-100”
          >
            <FileText className=”text-blue-600” />
          </button>
          <button className=”bg-green-50 p-2 rounded-full hover:bg-green-100”>
            <Clock className=”text-green-600” />
          </button>
        </div>
        <input 
          Type=”file” 
          Ref={fileInputRef} 
          className=”hidden” 
          multiple 
          onChange={€ => handleFileUpload(e, ‘document’)}
        />
      </header>

      {/* Chat Interface */}
      <main className=”flex-grow container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8”>
        {/* Chat Messages */}
        <div className=”md:col-span-2 bg-white rounded-lg shadow-md p-6 flex flex-col”>
          <div className=”flex-grow overflow-y-auto space-y-4 mb-4”>
            {messages.map((message) => (
              <div 
                Key={message.id} 
                className={`p-4 rounded-lg max-w-[80%] ${
                  message.type === ‘user’ 
                    ? ‘bg-blue-50 self-end ml-auto’ 
                    : ‘bg-gray-100 self-start’
                }`}
              >
                <p>{message.content}</p>
                {message.files && (
                  <div className=”mt-2 flex flex-wrap gap-2”>
                    {message.files.map((file, index) => (
                      <div 
                        Key={index} 
                        className=”bg-gray-100 p-2 rounded-lg flex items-center text-sm”
                      >
                        {file.type === ‘image’ && (
                          <img 
                            Src={file.preview} 
                            Alt={file.name} 
                            className=”w-16 h-16 object-cover rounded-md mr-2” 
                          />
                        )}
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
                <small className=”text-xs text-gray-500 block mt-1”>
                  {message.timestamp.toLocaleTimeString()}
                </small>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className=”mb-4 flex flex-wrap gap-2 items-center”>
              {uploadedFiles.map((file, index) => (
                <div 
                  Key={index} 
                  className=”bg-gray-100 p-2 rounded-lg flex items-center text-sm”
                >
                  {file.type === ‘image’ && (
                    <img 
                      Src={file.preview} 
                      Alt={file.name} 
                      className=”w-16 h-16 object-cover rounded-md mr-2” 
                    />
                  )}
                  {file.name}
                  <button 
                    onClick={() => removeUploadedFile(index)}
                    className=”ml-2 text-red-500”
                  >
                    <X className=”w-4 h-4” />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className=”flex space-x-2”>
            <button 
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              className={`p-2 rounded-full ${
                isRecording 
                  ? ‘bg-red-100 text-red-600’ 
                  : ‘bg-blue-50 text-blue-600’
              }`}
            >
              {isRecording ? <Pause /> : <Mic />}
            </button>
            <button 
              onClick={() => imageInputRef.current.click()}
              className=”bg-green-50 p-2 rounded-full text-green-600 hover:bg-green-100”
            >
              <Image />
            </button>
            <input 
              Type=”file” 
              Ref={imageInputRef} 
              Accept=”image/*” 
              Multiple 
              className=”hidden” 
              onChange={€ => handleFileUpload(e, ‘image’)}
            />
            <input 
              Type=”text”
              Value={inputMessage}
              onChange={€ => setInputMessage(e.target.value)}
              placeholder=”Type your health query…”
              className=”flex-grow p-2 border rounded-lg”
              onKeyPress={€ => e.key === ‘Enter’ && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className=”bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700”
            >
              <Send />
            </button>
          </div>
        </div>

        {/* Additional Features */}
        <div className=”space-y-6”>
          <div className=”bg-white rounded-lg shadow-md p-6”>
            <h2 className=”text-xl font-bold mb-4 flex items-center”>
              <Upload className=”mr-2 text-green-500” /> 
              Quick Health Upload
            </h2>
            <div className=”flex space-x-2”>
              <button 
                onClick={() => fileInputRef.current.click()}
                className=”bg-blue-50 p-2 rounded-lg hover:bg-blue-100”
              >
                Medical Records
              </button>
              <button className=”bg-green-50 p-2 rounded-lg hover:bg-green-100”>
                Fitness Data
              </button>
            </div>
          </div>

          <div className=”bg-white rounded-lg shadow-md p-6”>
            <h2 className=”text-xl font-bold mb-4 flex items-center”>
              <Smile className=”mr-2 text-yellow-500” /> 
              Mood & Wellness Check
            </h2>
            <div className=”grid grid-cols-3 gap-2”>
              {[‘😊’, ‘😐’, ‘😞’, ‘😴’, ‘😰’, ‘💪’].map((emoji, index) => (
                <button 
                  Key={index} 
                  className=”text-4xl hover:bg-gray-100 rounded-lg p-2”
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Export default AIHealthCoach;

