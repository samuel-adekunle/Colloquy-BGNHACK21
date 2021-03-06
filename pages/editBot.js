import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import BotMenu from "../components/botMenu";
import HeaderBar from "../components/headerBar";
import QuestionCard from "../components/questionCard";

export default function App() {
  const [questionGroups, setQuestionGroups] = useState([]);
  const dummyFunction = () => {};

  const removeQuestion = (id) => {
    setQuestionGroups((oldGroups) => {
      return oldGroups[id].questions.pop();
    });
  };

  const addQuestion = (id) => {
    setQuestionGroups((oldGroups) => {
      return (oldGroups[id].questions = [oldGroups]);
    });
  };

  const addGroup = () => {
    setQuestionGroups([
      ...questionGroups,
      {
        title: "",
        questions: [],
        answer: "",
      },
    ]);
  };

  // const removeGroup = () => {
  //   setQuestionGroups((oldGroups) => {
  //     return oldGroups.splice(-1, 1);
  //   });
  // };

  const removeGroup = () => {
    setQuestionGroups((oldGroups) => oldGroups.splice(0, oldGroups.length - 1));
  };

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
              title={group.title}
              questions={group.questions}
              answer={group.answer}
              key={index}
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
          </span>
        </div>
      </div>
    </div>
  );
}
