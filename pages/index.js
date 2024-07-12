import { Button, Card, Group } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default function Index() {
  const [modalOpened, setModalOpened] = useState(false);
  const pdfUrl = "/Tjekliste-til-onboarding.pdf";

  const downloadPdf = () => {
    const anchorElement = document.createElement("a");
    anchorElement.href = pdfUrl;
    anchorElement.download = "Tjekliste-til-onboarding.pdf";
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
  };

  const openPdfInNewWindow = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#EFF5F9]">
        <img src="/logo.png" className="h-16 w-48" alt="Logo" />

        <div className="pt-10 pr-20 pl-20 pb-20 shadow-xl mt-10 rounded-lg bg-white">
          <div className="flex justify-between mb-5">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Vælg hvad der skal ske
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 mx-auto gap-4">
            {[
              {
                href: "/onboardindex",
                title: "Gå til onboarding",
                description: "Vælg denne, hvis du skal registrere en ny medarbejder",
              },
              {
                href: "/offboardindex",
                title: "Gå til offboarding",
                description: "Vælg denne, hvis en medarbejder stopper",
              },
              {
                href: "/itpage",
                title: "Gå til IT-bestillinger",
                description: "Vælg denne, hvis der skal bestilles IT-udstyr",
              },
            ].map(({ href, title, description }, index) => (
              <Link key={index} href={href}>
                <Card
                radius="lg"
                  className="mx-auto mt-10 bg-[#0F4B70] text-white hover:bg-black transition duration-300 cursor-pointer"
                  style={{ width: '100%', height: '200px' }} // Set fixed height
                >
                  <div className="flex flex-col justify-between ">
                    <h2 className="text-xl font-bold text-center">{title}</h2>
                    <p className="text-center mt-4 lg:mt-16">{description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute top-0 right-0 m-4">
          <Group>
            <Link href="/login">
              <Button size="md" className="bg-black">
                Gå til Login
              </Button>
            </Link>
          </Group>
        </div>
      </div>
    </>
  );
}
