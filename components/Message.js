import React from "react";

const Message = (props) => {
  return (
    <div className="col s12 m8 offset-m2 l6 offset-l3">
          {props.speaks === "bot" && (
            <div className="message-wrapper bot">
              <a
                href="/"
                id="bot-msg"
                className="btn-floating btn-large waves-effect waves-light red pulse message-icon"
              >
                <img id="icon" src='/android-chrome.svg'></img>
              </a>
              <div className="message-box">
                {props.text}
              </div>
            </div>
          )}
          
          {props.speaks === "user" && (
            <div className="message-wrapper user">
              <a
                href="/"
                id="user-msg"
                className="btn-floating btn-large waves-effect waves-light red message-icon"
              >
                {props.speaks}
              </a>
              <div className="message-box">
                {props.text}
              </div>
            </div>
          )}
    </div>
  );
};

export default Message;
