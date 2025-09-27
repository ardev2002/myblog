"use client";
import { UserAttributeKey } from "aws-amplify/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  userInfo: Partial<Record<UserAttributeKey, string>>;
}

export default function ProfileDetails({ userInfo }: { userInfo: Props["userInfo"] }) {
  return (
    <>
      {/* Avatar + dropdown (works for both desktop & mobile) */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={userInfo.picture!}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </label>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-base-100 rounded-box w-64"
        >
          <li className="mb-2">
            <div className="flex flex-col">
              <p className="font-semibold">{userInfo.name ?? "User"}</p>
              <p className="text-xs text-gray-500">{userInfo.email ?? "no-email"}</p>
            </div>
          </li>

          <div className="divider my-1"></div>

          <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          <li><Link href="/settings" className="hover:text-primary">Settings</Link></li>
          <li><Link href="/signout" className="hover:text-primary">Sign Out</Link></li>
        </ul>
      </div>
    </>
  );
}
