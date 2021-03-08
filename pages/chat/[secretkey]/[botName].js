import axios from "axios/index";
import "materialize-css/dist/css/materialize.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Message from "../../../components/Message";

const BASE_URL = "https://www.colloquychatbotapi.com"

const Chat = () => {
	const router = useRouter();

	const { secretkey, botName } = router.query;

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
			`${BASE_URL}/getResponse/secretkey=${secretkey}/modelName=${botName}/message=${queryText}`
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
		<>
			<Head>
				<title>Chat Window - Colloquy</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest"></link>
			</Head>
			<div
				className="chat-window"
			>
				<div
					id="chatBot"
				>
					{renderMessages(messages)}
					
				</div>
			</div>
			<div className="input-container">
						<input
							ref={messagesEnd}
							type="text"
							placeholder="Say Hi..."
							onKeyPress={_handleInputKeyPress}
						>
						
						</input>
					</div>
		</>
	);
};

export default Chat;
