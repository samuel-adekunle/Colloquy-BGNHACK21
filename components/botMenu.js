import { useState } from "react";
export default function BotMenu({ bots, renameBot, addBot, setCurrentBotIndex, currentBotIndex }) {
  const [editOn, setEditOn] = useState(false)

  return (
    <div className="fixed bg-white top-0 left-0 w-1/5 shadow p-3 flex flex-col h-screen justify-between">
      <h1 className="text-5xl mt-3 text-center">Your Bots</h1>
      {bots.map((bot, index) => (
        editOn ? ( currentBotIndex!==index ? 
          (<p
            key={index}
            className = "text-blue-800 text-3xl py-3 border-b block focus:outline-none"
            >{bot.name}</p>) : (
            <input
            key={index}
            type="text"
            value={bot.name}
            className = "text-3xl py-3 block border-none focus:outline-none rounded"  
            onChange={(e) => {
              renameBot(index, e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                setEditOn(false);
              }
            }}
          />
          )
        ) : (
          <p
          key={index}
          onDoubleClick={() => {
            setEditOn(true);
          }}
          onClick = {() => {
            setCurrentBotIndex(index);
          }}  
          className = "text-blue-800 text-3xl py-3 border-b block focus:outline-none"
          >{bot.name}</p>
        )
      ))}
      <button className="footerBtn bottom-0 bg-green-300" onClick={addBot}>Add Bot</button>
    </div>
  );
}
