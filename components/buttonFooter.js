export default function ButtonFooter({
	removeBot,
	canDelete,
	trainBot,
	training,
	importTemplates,
	testBot,
	isTrained,
	generateEmbed
}) {
	return (
		<div>
			<header className="border-4 border-gray-100 rounded-md p-3 bg-white mb-3 shadow-md text-center flex justify-evenly">
				<button className="btn" onClick={importTemplates}>
					Import template
        </button>
				{!training && (
					<button className="btn" onClick={trainBot}>
						Train Bot
					</button>
				)}
				{isTrained && (
					<>
						<button className="btn" onClick={testBot}>Test Bot</button>
						<button className="btn" onClick={generateEmbed}>Generate Embed</button>
					</>
				)}
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
