import { FaMinus, FaPlus } from "react-icons/fa";
import ButtonFooter from "./buttonFooter";
import QuestionCard from "./questionCard";

export default function BotDashboard({
	bot,
	addGroup,
	removeGroup,
	removeQuestionAt,
	addQuestionAt,
	changeAnswer,
	changeTitle,
	changeQuestion,
	removeBot
}) {
	const {intents: questionGroups} = bot
	
	return <>
		<div className="m-9">
			{questionGroups.map((group, index) => (
				<QuestionCard
					key={group.uid}
					id={index}
					title={group.tag}
					questions={group.patterns}
					answer={group.responses[0]}
					remove={() => removeQuestionAt(index)}
					add={() => addQuestionAt(index)}
					modifyAnswer={changeAnswer}
					modifyTitle={changeTitle}
					modifyQuestion={changeQuestion}
				/>
			))}

			<span className="flex justify-around">
				<button
					className="w-full bg-green-100 grid grid-cols-1 justify-items-center py-1 rounded 
              focus:ring-green-200 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2
              hover:bg-green-200"
					onClick={addGroup}
				>
					<i>
						<FaPlus size={42} />
					</i>
				</button>
				{questionGroups.length === 0 ? (
					<span />
				) : (
					<button
						className="w-full bg-red-100 grid grid-cols-1 justify-items-center py-1 rounded 
                focus:ring-red-200 focus:ring-opacity-50 focus:outline-none
                focus:ring focus:ring-offset-2 hover:bg-red-200"
						onClick={removeGroup}
					>
						<i>
							<FaMinus size={42} />
						</i>
					</button>
				)}
			</span>
		</div>
		<ButtonFooter removeBot={removeBot} />
	</>
}