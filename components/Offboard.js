import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export default function OnboardIndex() {
  const form = useForm({
    initialValues: {
      skemaudfyldtaf: "",
      slutdato: "",
      medarbejdernavn: "",
    },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const sendEmail = async (emailData) => {
    try {
      const response = await axios.post("/api/offboardMail", emailData);
      console.log("Email sent:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        // Prepare email data with all form fields
        const emailData = {
          to: "daniel.prior@autohus.dk",
          subject: "Medarbejder skal slettes",
          html: `
            <p>En medarbejder skal slettes:</p>
  
            <p><strong>Skema udfyldt af:</strong> ${form.values.skemaudfyldtaf}</p>
            <p><strong>Medarbejder stopper dato:</strong> ${form.values.slutdato}</p>
            <p><strong>Medarbejder navn:</strong> ${form.values.medarbejdernavn}</p>
  
            <p>Denne mail er automatisk genereret fra onboarding.autohus.dk</p>
          `,
        };

        // Call sendEmail function to notify about employee deletion
        await sendEmail(emailData);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending mail:", error);
        notifications.show({
          title: "Error",
          color: "red",
          message: "Fejl i offboarding.",
        });
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Offboarding</h3>
      </div>
      <form onSubmit={form.onSubmit(() => handleShowConfirmation())}>
        <TextInput
          label="Skema udfyldt af"
          placeholder="f.eks. Daniel Prior."
          className="mb-4"
          {...form.getInputProps("skemaudfyldtaf")}
          size="xs"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Slutdato"
            placeholder="f.eks. 02-20-2024."
            {...form.getInputProps("slutdato")}
            size="xs"
          />
          <TextInput
            label="Medarbejderens navn"
            placeholder="f.eks. Jens Jensen."
            {...form.getInputProps("medarbejdernavn")}
            size="xs"
          />
        </div>
        <div className="mt-8 mb-4">
          <h2 className="text-lg font-bold mb-4">Husk:</h2>
          <ul style={{ listStyleType: "disc", marginLeft: "1.5em" }}>
            <li>Medarbejder skal have autosvar på sin mail</li>
            <li>Aflevere nøgler</li>
            <li>Aflevere telefon</li>
            <li>Aflevere alt pc-udstyr - Retur til IT i Randers</li>
            <li>Besked sendes til: Løn, IT og marketing</li>
          </ul>
        </div>
        <Button className="bg-black mt-10" type="submit">
          Send
        </Button>
      </form>
      <Modal
        opened={showConfirmation}
        onClose={() => handleConfirmation(false)}
        title="Er du sikker på, at du sende medarbejderen til sletning?"
        size="sm"
      >
        <Group position="center" mt="md">
          <Button
            className="bg-black"
            color="green"
            onClick={() => handleConfirmation(true)}
          >
            Ja, send medarbejder ti sletning
          </Button>
          <Button
            className="bg-black"
            color="red"
            onClick={() => handleConfirmation(false)}
          >
            Nej
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
