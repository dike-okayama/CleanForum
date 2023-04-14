import React, { useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function generateRandomString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 26) + 97;
        result += String.fromCharCode(randomNumber);
    }
    return result;
}

function Post(props) {
    const [textBody, setTextBody] = useState(props.textBody);
    const [emotionalValue, setEmotionalValue] = useState(null);
    const [userName, setUserName] = useState(generateRandomString(10));

    const textBodyWithBreaks = textBody.split("\n").map((line, i) => (
        <React.Fragment key={i}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <div className="post">
            <img
                src="https://forum.uoh-dakken.com/forum/static/favicon.ico"
                alt=""
                className="user-icon"
            ></img>
            <div>
                <div className="user-name">{userName}</div>
                <div className="text-body">{textBodyWithBreaks}</div>
            </div>
        </div>
    );
}

function InputForm(props) {
    const [textBody, setTextBody] = useState("");
    const [height, setHeight] = useState("1rem");
    const textareaRef = useRef(null);

    function handleTextChange(event) {
        setTextBody(event.target.value);
        adjustTextareaHeight();
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onPost(textBody);
        setTextBody("");
        setHeight("1rem");
    }

    function adjustTextareaHeight() {
        const textarea = textareaRef.current;
        textarea.style.height = "0";
        textarea.style.height = `calc(${textarea.scrollHeight}px - 1rem)`;
        setHeight(textarea.style.height);
    }

    return (
        <div className="input">
            <img
                src="https://forum.uoh-dakken.com/forum/static/favicon.ico"
                alt=""
                className="user-icon"
            />
            <form onSubmit={handleSubmit} className="input-form">
                <textarea
                    ref={textareaRef}
                    value={textBody}
                    onChange={handleTextChange}
                    placeholder="What's happening?"
                    className="input-textarea"
                    style={{ height: height }}
                />
                <button type="submit" className="input-button">
                    Post
                </button>
            </form>
        </div>
    );
}

function Thread(props) {
    const [posts, setPosts] = React.useState(props.posts);
    function newPost(textBody) {
        // TODO: 一意なkey属性を指定する
        const newPost = <Post key={posts.length} textBody={textBody} />;
        setPosts([newPost, ...posts]);
        props.setPosts([newPost, ...props.posts]);
    }
    console.log(posts.length.toString());
    return (
        <div className="thread">
            <InputForm onPost={newPost} />
            {posts.map((post, i) => {
                return <li key={i}>{post}</li>;
            })}
        </div>
    );
}

function Home() {
    const [globalThreadData, setGlobalThreadData] = useState([
        <Post textBody="Hello" key="2" />,
        <Post textBody="This is " key="1" />,
        <Post textBody="Global Thread" key="0" />,
    ]);

    const [localThreadData, setLocalThreadData] = useState([
        <Post textBody="Hello" key="2" />,
        <Post textBody="This is " key="1" />,
        <Post textBody="Local Thread" key="0" />,
    ]);

    // TODO: 一意なkey属性を指定する
    const globalThread = (
        <Thread
            key="globalThread"
            posts={globalThreadData}
            setPosts={setGlobalThreadData}
        />
    );

    const localThread = (
        <Thread
            key="localThread"
            posts={localThreadData}
            setPosts={setLocalThreadData}
        />
    );

    const [displayGlobalThread, setDisplayGlobalThread] = useState(true);
    const thread = displayGlobalThread ? globalThread : localThread;

    return (
        <div className="home">
            <h3 style={{ marginLeft: "1rem" }}>Home</h3>
            <div className="home-tab">
                <div
                    className={`home-tab-element ${
                        displayGlobalThread ? "home-active-tab" : ""
                    }`}
                    onClick={() => {
                        setDisplayGlobalThread(true);
                    }}
                >
                    Global
                </div>
                <div
                    className={`home-tab-element ${
                        displayGlobalThread ? "" : "home-active-tab"
                    }`}
                    onClick={() => {
                        setDisplayGlobalThread(false);
                    }}
                >
                    Local
                </div>
            </div>
            {thread}
        </div>
    );
}

function App() {
    return <Home />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
