export default function ButtonFooter({
  removeBot,
  canDelete,
  trainBot,
  training,
  importTemplates,
	testBot
}) {
  return (
    <div>
      <div className="phantom" />
      <header className="bg-gray-50 text-center p-3 bottom-0 w-4/5 flex justify-evenly fixed">
        <button className="btn" onClick={importTemplates}>
          Import template
        </button>
        {!training && (
          <button className="btn" onClick={trainBot}>
            Train Bot
          </button>
        )}
        <button className="btn" onClick={testBot}>Test Bot</button>
        <button className="btn">Generate Embed</button>

        {canDelete && (
          <button
            className="btn bg-red-300 hover:bg-red-200"
            onClick={removeBot}
          >
            Delete Bot
          </button>
        )}
      </header>
    </div>
  );
}
