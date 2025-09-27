// RightNavSection.tsx
"use client";

import { fetchUserAttributes, UserAttributeKey } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import GoogleSigninButton from "./GoogleSigninButton";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function RightNavSection() {
  const [userInfo, setUserInfo] = useState<Partial<Record<UserAttributeKey, string>> | null>(null);
  const { authStatus } = useAuthenticator(context => [context.authStatus])

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await fetchUserAttributes();
      setUserInfo(userInfo);
    }
    if(authStatus == 'authenticated') fetchUser();
  }, [authStatus])

  return userInfo ? <ProfileDetails userInfo={userInfo} /> : <GoogleSigninButton />;
}
