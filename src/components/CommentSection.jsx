"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function CommentSection() {
  const { data: session } = useSession();
  return <div>
    {session && (
        <form>
            <img className="h-10 w-10 rounded-full border p-[4px] object-cover" src={session.user.image} alt="User Image" />
            <input type="text" />
        </form>
    )}
  </div>;
}
