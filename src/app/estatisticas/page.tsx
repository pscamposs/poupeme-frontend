"use client";
import { LoadingButton } from "@/components/LoadingButton";
import UrlContainer from "@/components/UrlsContainer";
import { useQuery } from "@tanstack/react-query";
import { SyntheticEvent, useState } from "react";

const fetchShortData = async (shortUrl: string) => {
  if (!shortUrl) return;

  const parts = shortUrl.split("/");
  const id = parts[parts.length - 1];

  const response = await fetch(`${process.env.API_URL}/hints`, {
    method: "POST",
    body: id,
  });
  const json = await response.json();
  return json;
};

export default function StatisticsPage() {
  const [shortUrl, setShortUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [shortData, setShortData] = useState<ShortDataProps>();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortData(undefined);

    try {
      const response = await fetchShortData(shortUrl);
      if (response?.error) {
        setError(response?.message);
        return;
      }
      setShortData(response);
    } catch (e) {
      setError(e as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-[90vh] py-12">
      <section className="mx-auto w-full max-w-[668px] shadow-lg p-4">
        <h2 className="text-3xl font-bold">Estatisticas</h2>

        <div>
          <p>Cole o link encurtado para obter as informações sobre ele.</p>
          <form className="flex w-full py-4" onSubmit={handleSubmit}>
            <input
              placeholder="https:// ou ID"
              className="w-full flex-1 border-2 px-2 outline-none hover:border-indigo-200 focus:border-indigo-400"
              required
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
            />
            <LoadingButton loading={loading}>Enviar</LoadingButton>
          </form>
          {error && <p className="py-3 text-red-500 font-bold">{error}</p>}
        </div>
        {shortData && <UrlContainer shortData={shortData} />}
      </section>
    </main>
  );
}
