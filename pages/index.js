import ChatWidget from "../components/ChatWidget";

export default function Index() {
  function didReceiveNewUserMessage(message) {
    console.log(`New message incoming! ${message}`);

    // Now send the message throught the backend API
  }

  return (
    <div>
      {true && <ChatWidget handleNewUserMessage={didReceiveNewUserMessage} />}
    </div>
  );
}
