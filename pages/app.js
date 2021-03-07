import admin from "firebase-admin";
import firebase from "firebase/app";
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR
} from "next-firebase-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "react-loader-spinner";
import BotDashboard from "../components/botDashboard";
import BotMenu from "../components/botMenu";
import HeaderBar from "../components/headerBar";
import {
	deleteModel,
	getSecretKey,
	getTemplate,
	TEMPLATES,
	trainModel
} from "../utils/chatApi";
import { makeKeyGenerator } from "../utils/keyGen";

export const keyGen = makeKeyGenerator();

function App({ userBots, userKey }) {
	const router = useRouter()

  const authUser = useAuthUser();
  const db = firebase.database();

  const ref = db.ref(`/bots/${authUser.id}`);

  const [bots, setBots] = useState(userBots);

  const [currentBotIndex, setCurrentBotIndex] = useState(0);

  const [training, setTraining] = useState(false);

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

      deleteModel(userKey, bots[currentBotIndex]["uid"]);

      ref.set(newState);

      setBots(() => {
        setCurrentBotIndex(Math.max(0, currentBotIndex - 1));
        return newState;
      });
    }
  };

  const addGroup = () => {
    let oldBot = bots[currentBotIndex];
    if (oldBot.intents) {
      oldBot.intents.push({
        uid: keyGen("qg"),
        tag: "",
        patterns: [""],
        responses: [""],
      });
    } else {
      oldBot.intents = [
        {
          uid: keyGen("qg"),
          tag: "",
          patterns: [""],
          responses: [""],
        },
      ];
    }

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
    if (oldBot.intents[index].patterns) {
      oldBot.intents[index].patterns.push("");
    } else {
      oldBot.intents[index].patterns = [""];
    }

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const addIntents = (newIntents) => {
    let oldBot = bots[currentBotIndex];
    oldBot.intents = [...oldBot.intents, ...newIntents];

    const newState = [
      ...bots.slice(0, currentBotIndex),
      oldBot,
      ...bots.slice(currentBotIndex + 1),
    ];

    ref.set(newState);

    setBots(newState);
  };

  const importTemplates = async () => {
    const templateKeys = Object.keys(TEMPLATES);

    const templates = templateKeys.map((v, i) => `${i + 1}. ${v}`).join("\n");

    const templateIndex = window.prompt(
      `Select a template to import: \n${templates}`,
      "1"
    );
    if (templateIndex !== null) {
      const selectedKey = templateKeys[Number(templateIndex) - 1];
      let _intents = await getTemplate(TEMPLATES[selectedKey]);
      for (let _intent of _intents) {
        _intent["uid"] = keyGen("gg");
      }
      addIntents(_intents);
    }
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

  const trainBot = async () => {
    setTraining(true);
    const botName = bots[currentBotIndex]["name"];
    trainModel(
      userKey,
      bots[currentBotIndex]["uid"],
      bots[currentBotIndex]["intents"]
    )
      .then((res) => res.json())
      .then((resJson) => {
        window.alert(`Finished training ${botName}`);
        console.log(resJson);
        setTraining(false);
      });
  };

	const testBot = () => {
		window.open(`/chat/${userKey}/${bots[currentBotIndex]["uid"]}`, "_blank")
	}

  return (
    <div className="text-gray-900 flex flex-col h-screen justify-between bg-gray-50">
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
          <HeaderBar name={bots[currentBotIndex].name} />
          <BotDashboard
            bots={bots}
            currentBotIndex={currentBotIndex}
            addGroup={addGroup}
            removeGroup={removeGroup}
            addQuestionAt={addQuestionAt}
            changeAnswer={changeAnswer}
            changeQuestion={changeQuestion}
            changeTitle={changeTitle}
            removeQuestionAt={removeQuestionAt}
            removeBot={removeBot}
            importTemplates={importTemplates}
            trainBot={trainBot}
            training={training}
						testBot={testBot}
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
  const bots = db.ref(`/bots/${uid}`);
  const key = db.ref(`/keys/${uid}`);

  let userBots = (await bots.get()).toJSON();
  let userKey = (await key.get()).toJSON();

  if (userKey === null) {
    const _key = await getSecretKey(AuthUser.email, AuthUser.id);
    await key.set(_key);

    userKey = (await key.get()).toJSON();
  }

  if (userBots === null) {
    await bots.set([
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

    userBots = (await bots.get()).toJSON();
  }

  userBots = arrayFromObject(userBots);

  for (const item of userBots) {
    if (item["intents"]) {
      item["intents"] = arrayFromObject(item["intents"]);

      for (const intent of item["intents"]) {
        if (intent["patterns"]) {
          intent["patterns"] = arrayFromObject(intent["patterns"]);
        }
        if (intent["responses"]) {
          intent["responses"] = arrayFromObject(intent["responses"]);
        }
      }
    }
  }

  return {
    props: {
      userBots,
      userKey,
    },
  };
});

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loading,
})(App);
