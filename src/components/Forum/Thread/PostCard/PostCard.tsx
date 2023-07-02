import React, { useEffect, useState } from "react";
import PostCardInformation from "./PostCardInformation/PostCardInformation";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";
import style from "./PostCard.module.css";
import clsx from "clsx";
import { Predictions } from "../../types";

import sanitizePost from "../../../../services/sanitizePost";

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
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(128, 128, 128, 0.178)"
  );
  const [postInfo, setPostInfo] = useState<Predictions>();
  const [clicked, setClicked] = useState(false);
  const [ref, { width }] = useMeasure();
  const props = useSpring({ width: clicked ? width : 0 });

  useEffect(() => {
    sanitizePost(post.content).then((info) => {
      setPostInfo(info);
    });
  }, []);

  return (
    <>
      <div
        className={clsx(style.postCard, style.main, {
          [style.movingBackground]: clicked,
        })}
        onClick={() => {
          if (!clicked) {
            setTimeout(() => {
              if (postInfo) {
                if (postInfo[6].results[0].match) {
                  setBackgroundColor("rgba(255, 0, 0, 0.178)");
                } else {
                  setBackgroundColor("rgba(0, 255, 0, 0.178)");
                }
              }
            }, 800);
          } else {
            setTimeout(() => {
              setBackgroundColor("rgba(128, 128, 128, 0.178)");
            }, 500);
          }
          setClicked(!clicked);
        }}
        ref={ref}
      >
        <animated.div
          className={style.fill}
          style={{ ...props, backgroundColor: backgroundColor }}
        />
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
      {clicked && postInfo && (
        <PostCardInformation
          info={postInfo as Predictions}
        ></PostCardInformation>
      )}
    </>
  );
}

export default PostCard;
