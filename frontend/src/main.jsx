import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import { AuthContextProvider } from './context/AuthContext';
import { ConversationContextProvider } from './context/ConversationContext';
import { SocketContextProvider } from './context/SocketContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <ConversationContextProvider>
          <Router />
        </ConversationContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
