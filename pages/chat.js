import React, { useState, useEffect, useRef } from "react";
import axios from "axios/index";
import 'materialize-css/dist/css/materialize.min.css';


import Message from "../components/Message";

const Chat = () => {
  const messagesEnd = useRef(null);

  const [messages, setMessages] = useState([
    {
      speaks: "bot",
      msg: "hello there...!",
    },
  ]);

  const df_text_query = async (queryText) => {
    let says = {
      speaks: "user",
      msg: queryText,
    };

    setMessages((prevMessages) => {
      return [...prevMessages, says];
    });

    const res = await axios.get(
      `http://ec2-18-135-99-244.eu-west-2.compute.amazonaws.com/getResponse/secretkey=34bd903c-7f34-11eb-ad56-06298c397d52/modelName=chitti/message=${queryText}`
    );

    says = {
      speaks: "bot",
      msg: res.data.chat_response,
    };
    setMessages((prevMessages) => {
      return [...prevMessages, says];
    });

    messagesEnd.current.focus();

    messagesEnd.current.scrollIntoView({ behavior: "smooth" });

  };

  const renderMessages = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return <Message key={i} speaks={message.speaks} text={message.msg} />;
      });
    } else {
      return null;
    }
  };

  const scroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const _handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      df_text_query(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div style={{ height: 400, width: 400, float: "right" }}>
      <div
        id="chatbot"
        style={{ height: "100%", width: "100%", overflow: "auto" }}
      >
        <h2>Chat</h2>
        {renderMessages(messages)}
        <input
          ref={messagesEnd}
          type="text"
          onKeyPress={_handleInputKeyPress}
        />
      </div>
    </div>
  );
};

export default Chat;
