import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ImageSlider from "@/components/ImageSlider";

export const metadata: Metadata = {
  title: "zero27rh",
  description: "Zero27RH - Construindo Pontes entre Talentos e Empresas. Conheça nossos serviços, clientes e oportunidades de carreira.",
  keywords: "recrutamento, seleção, RH, talentos, empresas, emprego, vagas, carreira, entrevista, currículo, candidatos, contratação, recursos humanos, gestão de talentos, headhunter, busca de talentos, empregabilidade, processo seletivo, testes comportamentais, competências, habilidades",
  icons: {
    icon: [
      { url: "/res/27x16.png", sizes: "16x16", type: "image/png" },
      { url: "/res/27x32.png", sizes: "32x32", type: "image/png" },
      { url: "/res/27x64.png", sizes: "64x64", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          <ImageSlider />
          {children}
          <Footer />
          <CookieConsent />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zero27RH",
              "url": "https://www.zero27rh.com.br/",
              "logo": "https://www.zero27rh.com.br/res/icone-zero.png",
              "description": "Construindo Pontes entre Talentos e Empresas",
              "sameAs": ["https://", "https://", "https://"],
            }),
          }}
        />
      </body>
    </html>
  );
}
