"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-start xl:flex-row xl:items-center justify-between mt-14 ml-2 md:ml-10">
      <img
        src={session?.user?.image || "/800px-Instagram_logo_2016.webp"}
        alt="User-profile-picture"
        className="w-16 h-16 rounded-full border p-[2px]"
      />
      <div className="flex-1 xl:ml-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram Clone</h3>
      </div>
      {session ? (
        <button
          className="text-blue-500 text-sm font-semibold hover:text-blue-900"
          onClick={signOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="text-blue-500 text-sm font-semibold hover:text-blue-900"
          onClick={signIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
