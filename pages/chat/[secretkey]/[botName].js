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
				style={{
					height: 600,
					width: 400,
					backgroundColor: "white"
				}}
			>
				<h2 style={{ backgroundColor: "#EE6E73", padding: 15, marginTop: 0, marginBottom: 0, height: "15%" }}>Chat</h2>
				<div
					id="chatbot"
					style={{
						height: "85%",
						width: "100%",
						overflow: "auto",
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
		</>
	);
};

export default Chat;
