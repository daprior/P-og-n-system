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
          {selectedEmployee && selectedEmployee.createdby}
        </p>
        <p>
          <span className="font-bold">Oprettet:</span>{" "}
          {selectedEmployee &&
            selectedEmployee.createdAt &&
            new Date(selectedEmployee.createdAt).toLocaleDateString("da-DK")}
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
          <span className="font-bold">Job titel:</span>{" "}
          {selectedEmployee && selectedEmployee.jobtitle}
        </p>

        <p>
          <span className="font-bold">Afdeling:</span>{" "}
          {selectedEmployee && selectedEmployee.department}
        </p>
        <p>
          <span className="font-bold">Position:</span>{" "}
          {selectedEmployee && selectedEmployee.position}
        </p>
        <p>
          <span className="font-bold">Adgange:</span>{" "}
          {selectedEmployee && selectedEmployee.accesses}
        </p>
        <p>
          <span className="font-bold">Diverse:</span>{" "}
          {selectedEmployee && selectedEmployee.misc}
        </p>

        <p>
          <span className="font-bold">Note:</span>{" "}
          {selectedEmployee && selectedEmployee.note}
        </p>
        <p>
          <span className="font-bold">Aftalt telefon model:</span>{" "}
          {selectedEmployee && selectedEmployee.phonemodel}
        </p>
      </div>
    </Modal>
  );
}
