export default function QuestionCard({ title, questions, answer}) {
  const dummyFunction = () => { };
  return (
    <div className="border-2 rounded-md">
      <h2 className="text-2xl">{title}</h2>
      <div className="">
        {
          questions.map((q) => (
            <input
            type="text"
            name="question"
            value={q}
              key={q}
              className=""
              />))
            }
        <input
          type="text"
          name="question"
          placeholder="add a question here"
          className="w-full"
        />
        <span>
          <button onClick={dummyFunction()}>plus</button>
          <button onClick={dummyFunction()}>minus</button>
        </span>
         <input
          type="text"
          name="answer"
          placeholder="add the answer to these questions here"
          value={answer}
          className="w-full"
          />
      </div>
      {/* add-on changes  */}
     </div>
   )
 }