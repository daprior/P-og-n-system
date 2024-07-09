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

  useEffect(() => {
    if (selectedEmployee) {
      form.setValues({
        createdby: selectedEmployee.createdby || "",
        name: selectedEmployee.name || "",
        phone: selectedEmployee.phone || "",
        email: selectedEmployee.email || "",
        jobtitle: selectedEmployee.jobtitle || "",
        note: selectedEmployee.note || "",
        department: selectedEmployee.department
          ? JSON.parse(selectedEmployee.department)
          : [],
        position: selectedEmployee.position
          ? JSON.parse(selectedEmployee.position)
          : [],
        accesses: selectedEmployee.accesses
          ? JSON.parse(selectedEmployee.accesses)
          : [],
        misc: selectedEmployee.misc ? JSON.parse(selectedEmployee.misc) : [],
        phonemodel: selectedEmployee.phonemodel || "",
      });
    }
  }, [selectedEmployee, form.setValues]);

  const handleUpdate = async (values) => {
    try {
      await axios.put(`/api/updateemployee/${selectedEmployee.id}`, values);
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

  console.log(selectedEmployee);
  return (
    <Modal
      key={selectedEmployee ? selectedEmployee.id : "new"}
      opened={opened}
      onClose={onClose}
      size="xl"
      title="Rediger medarbejder"
    >
      <form onSubmit={form.onSubmit(handleUpdate)}>
        <TextInput
          label="Oprettet af"
          placeholder="Navn"
          {...form.getInputProps("createdby")}
          size="xs"
        />
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
          placeholder="Medarbejder email"
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
            "Værkstedsplanne",
            "Isuzu",
            "Maxus",
            "JAC",
          ]}
          {...form.getInputProps("accesses")}
        />
        <MultiSelect
          label="Diverse"
          size="xs"
          data={["Visitkort", "Firmabetalt telefon"]}
          {...form.getInputProps("misc")}
        />

        <Textarea
          label="Note"
          placeholder="Medarbejder note"
          {...form.getInputProps("note")}
          size="xs"
        />
        <TextInput
          label="Aftalt telefon model"
          placeholder="Model"
          {...form.getInputProps("phonemodel")}
          size="xs"
        />

        <Button type="submit" className="bg-black mt-4">
          Opdater medarbejder
        </Button>
      </form>
    </Modal>
  );
}
