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
      checkboxes1: [
        { value: "fiat", label: "Fiat", checked: false },
        { value: "ford", label: "Ford", checked: false },
        { value: "kia", label: "Kia", checked: false },
        { value: "mazda", label: "Mazda", checked: false },
        { value: "renault", label: "Renault", checked: false },
        { value: "volvo", label: "Volvo", checked: false },
        { value: "dracar", label: "Dracar", checked: false },
        { value: "docuBizz", label: "DocuBizz", checked: false },
        { value: "email", label: "E-mail", checked: false },
        { value: "bilinfo", label: "Bilinfo", checked: false },
        { value: "adt", label: "ADT", checked: false },
        { value: "vaerkstedplanne", label: "Værkstedplanne", checked: false },
      ],
      checkboxes2: [
        { value: "paidphone", label: "Firmabetalt tlf ", checked: false },
        { value: "visitkort", label: "Visitkort", checked: false },
      ],
    },
  });

  const test = async (values) => {
    console.log("Form values:", form.values);
  
    try {
      const response = await axios.post('/api/createemployee', values); // Sender formdata til din API-rute
      console.log('Medarbejder oprettet:', response.data);
      notifications.show({
        title: "Oprettet",
        color: "green",
        message: "Medarbejderen er nu oprettet.",
      });
    } catch (error) {
      console.error('Fejl ved oprettelse af medarbejder:', error);
      notifications.show({
        title: "Fejl",
        color: "red",
        message: "Der opstod en fejl ved oprettelse af medarbejderen.",
      });
    }
  };

  const handleCheckboxChange = (index, group) => {
    const updatedCheckboxes = [...form.values[`checkboxes${group}`]];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    form.setFieldValue(`checkboxes${group}`, updatedCheckboxes);
  };

  return (
    <Main className="">
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
        <Divider className="mb-4"/>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Navn"
            placeholder="Medarbejder navn"
            {...form.getInputProps("name")}
            size="xs"
          />
          <TextInput
            label="Firma"
            placeholder="Medarbejder firma"
            {...form.getInputProps("company")}
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
            placeholder="Medarbejder email"
            {...form.getInputProps("email")}
            size="xs"
          />
          <MultiSelect
            label="Stilling"
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
            label="Efternavn"
            placeholder="Medarbejder efternavn"
            {...form.getInputProps("lastName")}
            size="xs"
          />
          <TextInput
            label="Nyt Telefonnummer"
            placeholder="Medarbejder nye telefonnummer"
            {...form.getInputProps("newPhoneNumber")}
            size="xs"
          />
          <TextInput
            label="Jobtitel"
            placeholder="Medarbejder jobtitel"
            {...form.getInputProps("jobTitle")}
            size="xs"
          />
          <MultiSelect
            label="Afdeling"
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
        </div>
        <div className="mt-4">
          <Checkbox.Group size="xs" label="Overordnet ">
            <Group mt="xs">
              {form.values.checkboxes1.map((checkbox, index) => (
                <Checkbox
                  key={index}
                  value={checkbox.value}
                  label={checkbox.label}
                  onChange={() => handleCheckboxChange(index, 1)}
                  checked={checkbox.checked}
                />
              ))}
            </Group>
          </Checkbox.Group>
        </div>
        <div className="mt-4">
          <Checkbox.Group size="xs" label="IT ">
            <Group mt="xs">
              {form.values.checkboxes2.map((checkbox, index) => (
                <Checkbox
                  key={index}
                  value={checkbox.value}
                  label={checkbox.label}
                  onChange={() => handleCheckboxChange(index, 2)}
                  checked={checkbox.checked}
                />
              ))}
            </Group>
          </Checkbox.Group>
        </div>
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
    </Main>
  );
}
