"use client";

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { app } from "../firebase";

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
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
  return (
    <div>
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
