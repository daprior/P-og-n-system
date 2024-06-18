import React from "react";
import Main from "components/layouts/Main";
import { Button } from "@mantine/core";
import withAuthProtection from '../../components/withAuthProtection';

function ChecklistIndex() {
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
    <Main className="">
      <div>
        <div className="font-bold mb-4">
          <h3>Tjekliste</h3>
        </div>
        <div className="mb-5">
          <Button onClick={downloadPdf} className="bg-black mb-2">
            Download PDF
          </Button>
          <Button onClick={openPdfInNewWindow} className="bg-black mb-2 ml-2">
            Åben PDF i nyt vindue
          </Button>
        </div>
        <iframe
          title="PDF Viewer"
          style={{ width: "100%", height: "800px" }} // Adjust dimensions as needed
          src={pdfUrl}
        />
      </div>
    </Main>
  );
}


export default withAuthProtection(ChecklistIndex);