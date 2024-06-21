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
              Opret medarbejder
            </h2>
            <Button
              size="md"
              className="bg-blue-500"
              onClick={() => setModalOpened(true)}
            >
              Tjekliste til onboarding
            </Button>
          </div>

          <Onboard />
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

        {/* Empty Mantine Modal */}
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Tjekliste"
          size="70%"
        >
          <div>
            {/* <div className="font-bold mb-4">
              <h3>Tjekliste</h3>
            </div> */}
            <div className="mb-5">
              <Button onClick={downloadPdf} className="bg-black mb-2">
                Download PDF
              </Button>
              <Button
                onClick={openPdfInNewWindow}
                className="bg-black mb-2 ml-2"
              >
                Åben PDF i nyt vindue
              </Button>
            </div>
            <iframe
              title="PDF Viewer"
              style={{ width: "100%", height: "800px" }} // Adjust dimensions as needed
              src={pdfUrl}
            />
          </div>
        </Modal>
      </div>
    </>
  );
}
