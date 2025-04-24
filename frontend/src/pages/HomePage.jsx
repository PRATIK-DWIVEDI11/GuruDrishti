import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users, MessageCircle } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import { useState } from "react";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you?" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log("Chatbot Response:", data);

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.reply || "I didn't understand." }
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages(prev => [...prev, { sender: "bot", text: "Error! Try again" }]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
      <div className='hidden lg:block lg:col-span-1'>
        <Sidebar user={authUser} />
      </div>
      <div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
        <PostCreation user={authUser} />
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {posts?.length === 0 && (
          <div className='bg-white rounded-lg shadow p-8 text-center'>
            <div className='mb-6'>
              <Users size={64} className='mx-auto text-blue-500' />
            </div>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>No Posts Yet</h2>
            <p className='text-gray-600 mb-6'>Connect with others to start seeing posts in your feed!</p>
          </div>
        )}
      </div>
      {recommendedUsers?.length > 0 && (
        <div className='col-span-1 lg:col-span-1 hidden lg:block'>
          <div className='bg-secondary rounded-lg shadow p-4'>
            <h2 className='font-semibold mb-4'>People you may know</h2>
            {recommendedUsers?.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
      {/* Chatbot Button & Window */}
      <div className='fixed bottom-6 right-6'>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className='bg-red-500 text-white p-4 rounded-full shadow-lg'
        >
          <MessageCircle size={24} />
        </button>
        {chatOpen && (
          <div className='fixed bottom-20 right-6 bg-white shadow-lg rounded-lg p-4 w-80 h-96 flex flex-col'>
            <div className='overflow-y-auto flex-grow'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-md ${
                    msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='flex-grow border rounded p-2'
                placeholder='Ask something...'
              />
              <button onClick={sendMessage} className='bg-red-500 text-white p-2 rounded'>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
