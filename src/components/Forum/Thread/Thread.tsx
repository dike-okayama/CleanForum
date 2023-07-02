import Post from "./Post/Post";
import PostForm from "./PostForm/PostForm";
import { Post as PostType } from "../types";

interface ThreadProps {
  data: PostType[];
  handleAddPost: (post: PostType) => void;
}

export default function Thread({ data, handleAddPost }: ThreadProps) {
  return (
    <div>
      <PostForm handleAddPost={handleAddPost}></PostForm>
      {data.map((post) => (
        <Post
          author={post.author}
          content={post.content}
          id={post.id}
          likes={post.likes}
          timestamp={post.timestamp}
          key={post.id}
        ></Post>
      ))}
    </div>
  );
}
