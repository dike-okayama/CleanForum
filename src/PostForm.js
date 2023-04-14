import React, { useState, useRef, useEffect } from "react";
import { usePosts } from "./PostProvider";

// TODO: useRefを使わないにはどうすればよいか，textareaのscrollHeightはどう取得できるのだろうか

export default function PostForm() {
    const [content, setContent] = useState("");
    const { addPost } = usePosts();
    const textareaRef = useRef(null);
    const [height, setHeight] = useState(
        "calc(${textarea.scrollHeight}px - 1rem)"
    );

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "0";
        textarea.style.height = `calc(${textarea.scrollHeight}px - 1rem)`;
        setHeight(textarea.style.height);
    };

    const submit = (e) => {
        e.preventDefault();
        addPost(content);
        setContent("");
        setHeight("1rem");
    };

    useEffect(adjustTextareaHeight);
    return (
        <div
            style={{
                padding: "20px 1rem 10px 1rem",
                borderBottom: "1px solid rgb(227, 227, 227)",
                display: "flex",
            }}
        >
            <img
                src="https://forum.uoh-dakken.com/forum/static/favicon.ico"
                alt=""
                style={{
                    height: "40px",
                    borderRadius: "20px",
                }}
            />
            <form
                onSubmit={submit}
                style={{
                    width: "calc(100% - 1rem)",
                    textAlign: "right",
                }}
            >
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                        adjustTextareaHeight();
                    }}
                    type="text"
                    height={height}
                    placeholder="What's happening?"
                    required
                    style={{
                        width: "calc(100% - 1rem)",
                        fontSize: "large",
                        marginLeft: "1rem",
                        paddingBottom: "3%",
                        border: "none",
                        resize: "none",
                        borderBottom: "solid rgb(227, 227, 227) 1px",
                    }}
                />
                <button
                    style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "white",
                        padding: "9px 18px 9px 18px",
                        border: "none",
                        borderRadius: "20px",
                        backgroundColor: content
                            ? "rgb(24, 144, 224)"
                            : "rgb(160, 181, 195)",
                    }}
                >
                    POST
                </button>
            </form>
        </div>
    );
}
