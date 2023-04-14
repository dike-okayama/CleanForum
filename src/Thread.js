import React from "react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import { usePosts } from "./PostProvider";

export default function Thread() {
    const { posts } = usePosts();
    return (
        <div>
            <PostForm />
            {posts.map((post) => (
                <PostCard key={post.id} {...post} />
            ))}
            {posts.length ? (
                ""
            ) : (
                <div
                    style={{
                        marginLeft: "10%",
                        marginRight: "10%",
                    }}
                >
                    <h2>Welcome to dakken forum!</h2>
                    <p
                        style={{
                            color: "darkgrey",
                        }}
                    >
                        AI recognizes the emotion in your posting. Try posting
                        what happened today.
                    </p>
                </div>
            )}
        </div>
    );
}
