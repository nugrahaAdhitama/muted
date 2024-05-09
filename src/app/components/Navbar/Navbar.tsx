import { IoLocation } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import Link from "next/link";
export default function Navbar() {
  return (
    <div>
      <div className="btm-nav">
        <button className="active:active">
          <Link href={"/"}>
            <IoLocation size={24} />
          </Link>
          <span className="btm-nav-label">Explore</span>
        </button>
        <button className="active:active">
          <Link href={"/statistics"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="gray"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </Link>
          <span className="btm-nav-label">Statistics</span>
        </button>
        <button className="active:active">
          <Link href={"/notifications"}>
            <IoMdNotifications size={24} />
          </Link>
          <span className="btm-nav-label">Notification</span>
        </button>
      </div>
    </div>
  );
}
