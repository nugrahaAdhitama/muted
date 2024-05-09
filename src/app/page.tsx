"use client";
import { useState } from "react";
import Maps from "./components/Maps/Maps";
import Navbar from "@/app/components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Avatar from "./components/Avatar/Avatar";
import { BiTargetLock } from "react-icons/bi";
import Card from "./components/Card/Card";
export default function Home() {
  const [targetClicked, setTargetClicked] = useState(false);

  return (
    <div>
      <Maps
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      <div className="flex m-4 justify-between">
        <Avatar />
        <Search />
      </div>
      <div className="avatar placeholder flex justify-end bottom-0 mx-4 items-end">
        <div className="bg-neutral text-neutral-content rounded-full w-12">
          <button
            className="text-3xl"
            onClick={() => setTargetClicked(!targetClicked)}
          >
            <BiTargetLock />
          </button>
        </div>
      </div>
      <Navbar />

      {targetClicked && (
        <div className="">
          <Card />
        </div>
      )}
    </div>
  );
}
