import React, { createContext, useContext, useState } from "react";
import globalPostData from "./global-post-data.json";
import localPostData from "./local-post-data.json";

const ThreadContext = createContext();
export const useThreads = () => useContext(ThreadContext);

export default function ThreadProvider({ children }) {
    const [thread, setThread] = useState(globalPostData);
    const setGlobalThread = () => {
        setThread(globalPostData);
    };
    const setLocalThread = () => {
        setThread(localPostData);
    };
    return (
        <ThreadContext.Provider
            value={{ thread, setGlobalThread, setLocalThread }}
        >
            {children}
        </ThreadContext.Provider>
    );
}
