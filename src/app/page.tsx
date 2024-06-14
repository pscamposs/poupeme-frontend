"use client";
import Image from "next/image";
import poupemeLogo from "../../public/res/images/poupeme.png";
import { SyntheticEvent, useState } from "react";
import Loader from "@/components/Loader";
import { LoadingButton } from "@/components/LoadingButton";
import Link from "next/link";
import { DefaultButton } from "@/components/DefaultButton";

const createShortUrl = async (url: string) => {
  const response = await fetch(`${process.env.API_URL}/short`, {
    method: "POST",
    body: url,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.shortUrl;
};

interface ShortenUrlResponse {
  error?: string;
  shortUrl?: string;
}

export default function Home() {
  const [shortUrl, setShortUrl] = useState<string | undefined>("");
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!originalUrl) return;

    setLoading(true);
    setError(false);

    try {
      const response: ShortenUrlResponse = await createShortUrl(originalUrl);
      if (!response) {
        setError(true);
        return;
      }

      setShortUrl(`${window.location.origin}/${response}`);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClipboard = (e) => {
    navigator.clipboard.writeText(shortUrl as string);
  };
  return (
    <main className=" px-4 flex items-center justify-center h-screen max-lg:flex-wrap max-lg:content-center">
      {!shortUrl && (
        <>
          <section id="encurtar">
            <Image
              src={poupemeLogo}
              alt="Poupe.me Logo"
              width={384}
              className="mx-auto"
            />
            <div className="shadow-md max-w-[680px] mx-auto py-12 px-8">
              <h3 className="text-2xl font-bold ">
                Cole seu link para ser encurtado
              </h3>
              <p className="py-2 text-indigo-800">
                Encurte links do Youtube, Tiktok, X (Twitter) ou qualquer outro
                de sua escolha.
              </p>
              <form className="flex w-full" onSubmit={handleSubmit}>
                <input
                  type="url"
                  placeholder="https://"
                  className="w-full flex-1 border-2 px-2 outline-none hover:border-indigo-200 focus:border-indigo-400"
                  required
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
                <LoadingButton type="submit" loading={loading}>
                  Encurtar
                </LoadingButton>
              </form>
              {error && (
                <p className="py-3 text-red-500 font-bold">
                  Ocorreu um erro ao gerar o seu link, tente novamente.
                </p>
              )}
            </div>
          </section>

          <section>
            <div className="shadow-sm max-w-[680px] mx-auto py-12 px-8">
              <h2 className="text-xl font-bold">
                Encurte, monitore e compartilhe!
              </h2>
              <p className="text-sm text-gray-600">
                Agora você pode utilizar os links abreviados em uma variedade de
                plataformas, como redes sociais, blogs, fóruns, e-mails e
                mensagens instantâneas. Obtenha insights sobre o desempenho de
                seus negócios e projetos ao monitorar o número de acessos em
                seus links com o contador de cliques.
              </p>
            </div>
          </section>
        </>
      )}

      {shortUrl && (
        <section id="encurtar">
          <Image
            src={poupemeLogo}
            alt="Poupe.me Logo"
            width={384}
            className="mx-auto"
          />
          <div className="shadow-md max-w-[680px] mx-auto py-12 px-8">
            <h3 className="text-2xl font-bold ">
              Copie seu link para compartilha-lo
            </h3>
            <p className="py-2 text-indigo-800">
              Seu link tem duração de <span className="font-bold">7 dias</span>{" "}
              a partir de hoje,{" "}
              <Link href="/register" className="font-bold">
                crie uma conta
              </Link>{" "}
              para criar um link ilimitado!
            </p>
            <div className="flex w-full">
              <input
                type="url"
                placeholder="https://"
                className="w-full flex-1 border-2 px-2 outline-none hover:border-indigo-200 focus:border-indigo-400"
                disabled
                value={shortUrl}
              />
              <DefaultButton onClick={handleCopyClipboard}>
                Copiar
              </DefaultButton>
            </div>
            <button
              className="py-4 text-indigo-600"
              onClick={() => setShortUrl("")}
            >
              Criar novo link
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
