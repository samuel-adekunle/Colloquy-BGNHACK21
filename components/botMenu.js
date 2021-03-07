import { useState } from "react";
export default function BotMenu({
  bots,
  renameBot,
  addBot,
  setCurrentBotIndex,
  currentBotIndex,
}) {
  const [editOn, setEditOn] = useState(false);

  return (
    <div className="border-4 border-gray-100 rounded-md p-3 bg-white my-3 shadow-md mx-2 fixed max-w-1/5">
      <h1 className="text-5xl py-1 text-center px-3 font-medium mb-5">Your Bots</h1>
      {bots.map((bot, index) =>
        editOn ? (
          currentBotIndex !== index ? (
            <p key={bot.uid} className="menuText">
              {bot.name}
            </p>
          ) : (
            <input
              key={bot.uid}
              type="text"
              value={bot.name}
              className="text-3xl w-full border-none focus:outline-none rounded"
              onChange={(e) => {
                renameBot(index, e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  setEditOn(false);
                }
              }}
            />
          )
        ) : (
          <p
            key={bot.uid}
            onDoubleClick={() => {
              setEditOn(true);
            }}
            onClick={() => {
              setCurrentBotIndex(index);
            }}
            className={
              currentBotIndex == index ? "menuText bg-blue-100" : "menuText"
            }
          >
            {bot.name}
          </p>
        )
      )}
      <button
        className="btn w-full mt-5 text-2xl text-semibold bg-green-300 hover:bg-green-200"
        onClick={addBot}
      >
        Add Bot
      </button>
    </div>
  );
}
