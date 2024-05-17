import Main from "components/layouts/Main";
import {
  TextInput,
  Textarea,
  Button,
  MultiSelect,
  Checkbox,
  Group,
  Select,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export default function OnboardIndex() {
  const form = useForm({
    initialValues: {
      udfyldtaf: "",
      email: "",
      name: "",
      company: "",
      phone: "",
      username: "",
      lastName: "",
      newPhoneNumber: "",
      jobTitle: "",
      department: [],
      message: "",
      position: [],
      checkboxes1: [],
      checkboxes2: [],
      newPhoneType: "",
    },
  });

  const test = async (values) => {
    console.log("Form values:", form.values);

    try {
      const response = await axios.post("/api/createemployee", values); // Sender formdata til din API-rute
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
  };

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Onboarding</h3>
      </div>
      <form onSubmit={form.onSubmit((values) => test(values))}>
        <Select
          label="Skema udfyldt af"
          placeholder="Navn"
          data={["Daniel Prior", "Jan Langkjær", "Laura Drustrup"]}
          {...form.getInputProps("udfyldtaf")}
          size="xs"
          className="mb-4"
        />
        <Divider className="mb-4" />
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
          <MultiSelect
            label="Stillingsbetegnelse"
            placeholder="Vælg"
            data={["Salg", "Lager", "Værksted", "Administration"]}
            {...form.getInputProps("position")}
            size="xs"
          />
          <TextInput
            label="Brugernavn"
            placeholder="Medarbejder brugernavn"
            {...form.getInputProps("username")}
            size="xs"
          />

          <TextInput
            label="Jobtitel"
            placeholder="Medarbejder jobtitel"
            {...form.getInputProps("jobTitle")}
            size="xs"
          />
        </div>
        <MultiSelect
          label="Afdeling"
          className="mt-4"
          placeholder="Vælg"
          data={[
            "Aalborg",
            "Risskov - Aarhus",
            "Randers",
            "Grenaa",
            "Auning",
            "Frederikshavn",
            "Hadsuns",
            "Sønderborg",
            "Aabenraa",
            "Hjørring",
          ]}
          {...form.getInputProps("department")}
          size="xs"
        />
        <div className="mt-4">
          <MultiSelect
            label="Systemadgange"
            placeholder="Vælg"
            data={[
              "Ford",
              "Fiat",
              "Kia",
              "Mazda",
              "Renault",
              "Volvo",
              "Dracar",
              "Docubizz",
              "E-mail",
              "Bilinfo",
              "ADT",
              "Værkstedsplanne",
              "Nissan",
              "JAC",
              "Isuzu",
              "Maxus",
            ]}
            {...form.getInputProps("checkboxes1")}
            size="xs"
          />
        </div>
        <div className="mt-4">
          <MultiSelect
            label="Diverse"
            placeholder="Vælg"
            data={["Firma tlf", "Visitkort"]}
            {...form.getInputProps("checkboxes2")}
            size="xs"
          />
        </div>
        <TextInput
          label="Aftale om bestemt telefon."
          placeholder="Model"
          className="mt-4"
          {...form.getInputProps("newPhoneType")}
          size="xs"
        />
        <Textarea
          label="Note"
          size="xs"
          className="mt-4"
          placeholder="Din besked"
          {...form.getInputProps("message")}
        />
        <Button className="bg-black mt-10" type="submit">
          Opret medarbejder
        </Button>
      </form>
    </div>
  );
}
