// hooks/useWebSocket.js
import { useEffect, useRef } from 'react';

const useWebSocket = (url) => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      console.log(`Message from server: ${event.data}`);
      // Handle incoming messages here
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (ws.current) {
      ws.current.send(message);
    }
  };

  return { sendMessage };
};

export default useWebSocket;
