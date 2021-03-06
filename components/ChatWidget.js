import React, { useEffect } from "react";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () =>
    import("react-chat-widget").then((mod) => {
      return mod.Widget;
    }),
  {
    loading: () => <>Loading&nbsp;&hellip;</>,
    ssr: false,
  }
);

export default ChatWidget;

const getCustomLauncher = (handleToggle) => (
  <button onClick={handleToggle}>This is my launcher component!</button>
);
