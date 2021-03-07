import axios from "axios/index";
import "materialize-css/dist/css/materialize.min.css";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Message from "../../../components/Message";


const Chat = () => {

	const router = useRouter()

	const {secretkey, botName} = router.query

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
      `http://ec2-18-135-99-244.eu-west-2.compute.amazonaws.com/getResponse/secretkey=${secretkey}/modelName=${botName}/message=${queryText}`
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
    <div
      style={{
        height: 600,
        width: 400,
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 200,
        // border: "2px solid blue",
      }}
    >
      <h2 style={{ backgroundColor: "#EE6E73", padding: 15 }}>Chat</h2>
      <div
        id="chatbot"
        style={{
          height: "75%",
          width: "100%",
          overflow: "auto",
          // border: "2px solid black",
          borderColor: "#EE6E73",
        }}
      >
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
