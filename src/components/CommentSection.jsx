"use client";

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import Moment from "react-moment";

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const db = getFirestore(app);

  async function handleSubmit(e) {
    const regex = /<[^>]*>/g;
    const commentForDb = comment.replace(regex, "");
    setComment("");

    e.preventDefault();
    await addDoc(collection(db, "post", id, "comments"), {
      comment: commentForDb,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  }

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "post", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div className="">
      {comments.length > 0 && (
        <div className="mx-10 overflow-y-scroll max-h-24">
          {comments.map((comment, id) => (
            <div
              key={id}
              className="flex items-center space-x-2 mb-2 justify-between"
            >
              <img
                src={comment.data().userImage}
                alt="user image"
                className="h-7 rounded-full object-cover border p-[2px]"
              />
              <p className="text-sm flex-1 truncate">
                <span className="font-bold text-gray-700">
                  {comment.data().username}
                </span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="text-xs text-gray-400 pr-2">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form
          className="flex items-center p-4 gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <img
            className="h-10 w-10 rounded-full border p-[4px] object-cover"
            src={session.user.image}
            alt="User Image"
          />
          <input
            type="text"
            className="border-none outline-none flex-1 focus:ring-0"
            value={comment}
            placeholder="Add a comment..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            disabled={!comment.trim()}
            type="submit"
            className="font-bold text-blue-400 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-gray-500 transition-colors duration-300"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
