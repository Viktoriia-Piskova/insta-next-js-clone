import React from "react";
import Posts from "@/components/Posts";
import MiniProfile from "./MiniProfile";

export default function Feed() {
  return (
    <main className="grid grid-col-1 md:grid-cols-3 md:max-w-6xl mx-auto px-5">
      <section className="md:col-span-2">
        <Posts />
      </section>
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed lg:w-[380px]">
        <MiniProfile />
        </div>
      </section>
    </main>
  );
}
