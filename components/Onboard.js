import Main from "components/layouts/Main";
import {
  TextInput,
  Textarea,
  Button,
  MultiSelect,
  Modal,
  Group,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export default function OnboardIndex() {
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
      status: ["under udvikling"],
      note: "",
    },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [onboardMails, setOnboardMails] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const fetchOnboardMails = async () => {
      try {
        const response = await axios.get("/api/settings");
        const settings = response.data.data || {};
        const onboardMails = JSON.parse(settings.onboardmails || "[]");
        setOnboardMails(onboardMails);
      } catch (error) {
        console.error("Error fetching onboard mails:", error);
        notifications.show({
          title: "Error",
          color: "red",
          message: "Failed to fetch onboard mails.",
        });
      }
    };

    fetchOnboardMails();
  }, []);

  useEffect(() => {
    if (
      form.values.createdby &&
      form.values.name &&
      form.values.jobtitle &&
      form.values.employmentdate &&
      form.values.department.length > 0
    ) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [
    form.values.createdby,
    form.values.name,
    form.values.jobtitle,
    form.values.employmentdate,
    form.values.department,
  ]);

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

        const currentDate = new Date();
        const formattedDate = `${String(currentDate.getDate()).padStart(
          2,
          "0"
        )}/${String(currentDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${currentDate.getFullYear()}`;

        // Prepare email data with all form fields
        const emailData = {
          to: onboardMails.join(", "), // Use onboardMails from state
          subject: `Ny medarbejder: ${form.values.name} - ${formattedDate}`,
          text: `
            En ny medarbejder er tilføjet til Onboarding:

            Oprettet af: ${form.values.createdby}
            Medarbejderens navn: ${form.values.name}
            Email: ${
              Array.isArray(form.values.email)
                ? form.values.email.join(", ")
                : form.values.email
            }
            Telefon: ${
              Array.isArray(form.values.phone)
                ? form.values.phone.join(", ")
                : form.values.phone
            }
            Beskatning af fri tlf: ${
              Array.isArray(form.values.paidphone)
                ? form.values.paidphone.join(", ")
                : form.values.paidphone
            }
            Note til telefon: ${form.values.phonenote}
            Job beskrivelse: ${form.values.jobtitle}
            Afdeling: ${
              Array.isArray(form.values.department)
                ? form.values.department.join(", ")
                : form.values.department
            }
            Visitkort: ${
              Array.isArray(form.values.card)
                ? form.values.card.join(", ")
                : form.values.card
            }
            Andet hardware note: ${form.values.other}
            Adgange: ${
              Array.isArray(form.values.accesses)
                ? form.values.accesses.join(", ")
                : form.values.accesses
            }
            Note: ${form.values.note}
            Ansættelsesdato: ${form.values.employmentdate}
            Status: ${
              Array.isArray(form.values.status)
                ? form.values.status.join(", ")
                : form.values.status
            }


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

  console.log(onboardMails);

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Onboarding</h3>
      </div>
      <form onSubmit={form.onSubmit(() => handleShowConfirmation())}>
        <TextInput
          label="Oprettet af*"
          className="mb-4"
          placeholder="Navn"
          {...form.getInputProps("createdby")}
          size="xs"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Navn*"
            placeholder="Medarbejder navn"
            {...form.getInputProps("name")}
            size="xs"
          />
          <Select
            label="Telefon"
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
            label="Job titel*"
            placeholder="titel"
            {...form.getInputProps("jobtitle")}
            size="xs"
          />
          <TextInput
            label="Ansættelsesdato*"
            placeholder="02-03-2024"
            {...form.getInputProps("employmentdate")}
            size="xs"
          />
          <Select
            label="Medarbejderen skal have betalt firmatelefon (Beskatning af fri telefon)"
            placeholder="Ja / nej"
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
            placeholder="Ja / nej"
            {...form.getInputProps("card")}
            data={["Ja", "Nej"]}
            size="xs"
          />

          <MultiSelect
            label="Afdeling*"
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
            label="Adgange (ønskes andre adgange er det ikke under IT-afdelingen)"
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
          <Select
            label="Status på onboarding (Skal være under udvikling)"
            placeholder="Under udvikling"
            disabled
            {...form.getInputProps("status")}
            data={["under udvikling", "færdig"]}
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
        <Button
          className="bg-black mt-10"
          type="submit"
          disabled={!isSubmitEnabled}
        >
          Opret medarbejder
        </Button>
        {!isSubmitEnabled && (
          <div className="text-red-500 text-sm mt-2">Felter med * mangler</div>
        )}
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
