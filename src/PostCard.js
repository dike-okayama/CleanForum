import React from "react";

const diff = (past) => new Date().getTime() - past;
const calc = (diff) => {
    if (diff < 1000) {
        return "Now";
    } else if (diff < 60000) {
        return Math.floor(diff / 1000) + "s";
    } else if (diff < 3600000) {
        return Math.floor(diff / 60000) + "m";
    } else if (diff < 86400000) {
        return Math.floor(diff / 3600000) + "h";
    } else {
        return Math.floor(diff / 86400000) + "d";
    }
};

export default function PostCard(post) {
    return (
        <div
            style={{
                padding: "10px 1rem 10px 1rem",
                borderBottom: "1px solid rgb(227, 227, 227)",
                fontSize: "1rem",
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
            ></img>
            <div>
                <nobr
                    style={{
                        marginLeft: "1rem",
                        fontSize: "small",
                        fontWeight: "bold",
                    }}
                >
                    {post.author}
                </nobr>
                <span
                    style={{
                        fontWeight: "normal",
                        fontSize: "small",
                    }}
                >
                    ・{calc(diff(post.timestamp))}
                </span>
                <div
                    style={{
                        marginLeft: "1rem",
                        fontSize: "small",
                    }}
                >
                    {post.content.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
