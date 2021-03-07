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
    <div className="fixed bg-white top-0 left-0 w-1/5 shadow flex flex-col h-screen justify-between">
      <h1 className="text-5xl mt-3 text-center p-3">Your Bots</h1>
      {bots.map((bot, index) =>
        editOn ? (
          currentBotIndex !== index ? (
            <p
              key={bot.uid}
              className="menuText"
            >
              {bot.name}
            </p>
          ) : (
            <input
              key={bot.uid}
              type="text"
              value={bot.name}
              className="text-3xl block border-none focus:outline-none rounded"
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
            className={currentBotIndex == index ? "menuText bg-blue-100":"menuText" }
          >
            {bot.name}
          </p>
        )
      )}
      <button className="btn bottom-1 bg-green-300 hover:bg-green-200" onClick={addBot}>
        Add Bot
      </button>
    </div>
  );
}
