import { useState, useRef, SyntheticEvent } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import styles from "./PostForm.module.css";
import { Post } from "../../types";

interface PostFormProps {
  handleAddPost: (post: Post) => void;
}

export default function PostForm({ handleAddPost }: PostFormProps) {
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  const submit = (e: SyntheticEvent) => {
    if (textareaValue === "") return;
    e.preventDefault();
    setTextareaValue("");
    handleAddPost({
      id: uuidv4(),
      content: textareaValue,
      author: "You",
      timestamp: Date.now().toString(),
      likes: 10,
    });
    (textareaRef.current as any).focus();
  };

  return (
    <div className={styles.postForm}>
      <img src="/user.png" alt="user-icon" className={styles.img}></img>
      <form onSubmit={submit} className={styles.form}>
        <textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          placeholder="What's happening?"
          required
          className={styles.inputBox}
        />
        <button
          onClick={submit}
          className={clsx(styles.button, {
            [styles.buttonFilled]: textareaValue,
          })}
        >
          POST
        </button>
      </form>
    </div>
  );
}
