export default function ButtonFooter({
	removeBot
}) {
  const generateQuestions = () => {
    let url = prompt("Enter the website url:");
    alert(url)
  }
  return (
    <header className="bg-gray-50 text-center p-3 -bottom-0 w-full flex justify-evenly">
      <button className="footerBtn" onClick={generateQuestions}>
        Generate Questions &amp; Answers from Website
      </button>
      <button className="footerBtn">Train Bot</button>
      <button className="footerBtn">Test Bot</button>
      <button className="footerBtn">Generate Embed</button>
			<button className="footerBtn bg-red-300" onClick={removeBot}>Delete Bot</button>
    </header>
  );
}
