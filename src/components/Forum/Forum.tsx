import { useState } from "react";
import Thread from "./Thread/Thread";
import ThreadTab from "./ThreadTab/ThreadTab";
import { Post, Threads } from "./types";

const initialPostData: Record<Threads, Post[]> = {
  Global: [
    {
      id: "cd308fd9-03a3-4a29-8ddf-117a3e3b8dfe",
      content: "Hello World!",
      author: "Global User 1",
      timestamp: new Date().getTime().toString(),
      likes: 0,
    },
    {
      id: "78a90c32-704d-49f9-b581-517d406c1cfe",
      content: "Hello React!",
      author: "Global User 2",
      timestamp: new Date(Date.now() - 30 * 1000).getTime().toString(),
      likes: 10,
    },
    {
      id: "34f8992f-68d8-4509-a5cd-ba1f68bc65dd",
      content: "Hello TypeScript!",
      author: "Global User 3",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).getTime().toString(),
      likes: 3,
    },
    {
      id: "73868301-69cb-465b-b346-fbc63243d19a",
      content: "Have a good day!",
      author: "Global User 4",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).getTime().toString(),
      likes: 20,
    },
    {
      id: "45742b75-9d27-470b-b3fd-45dd3215e1c3",
      content: "What a nice forum!",
      author: "Global User 5",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        .getTime()
        .toString(),
      likes: 20,
    },
  ],
  Private: [
    {
      id: "1e6ea29c-265e-45e7-83ac-2c6712f884c1",
      content: "Post freely",
      author: "You",
      timestamp: new Date().getTime().toString(),
      likes: 0,
    },
  ],
};

export default function Forum() {
  const [selectedThread, setSelectedThread] = useState<Threads>(Threads.Global);
  const [postData, setPostData] = useState(initialPostData);

  const handleAddPost = (newPost: Post) => {
    setPostData((prevData) => ({
      ...prevData,
      [selectedThread]: [newPost, ...prevData[selectedThread]],
    }));
  };

  return (
    <>
      <ThreadTab
        threads={Object.values(Threads) as Threads[]}
        selectedThread={selectedThread}
        setSelectedThread={setSelectedThread}
      />
      <Thread
        data={postData[selectedThread]}
        handleAddPost={handleAddPost}
      ></Thread>
    </>
  );
}
