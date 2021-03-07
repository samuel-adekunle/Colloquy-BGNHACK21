import { FaMinus, FaPlus } from "react-icons/fa";

export default function QuestionCard({
	title,
	questions,
	answer,
	remove,
	add,
	modifyAnswer,
	changeTitle,
	changeQuestion,
	id,
}) {
	return (
		<div className="border-4 border-blue-100 rounded-md p-3 bg-blue-50 mt-3">
			<input
				className="text-2xl rounded-lg border-b pl-2 mb-2"
				value={title}
				name="title"
				type="text"
				placeholder="add a tag here"
				onChange={(e) => 	changeTitle(id, e.target.value)}
			/>
			<div className="space-y-3 px-3">
				{questions.map((q, qId) => (
						<input
							type="text"
							name="question"
							placeholder="add a question here"
							value={q}
							key={qId} //review
							onChange={(e) => changeQuestion(id, qId, e.target.value)}
							className="w-full block border-2 rounded-lg pl-2" />)	
				)}
				<span className="flex">
					<span className="w-full"></span>
					<button className="mx-2" onClick={add}>
						<FaPlus />
					</button>
					<button className="mx-2 hover:bg-red-200" onClick={remove}>
						<FaMinus />
					</button>
				</span>
				<input
					type="text"
					name="answer"
					placeholder="add the answer to these questions here"
					value={answer}
					className="w-full border-b-2 rounded-lg pl-2"
					onChange={(e) => modifyAnswer(id, e.target.value)}
				/>
			</div>
			{/* add-on changes  */}
		</div>
	);
}
