import React, { useEffect, useState, useRef } from "react";
import { sendMessage } from "../../Redux/actions";
import "./chatbot.css";
import { useDispatch } from "react-redux";
export default function Homepage() {
    const [Input, setInput] = useState("");
    const dispatch = useDispatch();
    var running = false;
    const NewMsg = useRef();
    const addResponseMsg = (msg) => {
        var div = document.createElement("div");
        div.innerHTML = "<div class='chat-message'>" + msg + "</div>";
        div.className = "chat-message-div";
        document.getElementById("message-box").appendChild(div);
        running = false;
        const msgbox = document.getElementById("message-box");
        msgbox.scrollTop = msgbox.scrollHeight;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const welcome = "Hi " + localStorage.getItem("name");
        addResponseMsg(welcome);
    }, []);

    const send = () => {
        if (running === true) return;
        var msg = Input;
        if (msg === "") return;
        running = true;
        addMsg(msg);
        setInput("");
    };
    const addMsg = (msg) => {
        var div = document.createElement("div");
        div.innerHTML =
            "<span style='flex-grow:1'></span><div class='chat-message'>" +
            msg +
            "</div>";
        div.className = "chat-message-div";
        document.getElementById("message-box").appendChild(div);
        const msgbox = document.getElementById("message-box");
        msgbox.scrollTop = msgbox.scrollHeight;
        dispatch(sendMessage({ message: msg })).then((res) => {
            if (res.status === 201) {
                window.setTimeout(addResponseMsg, 1000, res.data.response);
            }
        });
    };

    return (
        <div className="flex flex-col items-center px-3 ">
            <div className="main-card w-full md:w-1/2 lg:w-2/5">
                <div className="main-title py-4 px-4 bg-indigo-500 text-sm lg:text-lg font-bold">
                    <span>Covid Chatbot</span>
                </div>
                <div className="chat-area" id="message-box"></div>
                <div className="input-div flex flex-row" id="end" ref={NewMsg}>
                    <input
                        className="input-message text-black w-5/6"
                        name="message"
                        type="text"
                        id="message"
                        value={Input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (13 === (e.keyCode || e.which)) {
                                send();
                            }
                        }}
                    />
                    <button
                        className="input-send bg-indigo-600 mr-2 items-center text-center"
                        onClick={send}>
                        <svg className="w-24 ml-3 h-24">
                            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
