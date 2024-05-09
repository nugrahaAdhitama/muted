"use client";

import { useState } from "react";
import React from "react";
import Avatar from "../components/Avatar/Avatar";
import Maps from "../components/Maps/Maps";
import { relative } from "path";
function Page() {
  const [submit, setSubmit] = useState(false);
  const handleSubmit = () => {
    setSubmit(!submit);
  };

  return (
    <div className="bg-white h-screen">
      {submit && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Report sent successfully.</span>
          </div>
        </div>
      )}
      <div className="flex p-4 bg-yellow-200">
        <Avatar />
        <div className="flex justify-center items-center w-[100%]">
          <span className="text-lg text-black font-bold">Report</span>
        </div>
      </div>
      <div className="w-[100%] min-h-[40%] p-4 rounded-b-lg">
        <div className="max-w-[100%]">
          <Maps style={{ width: "100%", height: "40%", zIndex: 1, position:"absolute" }} />
        </div>
      </div>
      <div className="w-[100%] min-h-[50%] mt-4 bg-slate-300 p-4 flex flex-col justify-center space-y-4 bottom-0 rounded-t-md ">
        <div>
          <select className="select select-bordered w-full">
            <option disabled selected>
              Select Types
            </option>
            <option>Concert</option>
            <option>Traffic</option>
            <option>Events</option>
          </select>
        </div>
        <div className="w-full ">
          <input type="date" className="p-4 rounded-xl w-full" />
        </div>
        <div>
          <textarea
            className="textarea textarea-bordered w-full "
            placeholder="Complaints..."
          ></textarea>
        </div>
        <div>
          <button
            className="btn bg-yellow-200 text-black w-full hover:bg-yellow-100"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
