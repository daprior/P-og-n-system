import {
  Button,
  Checkbox,
  Group,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState, useEffect } from "react";
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
  const [itMails, setItMails] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const fetchItMails = async () => {
      try {
        const response = await axios.get("/api/settings");
        const settings = response.data.data || {};
        const itmails = JSON.parse(settings.itmails || "[]");
        setItMails(itmails);
      } catch (error) {
        console.error("Error fetching IT mails:", error);
        notifications.show({
          title: "Error",
          color: "red",
          message: "Failed to fetch IT mails.",
        });
      }
    };

    fetchItMails();
  }, []);

  // Enable submit button only when both required fields are filled
  useEffect(() => {
    if (form.values.medarbejderensnavn && form.values.udfyldtaf) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [form.values.medarbejderensnavn, form.values.udfyldtaf]);

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
           // Get the current date and format it as DD/MM-YYYY
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

        // Prepare email data with all form fields including selected hardware
        const emailData = {
          to: itMails.join(", "),  // Use fetched IT emails
          subject: `Bestilling IT: ${form.values.medarbejderensnavn} - ${formattedDate}`,
          text: `
            IT bestilling:

            Medarbejderens navn: ${form.values.medarbejderensnavn}

            Skema udfyldt af: ${form.values.udfyldtaf}

            Udstyr: ${form.values.hardware.join(", ")}

            Andet: ${form.values.andet}
            
            Denne mail er automatisk genereret fra onboarding.autohus.dk
          `,
        };

        // Call sendEmail function to notify about IT equipment order
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

  console.log(itMails)

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Bestilling af IT-udstyr</h3>
      </div>
      <form onSubmit={form.onSubmit(() => handleShowConfirmation())}>
        <div className="mt-4 mb-4">
          <TextInput
            label="Skema udfyldt af*"
            placeholder="f.eks. Daniel Prior."
            className="mb-4"
            {...form.getInputProps("udfyldtaf")}
            size="xs"
          />

          <TextInput
            label="Medarbejderens navn*"
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
        <Button className="bg-black mt-10" type="submit" disabled={!isSubmitEnabled}>
          Send
        </Button>
        {!isSubmitEnabled && (
    <div className="text-red-500 text-sm mt-2">
      Felter med * mangler
    </div>
  )}
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
