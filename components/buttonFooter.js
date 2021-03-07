const intentsTest = [
	{
		tag: "hello",
		patterns: ["hi", "how are you"],
		responses: ["hey"],
	},
	{
		tag: "test",
		patterns: ["jkl", "asdf"],
		responses: ["1234"],
	},
];
export default function ButtonFooter({
	removeBot,
	canDelete,
	addUrlGeneratedQuestions,
	trainBot
}) {
  const generateQuestions = () => {
    let url = prompt("Enter the website url:");
    //alert(url)
    // some code to use the url to get the intents
    addUrlGeneratedQuestions(intentsTest);
  };

  return (
    <div>
      <div className="phantom" />
      <header className="bg-gray-50 text-center p-3 bottom-0 w-full flex justify-evenly fixed">
        <button className="btn" onClick={generateQuestions}>
          Generate Questions &amp; Answers from Website
        </button>
        <button className="btn">Train Bot</button>
        <button className="btn">Test Bot</button>
        <button className="btn">Generate Embed</button>

        {canDelete && (
          <button className="btn bg-red-300 hover:bg-red-200" onClick={removeBot}>
            Delete Bot
          </button>
        )}
      </header>
    </div>
  );
}
