import React from "react";
import { Modal } from "@mantine/core";

export default function EmployeeModal({ opened, onClose, selectedEmployee }) {
  return (
    <Modal
      opened={opened}
      size="xl"
      onClose={onClose}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title="Medarbejder information"
      className="p-6"
    >
      <div className="space-y-4">
        <p>
          <span className="font-bold">Oprettet af:</span>{" "}
          {selectedEmployee && selectedEmployee?.createdby}
        </p>
        <p>
          <span className="font-bold">Oprettet:</span>{" "}
          {selectedEmployee &&
            selectedEmployee?.createdAt &&
            new Date(selectedEmployee?.createdAt).toLocaleDateString("da-DK")}
        </p>
        <p>
          <span className="font-bold">Navn:</span>{" "}
          {selectedEmployee && selectedEmployee?.name}
        </p>
        <p>
          <span className="font-bold">Telefon:</span>{" "}
          {selectedEmployee && selectedEmployee?.phone && selectedEmployee?.phone}
        </p>
        <p>
          <span className="font-bold">Email:</span>{" "}
          {selectedEmployee && selectedEmployee?.email && selectedEmployee?.email}
        </p>
        <p>
          <span className="font-bold">Job titel:</span>{" "}
          {selectedEmployee && selectedEmployee?.jobtitle}
        </p>
        <p>
          <span className="font-bold">Ansættelsesdato:</span>{" "}
          {selectedEmployee && selectedEmployee?.employmentdate}
        </p>
        <p>
          <span className="font-bold">Beskatning af fri telefon:</span>{" "}
          {selectedEmployee && selectedEmployee?.paidphone && selectedEmployee?.paidphone}
        </p>
        <p>
          <span className="font-bold">Note til telefon:</span>{" "}
          {selectedEmployee && selectedEmployee?.phonenote}
        </p>
        <p>
          <span className="font-bold">Visitkort:</span>{" "}
          {selectedEmployee && selectedEmployee?.card && selectedEmployee?.card}
        </p>
        <p>
          <span className="font-bold">Afdeling:</span>{" "}
          {selectedEmployee && selectedEmployee?.department && selectedEmployee?.department.join(", ")}
        </p>
        <p>
          <span className="font-bold">Adgange:</span>{" "}
          {selectedEmployee && selectedEmployee?.accesses && selectedEmployee?.accesses.join(", ")}
        </p>
        <p>
          <span className="font-bold">Andet hardware:</span>{" "}
          {selectedEmployee && selectedEmployee?.other}
        </p>
        <p>
          <span className="font-bold">Status:</span>{" "}
          {selectedEmployee && selectedEmployee?.status && selectedEmployee?.status}
        </p>
        <p>
          <span className="font-bold">Note:</span>{" "}
          {selectedEmployee && selectedEmployee?.note}
        </p>
      </div>
    </Modal>
  );
}
