import Main from "components/layouts/Main";
import {
  TextInput,
  Textarea,
  Button,
  MultiSelect,
  Modal,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export default function OnboardIndex() {
  const form = useForm({
    initialValues: {
      createdby: "",
      name: "",
      phone: "",
      email: "",
      jobtitle: "",
      note: "",
      department: [],
      position: [],
      accesses: [],
      misc: [],
      phonemodel: "",
    },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const sendEmail = async (emailData) => {
    try {
      const response = await axios.post("/api/sendEmail", emailData);
      console.log("Email sent:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        const response = await axios.post("/api/createemployee", form.values);
        console.log("Employee created:", response.data);
        notifications.show({
          title: "Created",
          color: "green",
          message: "Employee has been created successfully.",
        });

        // Prepare email data with all form fields
        const emailData = {
          to: "daniel.prior@autohus.dk",
          subject: "Ny medarbejder oprettet",
          text: `
            En ny medarbejder er tilføjet til Onboarding:

            Oprettet af: ${form.values.createdby}
            Medarbejderens navn: ${form.values.name}
            Email: ${form.values.email}
            Telefonnummer: ${form.values.phone}
            Job beskrivelse: ${form.values.jobtitle}
            Afdeling: ${form.values.department.join(", ")}
            Position: ${form.values.position.join(", ")}
            Adgange: ${form.values.accesses.join(", ")}
            Diverse: ${form.values.misc.join(", ")}
            Aftalt bestemt telefon: ${form.values.phonemodel}
            Note: ${form.values.note}

            Denne mail er automatisk genereret fra onboarding.autohus.dk
          `,
        };

        // Call sendEmail function to notify about employee creation
        await sendEmail(emailData);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error creating employee:", error);
        notifications.show({
          title: "Error",
          color: "red",
          message: "Failed to create employee.",
        });
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Onboarding</h3>
      </div>
      <form onSubmit={form.onSubmit(() => handleShowConfirmation())}>
        <TextInput
          label="Oprettet af"
          className="mb-4"
          placeholder="Navn"
          {...form.getInputProps("createdby")}
          size="xs"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Navn"
            placeholder="Medarbejder navn"
            {...form.getInputProps("name")}
            size="xs"
          />
          <TextInput
            label="Telefonnummer"
            placeholder="Medarbejder telefonnummer"
            {...form.getInputProps("phone")}
            size="xs"
          />
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
            size="xs"
          />
          <TextInput
            label="Job titel"
            placeholder="titel"
            {...form.getInputProps("jobtitle")}
            size="xs"
          />

          <MultiSelect
            label="Afdeling"
            size="xs"
            placeholder="Aalborg, Risskov..."
            data={[
              "Aalborg",
              "Risskov",
              "Randers",
              "Grenaa",
              "Auning",
              "Frederikshavn",
              "Hadsund",
              "Sønderborg",
              "Aabenraa",
              "Hjørring",
            ]}
            {...form.getInputProps("department")}
          />

          <MultiSelect
            label="Position"
            size="xs"
            placeholder="IT,Salg..."
            data={[
              "Salg",
              "Administration",
              "Lager",
              "Værksted",
              "Klargøring",
              "IT",
              "Andet",
            ]}
            {...form.getInputProps("position")}
          />
          <MultiSelect
            label="Adgange"
            placeholder="ADT, Bilinfo..."
            size="xs"
            data={[
              "Fiat",
              "Ford",
              "Kia",
              "Mazda",
              "Renault",
              "Volvo",
              "Dracar",
              "DocuBizz",
              "E-mail",
              "Bilinfo",
              "ADT",
              "Værkstedsplanner",
              "Isuzu",
              "Maxus",
              "JAC",
            ]}
            {...form.getInputProps("accesses")}
          />
          <MultiSelect
            label="Diverse"
            placeholder="Visitkort..."
            size="xs"
            data={["Visitkort", "Firmabetalt telefon"]}
            {...form.getInputProps("misc")}
          />
          <TextInput
            label="Aftalt bestemt tlf"
            placeholder="Iphone, Samsung..."
            {...form.getInputProps("phonemodel")}
            size="xs"
          />
        </div>
        <Textarea
          label="Note på medarbejder"
          className="mt-4"
          placeholder="Note"
          {...form.getInputProps("note")}
          size="xs"
        />
        <Button className="bg-black mt-10" type="submit">
          Opret medarbejder
        </Button>
      </form>

      <Modal
        opened={showConfirmation}
        onClose={() => handleConfirmation(false)}
        title="Er du sikker på, at du vil oprette medarbejderen?"
        size="sm"
      >
        <Group position="center" mt="md">
          <Button
            className="bg-black"
            color="green"
            onClick={() => handleConfirmation(true)}
          >
            Ja, opret medarbejder
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