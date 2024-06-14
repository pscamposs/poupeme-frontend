"use client";
import Link from "next/link";

import { formatDate } from "@/services/dateService";

export default function UrlContainer({
  shortData,
}: {
  shortData: ShortDataProps;
}) {
  return (
    <div className=" p-8 w-full">
      <div>
        <div>
          <h2 className="text-2xl font-medium cursor-default outline-none">
            {shortData.title}
          </h2>
          <Link
            href={`${window.location.origin}/${shortData.shortUrl}`}
            className="text-indigo-500  font-bold"
          >
            <p>
              {window.location.origin}/{shortData.shortUrl}
            </p>
          </Link>
          <Link
            href="https://google.com/teste"
            className="text-sm text-gray-500 "
            target="_blank"
          >
            <p>{shortData.originalUrl}</p>
          </Link>
        </div>
        <div className="flex gap-4 [&_*]:cursor-default p-2 shadow-sm">
          <p className="text-blue-600 font-medium">
            {shortData.hints} clique(s)
          </p>
          <p className="text-gray-500">{formatDate(shortData.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
