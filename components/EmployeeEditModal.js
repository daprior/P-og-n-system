import React, { useEffect } from "react";
import {
  Modal,
  TextInput,
  MultiSelect,
  Checkbox,
  Group,
  Select,
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
      phone: [],
      email: [],
      jobtitle: "",
      employmentdate: "",
      paidphone: [],
      phonenote: "",
      card: [],
      department: [],
      accesses: [],
      other: "",
      status: [],
      note: "",
    },
  });

  useEffect(() => {
    if (selectedEmployee) {
      form.setValues({
        createdby: selectedEmployee?.createdby || "",
        name: selectedEmployee?.name || "",
        phone: selectedEmployee?.phone ? JSON.parse(selectedEmployee?.phone) : [],
        email: selectedEmployee?.email ? JSON.parse(selectedEmployee?.email) : [],
        jobtitle: selectedEmployee?.jobtitle || "",
        employmentdate: selectedEmployee?.employmentdate || "",
        paidphone: selectedEmployee?.paidphone
          ? JSON.parse(selectedEmployee?.paidphone)
          : [],
        phonenote: selectedEmployee?.phonenote || "",
        card: selectedEmployee?.card ? JSON.parse(selectedEmployee?.card) : [],

        department: selectedEmployee?.department
          ? JSON.parse(selectedEmployee?.department)
          : [],

        accesses: selectedEmployee?.accesses
          ? JSON.parse(selectedEmployee?.accesses)
          : [],
        other: selectedEmployee.other || "",
        status: selectedEmployee.status ? JSON.parse(selectedEmployee?.status) : [],
        note: selectedEmployee?.note || "",
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
          <Select
            label="Telefonnummer"
            placeholder="Ja / nej"
            {...form.getInputProps("phone")}
            data={["Ja", "Nej"]}
            size="xs"
          />
          <Select
            label="Email"
            placeholder="Ja / nej"
            {...form.getInputProps("email")}
            data={["Ja", "Nej"]}
            size="xs"
          />
          <TextInput
            label="Job titel"
            placeholder="titel"
            {...form.getInputProps("jobtitle")}
            size="xs"
          />
          <TextInput
            label="Ansættelsesdato"
            placeholder="02-03-2024"
            {...form.getInputProps("employmentdate")}
            size="xs"
          />
          <Select
            label="Beskatning af fri telefon"
            placeholder=""
            {...form.getInputProps("paidphone")}
            data={["Ja", "Nej"]}
            size="xs"
          />
          <TextInput
            label="Note til telefon"
            placeholder="F.eks. hvis der er aftalt bestemt tlf."
            {...form.getInputProps("phonenote")}
            size="xs"
          />

          <Select
            label="Visitkort"
            placeholder=""
            {...form.getInputProps("card")}
            data={["Ja", "Nej"]}
            size="xs"
          />

          <Select
            label="Status på onboarding"
            placeholder=""
            {...form.getInputProps("status")}
            data={["under udvikling", "færdig"]}
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
            label="Adgange"
            placeholder="ADT, Bilinfo..."
            size="xs"
            data={[
              "Ford",
              "Kia",
              "Mazda",
              "Renault",
              "Volvo",
              "Maxus",
              "Isuzu",
              "JAC",
              "Dracar",
              "DocuBizz",
              "Bilinfo",
              "ADT",
              "Værkstedsplanner",
            ]}
            {...form.getInputProps("accesses")}
          />
          <TextInput
            label="Andet hardware ønskes"
            placeholder="Eks. mus, tastatur, skærm etc."
            {...form.getInputProps("other")}
            size="xs"
          />
        </div>
        <Textarea
          label="Evt. noter"
          className="mt-4"
          placeholder="Note"
          {...form.getInputProps("note")}
          size="xs"
        />

        <Button type="submit" className="bg-black mt-4">
          Opdater medarbejder
        </Button>
      </form>
    </Modal>
  );
}
