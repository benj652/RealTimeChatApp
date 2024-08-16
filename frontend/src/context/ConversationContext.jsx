import { createContext, useContext, useState } from 'react';

export const ConversationContext = createContext();

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

/**
 * Creates a context provider for the conversation context.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to render.
 * @return {ReactNode} The rendered context provider.
 */
export const ConversationContextProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
        conversations,
        setConversations,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
