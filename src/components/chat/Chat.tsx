import { WechatOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import ChatCollapse from "./ChatCollapse";
import "./styles.scss";

type Props = {
  authedData?: any;
};
 const Chat:React.FC<Props>  = ({authedData})=> {
  const [isOpen, setisOpen] = useState(false);

  const oldPositionX = useRef(0);
  const oldPositionY = useRef(0);
  const openChat = () => {
    const fabElement: any = document.getElementById("peb-chat-btn");
    const fabColElement: any = document.getElementById("pebChatCollape");
    const height = window.innerHeight
    if (
      oldPositionY.current === fabElement.style.top &&
      oldPositionX.current === fabElement.style.left
    ) {
      fabElement.classList.toggle("fab-active");
      if (Number(fabElement.style.left.replace("px", "")) < 50) {
        fabColElement.style.left = "0px";
        fabColElement.style.right = "unset";
      } else {
        fabColElement.style.left = "unset";
        fabColElement.style.right = "0px";
      }
      if (
        (height-Number(fabElement.style.top.replace("px", "")) < 200) ||
        Number(fabElement.style.top.replace("px", "")) === 0
      ) {
        fabColElement.style.bottom = "0px";
        fabColElement.style.top = "unset";
      } else {
        fabColElement.style.bottom = "unset";
        fabColElement.style.top = "0px";
      }
      setisOpen(true);
    }
  };
  const closeChat = () => {
    const fabElement: any = document.getElementById("peb-chat-btn");

    setisOpen(false);
    fabElement.classList.remove("fab-active");
  };
  const move = (e: any) => {
    const fabElement: any = document.getElementById("peb-chat-btn");
    if (!fabElement.classList.contains("fab-active")) {
      if (e.type === "touchmove") {
        fabElement.style.top = e.touches[0].clientY + "px";
        fabElement.style.left = e.touches[0].clientX + "px";
      } else {
        fabElement.style.top = e.clientY + "px";
        fabElement.style.left = e.clientX + "px";
      }
    }
  };

  const mouseDown = (e: any) => {
    const fabElement: any = document.getElementById("peb-chat-btn");
    oldPositionY.current = fabElement.style.top;
    oldPositionX.current = fabElement.style.left;
    if (e.type === "mousedown") {
      window.addEventListener("mousemove", move);
    } else {
      window.addEventListener("touchmove", move);
    }

    fabElement.style.transition = "none";
  };

  const mouseUp = (e: any) => {
    const fabElement: any = document.getElementById("peb-chat-btn");
    if (e.type === "mouseup") {
      window.removeEventListener("mousemove", move);
    } else {
      window.removeEventListener("touchmove", move);
    }
    snapToSide(e);

    fabElement.style.transition = "0.3s ease-in-out left";
  };

  const snapToSide = (e: any) => {
    const fabElement: any = document.getElementById("peb-chat-btn");
    const wrapperElement: any = document.getElementById("peb-layout");
    const windowWidth = window.innerWidth;
    let currPositionX, currPositionY;
    if (e.type === "touchend") {
      currPositionX = e.changedTouches[0].clientX;
      currPositionY = e.changedTouches[0].clientY;
    } else {
      currPositionX = e.clientX;
      currPositionY = e.clientY;
    }
    if (currPositionY < 50) {
      fabElement.style.top = 130 + "px";
    }
    if (currPositionY > wrapperElement.clientHeight - 50) {
      fabElement.style.top = wrapperElement.clientHeight - 50 + "px";
    }
    if (currPositionX < windowWidth / 2) {
      fabElement.style.left = 35 + "px";
      fabElement.classList.remove("right");
      fabElement.classList.add("left");
    } else {
      fabElement.style.left = windowWidth - 50 + "px";
      fabElement.classList.remove("left");
      fabElement.classList.add("right");
    }
  };
  return (
    <div
      id="peb-chat-btn"
      className="peb-chat"
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onTouchStart={mouseDown}
      onTouchEnd={mouseUp}
    >
      <button
        className={"peb-chat-btn " + (isOpen ? "hide" : "")}
        onClick={openChat}
      >
        <WechatOutlined style={{ fontSize: "32px" }} />
      </button>
      <ChatCollapse isModal={true} isOpen={isOpen} setIsOpen={closeChat} authedData={authedData}/>
    </div>
  );
}
export default Chat