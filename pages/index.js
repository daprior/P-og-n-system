import { Button, Modal, Group } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import Onboard from "components/Onboard";

export default function Index() {
  const [modalOpened, setModalOpened] = useState(false);
  const pdfUrl = "/Tjekliste-til-onboarding.pdf"; // Replace with the actual filename

  const downloadPdf = () => {
    // Create a temporary anchor element
    const anchorElement = document.createElement("a");
    anchorElement.href = pdfUrl;
    anchorElement.download = "Tjekliste-til-onboarding.pdf"; // Specify the filename for download
    document.body.appendChild(anchorElement);

    // Trigger a click event to start the download
    anchorElement.click();

    // Cleanup: remove the temporary anchor element
    document.body.removeChild(anchorElement);
  };

  const openPdfInNewWindow = () => {
    // Open the PDF URL in a new window/tab
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#EFF5F9]">
        <img src="/logo.png" className="h-16 w-48"></img>

        <div className="pt-10 pr-20 pl-20 pb-20 shadow-xl mt-10 rounded-lg bg-white">
          <div className="flex justify-between mb-5">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Vælg hvad der skal ske
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 mx-auto gap-4">
            <Link href="/onboardindex">
              <div className="mx-auto border rounded-xl shadow-xl p-16 mt-10 bg-[#0F4B70] text-white hover:text-white hover:bg-[#000000] hover:cursor-pointer">
                <h2 className="text-xl font-bold mx-auto text-center">
                  Gå til onboarding
                </h2>
                <p className="mx-auto text-center mt-4">
                  Vælg denne, hvis du skal registrere en ny medarbejder
                </p>
              </div>
            </Link>
            <Link href="/offboardindex">
              <div className="mx-auto border rounded-xl shadow-xl p-16 mt-10 bg-[#0F4B70] text-white hover:text-white hover:bg-[#000000] hover:cursor-pointer">
                <h2 className="text-xl font-bold mx-auto text-center">
                  Gå til offboarding
                </h2>
                <p className="mx-auto text-center mt-4">
                  Vælg denne, hvis en medarbejder stopper
                </p>
              </div>
            </Link>
            <Link href="/itpage">
              <div className="mx-auto border rounded-xl shadow-xl p-16 mt-10 bg-[#0F4B70] text-white hover:text-white hover:bg-[#000000] hover:cursor-pointer">
                <h2 className="text-xl font-bold mx-auto text-center">
                  Gå til IT-bestillinger
                </h2>
                <p className="mx-auto text-center mt-4">
                  Vælg denne, hvis der skal bestilles IT-udstyr
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Buttons in the right corner */}
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
