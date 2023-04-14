import React from "react";
import ThreadTab from "./ThreadTab";
import Thread from "./Thread";
import PostProvider from "./PostProvider";
import ThreadProvider from "./ThreadProvider";

export default function Home() {
    return (
        <div
            style={{
                width: "50%",
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                borderLeft: "1px solid rgb(227, 227, 227)",
                borderRight: "1px solid rgb(227, 227, 227)",
            }}
        >
            <ThreadProvider>
                <header
                    style={{
                        zIndex: "2",
                        height: "6.3rem",
                        position: "fixed",
                        width: "inherit",
                        backdropFilter: "blur(20px) opacity(0.9)",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                >
                    <h3
                        style={{
                            marginLeft: "1rem",
                        }}
                    >
                        Home
                    </h3>
                    <ThreadTab></ThreadTab>
                </header>
                <div
                    style={{
                        height: "7rem",
                    }}
                ></div>
                <PostProvider>
                    <Thread />
                </PostProvider>
            </ThreadProvider>
        </div>
    );
}
