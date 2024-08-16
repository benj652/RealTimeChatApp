import React from 'react';
import MessageContainer from '../components/messages/MessageContainer';
import Sidebar from '../components/sidebar/Sidebar';

const HomePage = () => {
  return (
    <div
      className="flex sm:h-[450px] md:h-[550px] rounded-3xl overflow-hidden
     bg-gray-300 bg-clip-padding border-gray-500 border-8 shadow-2xl"
    >
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
