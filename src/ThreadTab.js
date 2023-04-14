import React, { useState } from "react";
import { useThreads } from "./ThreadProvider";

export default function ThreadTab() {
    const { setGlobalThread, setLocalThread } = useThreads();
    const [isGlobal, setIsGlobal] = useState(true);
    return (
        <div
            style={{
                display: "flex",
                borderBottom: "solid 1px rgb(227, 227, 227)",
            }}
        >
            <div
                style={{
                    color: isGlobal ? "black" : "rgb(140, 136, 136)",
                    fontSize: "small",
                    fontWeight: "800",
                    flex: "1",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: "1rem",
                    textDecoration: isGlobal ? "underline 2px" : "",
                    textUnderlineOffset: isGlobal ? "1.3rem" : "",
                }}
                onClick={() => {
                    setIsGlobal(true);
                    setGlobalThread();
                }}
            >
                Global
            </div>
            <div
                style={{
                    color: !isGlobal ? "black" : "rgb(140, 136, 136)",
                    fontSize: "small",
                    fontWeight: "800",
                    flex: "1",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: "1rem",
                    textDecoration: !isGlobal ? "underline 2px" : "",
                    textUnderlineOffset: !isGlobal ? "1.3rem" : "",
                }}
                onClick={() => {
                    setIsGlobal(false);
                    setLocalThread();
                }}
            >
                Local
            </div>
        </div>
    );
}
