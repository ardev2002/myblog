"use client";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function ImageRenderer({ path, alt }: { path: string; alt: string }) {
  return (
    <div className="w-full relative mb-2 aspect-[16/9] overflow-hidden rounded-lg">
      <StorageImage
        path={path}
        alt={alt}
        className="inset-0 w-full! h-full! object-cover"
      />
    </div>
  );
}