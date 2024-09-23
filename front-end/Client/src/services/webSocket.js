import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";

export const useStompClient = (topic, prefixStomp) => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socketFactory = () => new SockJS("http://localhost:2818/api/ws");
    const stompClient = Stomp.over(socketFactory);

    stompClient.connect({}, () => {
      console.log("Connected");

      stompClient.subscribe(`/topic/${topic}`, (response) => {
        const newMessage = JSON.parse(response.body);
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    setStompClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);

  const sendMessage = (newMessage) => {
    if (stompClient && newMessage.trim()) {
      stompClient.send(`/app/${prefixStomp}`, {}, JSON.stringify(newMessage));
    }
  };

  return { message, sendMessage };
};
