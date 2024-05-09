import React from 'react'
import Maps from "../components/Maps/Maps";
import Navbar from "@/app/components/Navbar/Navbar";
import Search from "../components/Search/Search";
import Avatar from "../components/Avatar/Avatar";
import { BiTargetLock } from "react-icons/bi";
function page() {
  return (
    <div>
      <Maps style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />

      <div className="flex m-4 justify-between">
          <Avatar />
          <Search />
        </div>
        <div className="avatar placeholder flex justify-end bottom-0 mx-4 items-end">
          <div className="bg-neutral text-neutral-content rounded-full w-12">
            <span className="text-3xl">
              <BiTargetLock />
            </span>
          </div>
        </div>
        <Navbar />
    </div>
  );
}

export default page