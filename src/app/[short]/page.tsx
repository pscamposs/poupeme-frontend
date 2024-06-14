"use client";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export default function ShortRedirect() {
  const params = useParams();

  const router = useRouter();

  const fetchOriginalUrl = async (shortUrl: string) => {
    try {
      const resposne = await fetch(`${process.env.API_URL}/?url=${shortUrl}`);
      const data = await resposne.json();

      if (data.originalUrl) {
        window.location.assign(data.originalUrl);
      }
    } catch (e) {
      router.back();
    }
  };

  useLayoutEffect(() => {
    fetchOriginalUrl(params.short as string);
  }, [params.short]);

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="px-4">
        <Loader />
      </div>
      <p>Redirecionando...</p>
    </div>
  );
}
