import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import BotMenu from "../components/botMenu";
import HeaderBar from "../components/headerBar";
import ButtonFooter from "../components/buttonFooter";
import QuestionCard from "../components/questionCard";

const questionGroupTemplate = {
	title: "",
	questions: [""],
	answer: "",
}
const defaultQuestion = {
	title: "Hello Questions",
	questions: ["How are you?", "how are you doing today?"],
	answer: "Great, Thanks!",
}
export default function EditBot() {
	const [questionGroups, setQuestionGroups] = useState([defaultQuestion]);

  const addGroup = () => {
    setQuestionGroups((oldGroups) => [...oldGroups, questionGroupTemplate]);
  };

	const removeGroup = () => {
		setQuestionGroups((oldGroups) => oldGroups.splice(0, oldGroups.length - 1))
	};

  const removeQuestionAt = (index) => {
    setQuestionGroups((oldGroups) => {
      let oldGroup = oldGroups[index]
      oldGroup.questions.pop()
			
      return [...oldGroups.splice(0, index), oldGroup, ...oldGroups.splice(index + 1)]
    })
  };

  const addQuestionAt = (index) => {
    setQuestionGroups((oldGroups) => {
      let oldGroup = oldGroups[index]
      oldGroup.questions.push("")
			
      return [...oldGroups.splice(0, index), oldGroup, ...oldGroups.splice(index + 1)]
    })
  };
  
  const changeTitle = (index, inputText) => {
    setQuestionGroups((oldGroups) => {
      let oldGroup = oldGroups[index]
      oldGroup.title = inputText
      return [...oldGroups.splice(0, index), oldGroup, ...oldGroups.splice(index + 1)]
    })
  }
  const changeQuestion = (groupId, questionId, inputText) => {
    setQuestionGroups((oldGroups) => {
      let oldGroup = oldGroups[groupId];
      oldGroup.questions[questionId] = inputText
      return [...oldGroups.splice(0, groupId), oldGroup, ...oldGroups.splice(groupId + 1)]
    })
  }
  const changeAnswer = (index, inputText) => {
    setQuestionGroups((oldGroups) => {
      let oldGroup = oldGroups[index]
      oldGroup.answer = inputText
      return [...oldGroups.splice(0, index), oldGroup, ...oldGroups.splice(index + 1)]
    })
  }

	return (
		<div className="text-gray-900 flex flex-col h-screen justify-between">
			<HeaderBar />
			<div className="grid grid-cols-5">
				<div>
					<BotMenu />
				</div>
        <div className="col-span-4">
        <div className="m-9">
            {questionGroups.map((group, index) => (
              <QuestionCard 
              key={index}
                id={index}
                title={group.title} 
                questions={group.questions} 
                answer={group.answer}
                remove={() => removeQuestionAt(index)} 
                add={() => addQuestionAt(index)}
                modifyAnswer={changeAnswer}
                modifyTitle={changeTitle}
                modifyQuestion={changeQuestion}
              />
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
          <ButtonFooter />
				</div>
      </div>
		</div>

	)
}