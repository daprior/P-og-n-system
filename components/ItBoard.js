import {
  Button,
  Checkbox,
  Group,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form"; // Make sure this path is correct based on your installation
import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export default function ItIndex() {
  const form = useForm({
    initialValues: {
      medarbejderensnavn: "",
      udfyldtaf: "",
      hardware: [], // Array to store selected hardware items
      andet: "",
    },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const sendEmail = async (emailData) => {
    try {
      const response = await axios.post("/api/itmail", emailData);
      console.log("Email sent:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        // Prepare email data with all form fields including selected hardware
        const emailData = {
          to: "daniel.prior@autohus.dk, laura.drustrup@autohus.dk, Jan.Langkjaer@autohus.dk",
          subject: "Bestilling af IT-udstyr",
          text: `
            It bestilling:

            Medarbejderens navn: ${form?.values?.medarbejderensnavn}

            Skema udfyldt af: ${form?.values?.udfyldtaf}

            Udstyr: ${form?.values?.hardware}

            Andet: ${form?.values?.andet}
            

            Denne mail er automatisk genereret fra onboarding.autohus.dk
          `,
          hardware: form?.values?.hardware.join(", "), // Convert array to comma-separated string
        };

        // Call sendEmail function to notify about employee deletion
        await sendEmail(emailData);

        // Show success notification
        notifications.show({
          title: "Success",
          color: "green",
          message: "Mail sendt til IT.",
        });

        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending mail:", error);
        notifications.show({
          title: "Error",
          color: "red",
          message: "Fejl i bestilling.",
        });
      }
    }
    setShowConfirmation(false);
  };

  const hardwareItems = [
    "Skærm",
    "Computer",
    "Tastatur",
    "Mus",
    "Dockingstation",
    "Headset",
    "Webcam",
    "Printer",
    "Scanner",
    "Ekstern harddisk",
    "Netværkskabel",
    "HDMI-kabel",
    "Strømforsyning",
    "Dockingstation til bærbar",
    "Projektor",
    "Musemåtte",
    "Docking til mobiltelefon",
    "USB-hub",
    "USB-C-hub",
    "Telefon lader",
  ];


  const columns = 4;
  const itemsPerColumn = Math.ceil(hardwareItems.length / columns);

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Bestilling af IT-udstyr</h3>
      </div>
      <form onSubmit={form.onSubmit(() => handleShowConfirmation())}>
        <div className="mt-4 mb-4">
          <TextInput
            label="Skema udfyldt af"
            placeholder="f.eks. Daniel Prior."
            className="mb-4"
            {...form.getInputProps("udfyldtaf")}
            size="xs"
          />

          <TextInput
            label="Medarbejderens navn"
            placeholder="f.eks. Jens Jensen."
            {...form.getInputProps("medarbejderensnavn")}
            className="mb-8"
            size="xs"
          />
          <Group
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {hardwareItems.map((item, index) => (
              <Checkbox
                key={index}
                label={item}
                checked={form.values.hardware.includes(item)}
                onChange={(event) => {
                  const isChecked = event.currentTarget.checked;
                  let updatedHardware;

                  if (isChecked) {
                    updatedHardware = [...form.values.hardware, item];
                  } else {
                    updatedHardware = form.values.hardware.filter(
                      (h) => h !== item
                    );
                  }

                  form.setFieldValue("hardware", updatedHardware);
                }}
                style={{ marginBottom: "8px" }} // Adjust as needed for spacing between checkboxes
              />
            ))}
          </Group>
          <Textarea
            label="Andet"
            placeholder="Andet..."
            {...form.getInputProps("andet")}
            className="mb-8 mt-4"
            size="xs"
          />
        </div>
        <Button className="bg-black mt-10" type="submit">
          Send
        </Button>
      </form>
      <Modal
        opened={showConfirmation}
        onClose={() => handleConfirmation(false)}
        title="Er du sikker på, at du vil sende denne bestilling til IT?"
        size="sm"
      >
        <Group position="center" mt="md">
          <Button
            className="bg-black"
            color="green"
            onClick={() => handleConfirmation(true)}
          >
            Ja, send bestilling
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
