export default function ButtonFooter({
	removeBot
}) {
  return (
    <header className="bg-gray-50 text-center p-3 -bottom-0 w-full flex justify-evenly">
      <button className="footerBtn">
        Generate Questions &amp; Answers from Website
      </button>
      <button className="footerBtn">Train Bot</button>
      <button className="footerBtn">Test Bot</button>
			<button className="footerBtn" onClick={removeBot}>Delete Bot</button>
      <button className="footerBtn">Generate Embed</button>
    </header>
  );
}
