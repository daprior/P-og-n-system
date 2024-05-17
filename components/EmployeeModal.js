import React from "react";
import { Modal } from "@mantine/core";

export default function EmployeeModal({ opened, onClose, selectedEmployee }) {
  // Funktion til at formatere arrays med mellemrum
  const formatArray = (arr) => {
    if (!arr || !Array.isArray(arr)) return ""; // Håndterer tilfælde, hvor arr ikke er defineret eller ikke er et array
    return arr.join(", "); // Konverterer array til en streng med elementer adskilt af ", "
  };

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
          <span className="font-bold">ID:</span>{" "}
          {selectedEmployee && selectedEmployee._id}
        </p>
        <p>
          <span className="font-bold">Name:</span>{" "}
          {selectedEmployee && selectedEmployee.name}
        </p>
        <p>
          <span className="font-bold">Telefon:</span>{" "}
          {selectedEmployee && selectedEmployee.phone}
        </p>
        <p>
          <span className="font-bold">Email:</span>{" "}
          {selectedEmployee && selectedEmployee.email}
        </p>
        <p>
          <span className="font-bold">Brugernavn:</span>{" "}
          {selectedEmployee && selectedEmployee.username}
        </p>
        <p>
          <span className="font-bold">Efternavn:</span>{" "}
          {selectedEmployee && selectedEmployee.lastName}
        </p>
        <p>
          <span className="font-bold">Nyt telefonnummer:</span>{" "}
          {selectedEmployee && selectedEmployee.newPhoneNumber}
        </p>
        <p>
          <span className="font-bold">Job titel:</span>{" "}
          {selectedEmployee && selectedEmployee.jobTitle}
        </p>
        <p>
          <span className="font-bold">Note:</span>{" "}
          {selectedEmployee && selectedEmployee.message}
        </p>
        <p>
          <span className="font-bold">Afdelinger:</span>{" "}
          {formatArray(selectedEmployee && selectedEmployee.department)}
        </p>
        <p>
          <span className="font-bold">Stilling:</span>{" "}
          {formatArray(selectedEmployee && selectedEmployee.position)}
        </p>
        <p>
          <span className="font-bold">Overordnet:</span>{" "}
          {formatArray(selectedEmployee && selectedEmployee.checkboxes1)}
        </p>
        <p>
          <span className="font-bold">IT:</span>{" "}
          {formatArray(selectedEmployee && selectedEmployee.checkboxes2)}
        </p>
        <p>
          <span className="font-bold">Oprettet:</span>{" "}
          {selectedEmployee &&
            selectedEmployee.createdAt &&
            new Date(selectedEmployee.createdAt).toLocaleDateString("da-DK")}
        </p>
      </div>
    </Modal>
  );
}
