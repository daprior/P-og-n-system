import Main from "components/layouts/Main";
import {
  TextInput,
  Textarea,
  Button,
  MultiSelect,
  Select,
  Divider,
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
      username: "",
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

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        const response = await axios.post("/api/createemployee", form.values);
        console.log("Medarbejder oprettet:", response.data);
        notifications.show({
          title: "Oprettet",
          color: "green",
          message: "Medarbejderen er nu oprettet.",
        });
      } catch (error) {
        console.error("Fejl ved oprettelse af medarbejder:", error);
        notifications.show({
          title: "Fejl",
          color: "red",
          message: "Der opstod en fejl ved oprettelse af medarbejderen.",
        });
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Onboarding v1</h3>
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
            label="Brugernavn"
            placeholder="brugernavn"
            {...form.getInputProps("username")}
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
            data={['Aalborg', 'Risskov', 'Randers', 'Grenaa', 'Auning', 'Frederikshavn', 'Hadsund', 'Sønderborg', 'Aabenraa', 'Hjørring']}
            {...form.getInputProps("department")}
          />

          <MultiSelect
            label="Position"
            size="xs"
            data={['Salg', 'Administration', 'Lager', 'Værksted', 'Klargøring', 'IT', 'Andet']}
            {...form.getInputProps("position")}
          />
          <MultiSelect
            label="Adgange"
            size="xs"
            data={['Fiat', 'Ford', 'Kia', 'Mazda', 'Renault', 'Volvo', 'Dracar', 'DocuBizz', 'E-mail', 'Bilinfo', 'ADT', 'Værkstedsplanne', 'Isuzu', 'Maxus', 'JAC' ]}
            {...form.getInputProps("accesses")}
          />
          <MultiSelect
            label="Diverse"
            size="xs"
            data={['Visitkort', 'Firmabetalt telefon']}
            {...form.getInputProps("misc")}
          />
           <TextInput
            label="Bestemt tlf"
            placeholder="Iphone.."
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
