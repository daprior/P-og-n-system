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
      email: "",
      name: "",

      phone: "",
    },
  });

  useEffect(() => {
    if (selectedEmployee) {
      form.setValues({
        email: selectedEmployee.email || "",
        name: selectedEmployee.name || "",

        phone: selectedEmployee.phone || "",
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

        <Button type="submit" className="bg-black mt-4">
          Opdater medarbejder
        </Button>
      </form>
    </Modal>
  );
}
