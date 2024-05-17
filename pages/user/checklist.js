import React from "react";
import Main from "components/layouts/Main";
import { TextInput, Button } from "@mantine/core";

export default function DashboardIndex() {
  const downloadPdf = () => {
    // Construct the URL of the PDF file
    const pdfUrl = "/Tjekliste-til-onboarding.pdf"; // Replace with the actual filename

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

  return (
    <Main className="">
      <div className="font-bold mb-4">
        <h3>Tjekliste</h3>
      </div>
      <div className=" ">
        <Button onClick={downloadPdf} className="bg-black mb-10">
          Download PDF
        </Button>
        <iframe
          title="PDF Viewer"
          style={{ width: "100%", height: "800px" }} // Adjust dimensions as needed
          src="/Tjekliste-til-onboarding.pdf"
        />
      </div>
    </Main>
  );
}
