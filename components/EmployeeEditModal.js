import React, { useEffect } from "react";
import {
  Modal,
  TextInput,
  MultiSelect,
  Checkbox,
  Group,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export default function EmployeeEditModal({
  opened,
  onClose,
  selectedEmployee,
}) {
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
    },
  });

  useEffect(() => {
    if (selectedEmployee) {
      form.setValues({
        udfyldtaf: selectedEmployee.udfyldtaf || "",
        email: selectedEmployee.email || "",
        name: selectedEmployee.name || "",
        company: selectedEmployee.company || "",
        phone: selectedEmployee.phone || "",
        username: selectedEmployee.username || "",
        lastName: selectedEmployee.lastName || "",
        newPhoneNumber: selectedEmployee.newPhoneNumber || "",
        jobTitle: selectedEmployee.jobTitle || "",
        department: selectedEmployee.department || [],
        message: selectedEmployee.message || "",
        position: selectedEmployee.position || [],
        checkboxes1: selectedEmployee.checkboxes1 || [],
        checkboxes2: selectedEmployee.checkboxes2 || [],
      });
    }
  }, [selectedEmployee, form.setValues]);

  const handleUpdate = async (values) => {
    try {
      await axios.put(`/api/updateemployee/${selectedEmployee._id}`, values);
      notifications.show({
        title: "Opdateret",
        color: "green",
        message: "Medarbejderen er opdateret.",
      });
      onClose();
    } catch (error) {
      console.error("Fejl ved opdatering af medarbejder:", error);
      notifications.show({
        title: "Fejl",
        color: "red",
        message: "Der opstod en fejl ved opdatering af medarbejderen.",
      });
    }
  };

  return (
    <Modal
      key={selectedEmployee ? selectedEmployee._id : "new"}
      opened={opened}
      onClose={onClose}
      size="xl"
      title="Rediger medarbejder"
    >
      <form onSubmit={form.onSubmit(handleUpdate)}>
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
        <MultiSelect
          label="Overordnet"
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
          ]}
          {...form.getInputProps("checkboxes1")}
          size="xs"
        />
        <MultiSelect
          label="IT"
          placeholder="Vælg"
          data={["Betalt tlf", "Visitkort"]}
          {...form.getInputProps("checkboxes2")}
          size="xs"
        />
        <Textarea
          label="Note"
          size="xs"
          placeholder="Din besked"
          {...form.getInputProps("message")}
        />
        <Button type="submit" className="bg-black mt-4">
          Opdater medarbejder
        </Button>
      </form>
    </Modal>
  );
}
