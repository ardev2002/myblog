"use client";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function ImageRenderer({ path, alt }: { path: string; alt: string }) {
  return (
    <div className="w-full aspect-[16/9] relative overflow-hidden">
      <StorageImage
        path={path}
        alt={alt}
        className="w-full! h-full! object-cover!"
      />
    </div>
  );
}