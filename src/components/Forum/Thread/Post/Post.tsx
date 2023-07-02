import React from "react";
import style from "./Post.module.css";

interface PostCardProps {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
}

const calcInterval = (timestamp: string | number) =>
  new Date().getTime() - Number(timestamp);

const formatInterval = (interval: number): string => {
  if (interval < 1000) {
    return "Now";
  } else if (interval < 60000) {
    return Math.floor(interval / 1000) + "s";
  } else if (interval < 3600000) {
    return Math.floor(interval / 60000) + "m";
  } else if (interval < 86400000) {
    return Math.floor(interval / 3600000) + "h";
  } else {
    return Math.floor(interval / 86400000) + "d";
  }
};

const displayTimestamp = (timestamp: string | number): string => {
  return formatInterval(calcInterval(timestamp));
};

function PostCard(post: PostCardProps) {
  return (
    <div className={style.postCard}>
      <img src="/user.png" alt="user-icon" className={style.userIcon}></img>
      <div>
        <span className={style.author}>{post.author}</span>
        <span className={style.timestamp}>
          ・{displayTimestamp(post.timestamp)}
        </span>
        <div className={style.contentContainer}>
          <div className={style.content}>
            {post.content.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
