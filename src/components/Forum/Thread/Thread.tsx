import PostCard from "./PostCard/PostCard";
import PostForm from "./PostForm/PostForm";
import { Post } from "../types";

interface ThreadProps {
  data: Post[];
  handleAddPost: (post: Post) => void;
}

export default function Thread({ data, handleAddPost }: ThreadProps) {
  return (
    <div>
      <PostForm handleAddPost={handleAddPost}></PostForm>
      {data.map((post) => (
        <PostCard
          author={post.author}
          content={post.content}
          id={post.id}
          likes={post.likes}
          timestamp={post.timestamp}
          key={post.id}
        ></PostCard>
      ))}
    </div>
  );
}
