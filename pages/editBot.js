import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import BotMenu from "../components/botMenu";
import HeaderBar from "../components/headerBar";
import QuestionCard from "../components/questionCard";

const questionGroupTemplate = {
	title: "",
	questions: [""],
	answer: "",
}
export default function EditBot() {
	const [questionGroups, setQuestionGroups] = useState([]);

	const addGroup = () => {
		setQuestionGroups((oldGroups) => [...oldGroups, questionGroupTemplate]);
	}

	const removeGroup = () => {
		setQuestionGroups((oldGroups) => oldGroups.splice(0, oldGroups.length - 1))
	};

	const removeQuestionAt = (index) => {
		setQuestionGroups((oldGroups) => {
			let oldGroup = oldGroups[index]
			oldGroup.questions.pop()
			
			return [...oldGroups.splice(0, index), oldGroup, ...oldGroups.splice(index+1)]
		})
	}

	const addQuestionAt = (index) => {
		setQuestionGroups((oldGroups) => {
			let oldGroup = oldGroups[index]
			oldGroup.questions.push("")
			
			return [...oldGroups.splice(0, index), oldGroup, ...oldGroups.splice(index+1)]
		})
	}


	return (
		<div className="text-gray-900">
			<HeaderBar />
			<div className="grid grid-cols-5">
				<div>
					<BotMenu />
				</div>
				<div className="col-span-4 m-7">
					<QuestionCard
						title="Hello Questions"
						questions={["how are you", "how is your wife"]}
						answer="Great, thanks!"
					/>
					{questionGroups.map((group, index) => (
						<QuestionCard 
							key={index}
							title={group.title} 
							questions={group.questions} 
							answer={group.answer}
							remove={() => removeQuestionAt(index)} 
							add={() => addQuestionAt(index)} />
					))}
					
					<span className="flex justify-around">
						<button className="w-full bg-green-100 grid grid-cols-1 justify-items-center py-1 rounded 
            focus:ring-green-200 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2
             hover:bg-green-200"
							onClick={addGroup}><i><FaPlus size={42} /></i></button>
						{questionGroups.length === 0 ? <span /> : (
							<button className="w-full bg-red-100 grid grid-cols-1 justify-items-center py-1 rounded 
              focus:ring-red-200 focus:ring-opacity-50 focus:outline-none
              focus:ring focus:ring-offset-2 hover:bg-red-200" onClick={removeGroup}><i><FaMinus size={42} /></i></button>
						)}
					</span>
				</div>
			</div>
		</div>

	)
}