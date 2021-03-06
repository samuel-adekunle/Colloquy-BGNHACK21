import { AuthAction, withAuthUser } from "next-firebase-auth";
import { useState } from "react";
import Loader from "react-loader-spinner";
import BotDashboard from "../components/botDashboard";
import BotMenu from "../components/botMenu";
import HeaderBar from "../components/headerBar";
import { makeKeyGenerator } from "../utils/keyGen";

export const keyGen = makeKeyGenerator()

function App() {
	// const [questionGroups, setQuestionGroups] = useState([defaultQuestion]);

	const [bots, setBots] = useState([{
		uid: keyGen("bb"),
		name: "new bot",
		intents: []
	}]);

	const [currentBotIndex, setCurrentBotIndex] = useState(0);

	const addBot = () => {
		setBots((prevState) => {
			return [...prevState, {
				uid: keyGen("bb"),
				name: "new bot",
				intents: []
			}];
		});
	}

	const addGroup = () => {
		setBots((prevState) => {
			let oldBot = prevState[currentBotIndex]
			oldBot.intents.push({
				uid: keyGen("qg"),
				tag: "",
				patterns: [""],
				responses: [""]
			})
			return [...prevState.slice(0, currentBotIndex), oldBot, ...prevState.slice(currentBotIndex + 1)]
		});
	};

	const addQuestionAt = (index) => {
		setBots((prevState) => {
			let oldBot = prevState[currentBotIndex]
			oldBot.intents[index].patterns.push("")
			return [...prevState.slice(0, currentBotIndex), oldBot, ...prevState.slice(currentBotIndex + 1)]
		});
	};

	const changeTitle = (index, inputText) => {
		setBots((prevState) => {
			let oldBot = prevState[currentBotIndex]
			oldBot.intents[index].tag = inputText
			
			return [...prevState.slice(0, currentBotIndex), oldBot, ...prevState.slice(currentBotIndex + 1)
		]
		});
	};

	const changeQuestion = (groupId, questionId, inputText) => {
		setBots((prevState) => {
			let oldBot = prevState[currentBotIndex]
			oldBot.intents[groupId].patterns[questionId] = inputText
			return [...prevState.slice(0, currentBotIndex), oldBot, ...prevState.slice(currentBotIndex + 1)]
		});
	};

	const changeAnswer = (index, inputText) => {
		setBots((prevState) => {
			let oldBot = prevState[currentBotIndex]
			oldBot.intents[index].responses[0] = inputText
			return [...prevState.slice(0, currentBotIndex), oldBot, ...prevState.slice(currentBotIndex + 1)]
		});
	};

	const renameBot = (id, newName) => {
		setBots((prevState) => {
			let oldBot = prevState[id];
			oldBot.name = newName;
			return [...prevState.slice(0, id), oldBot, ...prevState.slice(id+1)];
		})
	}
	const removeBot = () => {
		setBots((prevState) => {
			if (currentBotIndex !== 0) {	
				setCurrentBotIndex(currentBotIndex - 1) 
				return [...prevState.slice(0, currentBotIndex), ...prevState.slice(currentBotIndex + 1)];
			}
			else {
				return [...prevState.slice(1)];
			}
		});
	}
	const removeGroup = () => {
		setBots((prevState) => {
			let oldBot = prevState[currentBotIndex]
			oldBot.intents.pop()
			return [...prevState.slice(0, currentBotIndex), oldBot, ...prevState.slice(currentBotIndex + 1)]
		});
	};

	const removeQuestionAt = (index) => {
		setBots((prevState) => {
			let oldBot = prevState[currentBotIndex]
			oldBot.intents[index].patterns.pop()
			return [...prevState.slice(0, currentBotIndex), oldBot, ...prevState.slice(currentBotIndex + 1)]
		});
	};

	return (
		<div className="text-gray-900 flex flex-col h-screen justify-between">
			<HeaderBar />
			<div className="grid grid-cols-5">
				<div>
					<BotMenu
						bots={bots}
						addBot={addBot}
						renameBot={renameBot}
						setCurrentBotIndex={setCurrentBotIndex}
						currentBotIndex={currentBotIndex}
					/>
				</div>
				<div className="col-span-4">
					<BotDashboard
						bot={bots[currentBotIndex]}
						addGroup={addGroup}
						removeGroup={removeGroup}
						addQuestionAt={addQuestionAt}
						changeAnswer={changeAnswer}
						changeQuestion={changeQuestion}
						changeTitle={changeTitle}
						removeQuestionAt={removeQuestionAt}
						removeBot={removeBot}
					/>
				</div>
			</div>
		</div>
	);
}

function Loading() {
	return (
		<div className="flex justify-center items-center w-full h-full my-1/5">
			<Loader color="#000" height={200} width={200} />
		</div>
	);
}

export default withAuthUser({
	whenAuthed: AuthAction.RENDER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	LoaderComponent: Loading,
})(App);
