import React, { useState } from "react";

export default function LikeButton() {
    const [clickCount, setClickCount] = useState(0);
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <svg
                viewBox="0 0 24 24"
                width="1.2rem"
                height="1.2rem"
                className="like-button"
                onClick={() => setClickCount(clickCount + 1)}
            >
                <path
                    fill={clickCount > 0 ? "#ff0000" : "gray"}
                    d="M12 21.35l-1.45-1.32C4.53 14.37 2 11.29 2 7.77 2 4.42 4.42 2 7.77 2c2.15 0 4.17 1.23 5.23 3.18C13.23 3.23 15.25 2 17.4 2 20.75 2 23 4.42 23 7.77c0 3.52-2.53 6.6-8.55 12.26L12 21.35z"
                />
            </svg>
            <span
                style={{
                    marginLeft: ".3rem",
                }}
            >
                {clickCount}
            </span>
        </div>
    );
}
