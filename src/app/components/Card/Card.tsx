import React from "react";
import Link from "next/link"

function Card() {
  return (
    <div className="flex justify-center">
      <div className="card w-[80%] bg-base-100 shadow-xl">
        <div className="card-body flex flex-col gap-4">
          <h2 className="card-title">Gelora Bung Karno</h2>
          <p>Jakarta, Indonesia</p>
          <div className="badge badge-primary">Avg: 80 dB</div>
          <div className="flex flex-col gap-2">
            <label>Report</label>
            <textarea
              className="textarea border-2 border-primary"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="card-actions justify-end">
            <Link href={'/report'}><button className="btn btn-primary w-full">Report a Noise</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
