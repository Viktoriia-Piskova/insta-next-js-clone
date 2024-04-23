"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { app } from "../firebase";
import {
  getFirestore,
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export default function LikeSection({ id }) {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState([]);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    console.log("likes changed");
    if (
      likes.findIndex((like) => {
        like.id === session?.user?.uid;
      }) != -1
    ) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes]);

  async function likePost() {
    console.log("likePost");

    if (hasLiked) {
      console.log("if(hasLiked)");

      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      console.log("else");

      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  }
  return (
    <div>
      {session && (
        <div className="flex border-t border-gray-100 px-4 pt-4">
          <div className="flex items-center">
            {hasLiked ? (
              <HiHeart
                className="text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out"
                onClick={likePost}
              />
            ) : (
              <HiOutlineHeart className="cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out" 
              onClick={likePost}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
