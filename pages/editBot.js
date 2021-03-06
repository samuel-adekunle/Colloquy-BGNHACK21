import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import BotMenu from "../components/botMenu";
import HeaderBar from "../components/headerBar";
import QuestionCard from "../components/questionCard";

export default function EditBot() {
  const [questionGroups, setQuestionGroups] = useState([]);
  const removeQuestion = (id) => {
    setQuestionGroups((oldGroups) => {
      oldGroups[id].questions.pop();
      return oldGroups;
    })
  }

  const addQuestion = (id) => {
    setQuestionGroups((oldGroups) => {
      oldGroups[id].questions.push(" ");
      return oldGroups;
    })
  }

  const addGroup = () => {
    setQuestionGroups([...questionGroups,{
      title: "",
      questions: ["www",""],
      answer: "",
    },]);
  }
  
  const removeGroup = () => {
    setQuestionGroups((oldGroups) => {
      if (oldGroups.length === 1) {
        return oldGroups.splice(1);
      }
      else {
        return oldGroups.splice(-1, 1);
      }

    })
  };
  return (
    <div className="text-gray-900">
      <HeaderBar/>
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
            <QuestionCard title={group.title} questions={group.questions} answer={group.answer} key={index} remove={() => removeQuestion(index)} add={() => addQuestion(index)}/>
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