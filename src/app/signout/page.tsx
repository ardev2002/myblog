"use client";
import { signOut } from 'aws-amplify/auth';

export default function page() {
    (async () => {
        await signOut()
    })()
    return null;
}
