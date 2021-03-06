import { FaPlus, FaMinus } from "react-icons/fa";
import QuestionCard from "./questionCard";

export default function QuestionSection() {
  const dummyFunction = () => { };
  return (
    <div className="text-gray-900">
      hee
      <QuestionCard
        title="Hello Questions"
        questions={["how are you", "how is your wife"]}
        answer="Great, thanks!"
      />
      <span className="flex justify-around">
        <button className="w-full bg-green-100 grid grid-cols-1 justify-items-center py-1 rounded focus:ring-green-200 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 hover:bg-green-200" onClick={dummyFunction()}><i><FaPlus size={42}/></i></button>
        <button className="w-full bg-red-100 grid grid-cols-1 justify-items-center py-1 rounded focus:ring-red-200 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 hover:bg-red-200" onClick={dummyFunction()}><i><FaMinus size={42}/></i></button>
        </span>
    </div>
    
  )
}