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

function Post({ textBody }) {
    const [textBody, setTextBody] = useState(textBody);
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

function InputForm({ onPost }) {
    const [textBody, setTextBody] = useState("");
    const [height, setHeight] = useState("1rem");
    const textareaRef = useRef(null);

    function handleTextChange(event) {
        setTextBody(event.target.value);
        adjustTextareaHeight();
    }

    function handleSubmit(event) {
        event.preventDefault();
        onPost(textBody);
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

function Thread({ posts, setPosts }) {
    function newPost(newPost) {
        setPosts([newPost, ...posts]);
        setPosts([newPost, ...posts]);
    }
    console.log(posts.length.toString());
    return (
        <div className="thread">
            <InputForm onPost={newPost} />
            {posts.map((post, i) => {
                return (
                    <li key={i}>
                        <Post {...post} />
                    </li>
                );
            })}
        </div>
    );
}

const GlobalThread = ({ posts, setPosts }) => (
    <Thread posts={posts} setPosts={setPosts} />
);

const LocalThread = ({ posts, setPosts }) => (
    <Thread posts={posts} setPosts={setPosts} />
);

function Home() {
    const [globalThreadData, setGlobalThreadData] = useState([
        { textBody: "Hello" },
        { textBody: "This is " },
        { textBody: "Global Thread" },
    ]);

    const [localThreadData, setLocalThreadData] = useState([
        { textBody: "Hello" },
        { textBody: "This is " },
        { textBody: "Local Thread" },
    ]);

    const [displayGlobalThread, setDisplayGlobalThread] = useState(true);

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
            {displayGlobalThread ? (
                <GlobalThread
                    posts={globalThreadData}
                    setPosts={setGlobalThreadData}
                />
            ) : (
                <LocalThread
                    posts={localThreadData}
                    setPosts={setLocalThreadData}
                />
            )}
        </div>
    );
}

function App() {
    return <Home />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
