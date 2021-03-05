import QuestionCard from "../components/questionCard";

export default function App() {
  
  return (
    <div>
      hee
      <QuestionCard
        title="Hello Questions"
        questions={["how are you", "how is your wife"]}
        answer="Great, thanks!"
      />
    </div>
  )
}