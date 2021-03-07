import admin from "firebase-admin";
import firebase from "firebase/app";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useState } from "react";
import Loader from "react-loader-spinner";
import BotDashboard from "../components/botDashboard";
import BotMenu from "../components/botMenu";
import HeaderBar from "../components/headerBar";
import { makeKeyGenerator } from "../utils/keyGen";

export const keyGen = makeKeyGenerator();

function App({ userBots }) {
  const authUser = useAuthUser();
  const db = firebase.database();

  const ref = db.ref(`/bots/${authUser.id}`);

  const [bots, setBots] = useState(userBots);

  const [currentBotIndex, setCurrentBotIndex] = useState(0);

  const addBot = () => {
    const newState = [
      ...bots,
      {
        uid: keyGen("bb"),
        name: "new bot",
        intents: [
          {
            uid: keyGen("qg"),
            tag: "",
            patterns: [""],
            responses: [""],
          },
        ],
      },
    ];

    ref.set(newState);

    setBots(newState);
  };

  const removeBot = () => {
    if (bots.length !== 1) {
      const newState = [
        ...bots.slice(0, currentBotIndex),
        ...bots.slice(currentBotIndex + 1),
      ];

      ref.set(newState);

      setBots(() => {
        setCurrentBotIndex(Math.max(0, currentBotIndex - 1));
        return newState;
      });
    }
  };

  const addGroup = () => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents.push({
      uid: keyGen("qg"),
      tag: "",
      patterns: [""],
      responses: [""],
    });
    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const addQuestionAt = (index) => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents[index].patterns.push("");

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const addIntents = (newIntents) => {
    setBots((prevState) => {
      let oldBot = prevState[currentBotIndex];
      oldBot.intents = [...oldBot.intents, ...newIntents];
      return [
        ...prevState.slice(0, currentBotIndex),
        oldBot,
        ...prevState.slice(currentBotIndex + 1),
      ];
    });
  };

  const changeTitle = (index, inputText) => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents[index].tag = inputText;

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const changeQuestion = (groupId, questionId, inputText) => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents[groupId].patterns[questionId] = inputText;

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const changeAnswer = (index, inputText) => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents[index].responses[0] = inputText;

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const renameBot = (id, newName) => {
    let oldBot = bots[id];
    oldBot.name = newName;

    const newState = [...bots.slice(0, id), oldBot, ...bots.slice(id + 1)];

    ref.set(newState);

    setBots(newState);
  };

  const removeGroup = () => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents.pop();

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const removeQuestionAt = (index) => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents[index].patterns.pop();

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  return (
    <div className="text-gray-900 flex flex-col h-screen justify-between">
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
        <HeaderBar name={bots[currentBotIndex].name}/>
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
            canDelete={bots.length !== 1}
            addUrlGeneratedQuestions={addIntents}
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

const arrayFromObject = (obj) => {
  return Array.from(Object.keys(obj), (k, i) => obj[k]);
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const db = admin.database();

  const uid = AuthUser.id;
  const ref = db.ref(`/bots/${uid}`);
  let userData = (await ref.get()).toJSON();

  if (userData === null) {
    await ref.set([
      {
        uid: keyGen("bb"),
        name: "new bot",
        intents: [
          {
            uid: keyGen("qg"),
            tag: "",
            patterns: [""],
            responses: [""],
          },
        ],
      },
    ]);

    userData = (await ref.get()).toJSON();
  }

  userData = arrayFromObject(userData);

  for (const item of userData) {
    item["intents"] = arrayFromObject(item["intents"]);

    for (const intent of item["intents"]) {
      intent["patterns"] = arrayFromObject(intent["patterns"]);
      intent["responses"] = arrayFromObject(intent["responses"]);
    }
  }

  return {
    props: {
      userBots: userData,
    },
  };
});

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loading,
})(App);
