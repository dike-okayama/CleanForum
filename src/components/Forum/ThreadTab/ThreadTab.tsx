import { Threads } from "../types";
import clsx from "clsx";
import style from "./ThreadTab.module.css";

interface ThreadTabProps {
  threads: Threads[];
  selectedThread: Threads;
  setSelectedThread: (thread: Threads) => void;
}

export default function ThreadTab({
  threads,
  selectedThread,
  setSelectedThread,
}: ThreadTabProps) {
  return (
    <div className={style.threadTabContainer}>
      {threads.map((thread) => (
        <div
          key={thread}
          className={clsx(style.threadTab, {
            [style.isActive]: selectedThread === thread,
          })}
          onClick={() => {
            setSelectedThread(thread);
          }}
        >
          {thread}
        </div>
      ))}
    </div>
  );
}
