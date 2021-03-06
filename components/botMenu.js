export default function BotMenu({ bots, renameBot, addBot, setCurrentBotIndex }) {
  
  return (
    <div className="fixed bg-white top-0 left-0 w-1/5 shadow p-3 flex flex-col h-screen justify-between">
      <h1 className="text-5xl mt-3 text-center">Your Bots</h1>
      {bots.map((bot,index) => (
        <button key={index} className="text-blue-800 text-3xl py-3 border-b block focus:outline-none"
          onClick={() => {
            setCurrentBotIndex(index);
          }}
        >{bot.name}</button>
      ))}
      <button className="footerBtn bottom-0" onClick={addBot}>Add Bot</button>
    </div>
  );
}
