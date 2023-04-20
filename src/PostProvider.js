import React, { createContext, useContext, useState, useEffect } from "react";
import { useThreads } from "./ThreadProvider";
import { v4 } from "uuid";

const PostContext = createContext();
export const usePosts = () => useContext(PostContext);

export default function PostProvider({ children }) {
    const { thread } = useThreads();
    const [posts, setPosts] = useState(thread);

    useEffect(() => {
        setPosts(thread);
    }, [thread]);
    const addPost = (content) =>
        setPosts([
            {
                id: v4(),
                content: content,
                author: "login user",
                timestamp: new Date().getTime(),
                likes: 0,
            },
            ...posts,
        ]);

    const likePost = (id) =>
        setPosts(
            posts.map((post) =>
                post.id === id ? { ...post, likes: post.likes + 1 } : post
            )
        );

    const removePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    return (
        <PostContext.Provider value={{ posts, addPost, removePost, likePost }}>
            {children}
        </PostContext.Provider>
    );
}
