import React, { useState } from 'react';

const ChatApp = () => {
  const [state, setState] = useState({ search: '', chat: '', messages: [], searchResults: null });

  const handleSearch = (e) => {
    setState({ ...state, search: e.target.value });
  };

  const handleChat = (e) => {
    setState({ ...state, chat: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      messages: [...state.messages, state.chat],
      chat: ''
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${state.search}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': 'YOUR_BING_API_KEY'
      }
    });
    const data = await response.json();
    setState({ ...state, searchResults: data.webPages.value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex justify-between w-full mb-4">
        <div className="bg-yellow-400 border-2 border-dashed border-yellow-600 rounded-xl w-16 h-16" />
        <div className="bg-pink-400 border-2 border-dashed border-pink-600 rounded-xl w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to the Chat</h1>
      <ul className="flex flex-wrap justify-center mb-4">
        <li className="mr-2 mb-2 text-sm text-white bg-indigo-600 p-2 rounded-lg">DJ Music</li>
        <li className="mr-2 mb-2 text-sm text-white bg-green-600 p-2 rounded-lg">Video</li>
        <li className="mr-2 mb-2 text-sm text-white bg-red-600 p-2 rounded-lg">Chat</li>
        <li className="mr-2 mb-2 text-sm text-white bg-blue-600 p-2 rounded-lg">Gaming</li>
        <li className="mr-2 mb-2 text-sm text-white bg-orange-600 p-2 rounded-lg">YouTube</li>
        <li className="mr-2 mb-2 text-sm text-white bg-purple-600 p-2 rounded-lg">Discord</li>
      </ul>
      <form onSubmit={handleSearchSubmit} className="mb-4 w-full">
        <input
          type="search"
          value={state.search}
          onChange={handleSearch}
          placeholder="Search"
          className="p-2 border border-gray-400 rounded-lg w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Search
        </button>
      </form>
      {state.searchResults && (
        <div className="mb-4 p-2 border border-gray-400 rounded-lg bg-white">
          {state.searchResults.map((result, index) => (
            <p key={index} className="bg-gray-100 p-2 border border-gray-400 rounded-lg mb-2">
              <a href={result.url} target="_blank" rel="noopener noreferrer">{result.name}</a>
            </p>
          ))}
        </div>
      )}
      <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-4">
        Ask Me
      </button>
      <MessageList messages={state.messages} />
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={state.chat}
          onChange={handleChat}
          placeholder="Type your message here..."
          className="p-2 border border-gray-400 rounded-lg w-full h-32 bg-gray-100"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div className="mb-4 h-64 overflow-y-scroll p-2 border border-gray-400 rounded-lg bg-white">
      {messages.map((message, index) => (
        <p key={index} className="bg-gradient-to-r from-yellow-400 to-red-400 p-2 border border-gray-400 rounded-lg mb-2 text-white">
          {message}
        </p>
      ))}
    </div>
  );
};

export default ChatApp;