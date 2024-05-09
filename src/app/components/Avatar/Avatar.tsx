import Image from "next/image";

export default function Avatar() {
  return (
    <div>
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-12">
          <span className="text-3xl">A</span>
        </div>
      </div>
    </div>
  );
}
