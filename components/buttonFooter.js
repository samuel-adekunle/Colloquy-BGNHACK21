const intentsTest = [
  {
    "tag": "hello",
    "patterns": [
      "hi",
      "how are you"
    ],
    "responses": [
      "hey"
    ]
  },
  {
    "tag": "test",
    "patterns": [
      "jkl",
      "asdf"
    ],
    "responses": [
      "1234"
    ]
  }
];
export default function ButtonFooter({
	removeBot,
	canDelete,
  addUrlGeneratedQuestions
}) {
  const generateQuestions = () => {
    let url = prompt("Enter the website url:");
    //alert(url)
    // some code to use the url to get the intents
    addUrlGeneratedQuestions(intentsTest);
  }
  return (
    <header className="bg-gray-50 text-center p-3 -bottom-0 w-full flex justify-evenly">
      <button className="footerBtn" onClick={generateQuestions}>
        Generate Questions &amp; Answers from Website
      </button>
      <button className="footerBtn">Train Bot</button>
      <button className="footerBtn">Test Bot</button>
      <button className="footerBtn">Generate Embed</button>

			{canDelete && <button className="footerBtn bg-red-300" onClick={removeBot}>Delete Bot</button>}
    </header>
  );
}
