"use client";
import { UserAttributeKey } from "aws-amplify/auth";
import { Bell, LogOut, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userInfo: Partial<Record<UserAttributeKey, string>>;
}

export default function ProfileDetails({ userInfo }: { userInfo: Props["userInfo"] }) {
  return (
    <div className="dropdown dropdown-end">
      {/* Trigger button with profile image */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image
            src={userInfo.picture ?? "/default-avatar.png"}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </label>

      {/* Dropdown content */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-gray-800 text-white rounded-box w-72"
      >
        {/* Profile header */}
        <li className="mb-3">
          <div className="flex items-center gap-3">
            <Image
              src={userInfo.picture ?? "/default-avatar.png"}
              alt="profile"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{userInfo.name ?? "User"}</p>
              <p className="text-xs text-gray-300">{userInfo.email ?? "no-email"}</p>
            </div>
          </div>
        </li>

        <div className="divider my-2"></div>

        {/* Menu items */}
        <div className="flex flex-col space-y-3">
          <Link href="/comments" className="flex items-center gap-2 hover:text-primary">
            <MessageCircle size={20} /> Comments
          </Link>
          <Link href="/notifications" className="flex items-center gap-2 hover:text-primary">
            <Bell size={20} /> Notifications
          </Link>
          <Link href="/signout" className="flex items-center gap-2 hover:text-primary">
            <LogOut size={20} /> Sign Out
          </Link>
        </div>
      </ul>
    </div>
  );
}
