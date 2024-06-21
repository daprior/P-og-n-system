import React, { useEffect, useState } from "react";
import Main from "components/layouts/Main";
import { Button, TagsInput } from "@mantine/core"; // Using TagsInput
import withAuthProtection from '../../components/withAuthProtection';
import axios from "axios";
import { notifications } from "@mantine/notifications";

function SettingsIndex() {
  const [emailRecipients, setEmailRecipients] = useState([]);

  useEffect(() => {
    // Fetch existing settings
    axios.get("/api/settings")
      .then(response => setEmailRecipients(response.data.emailRecipients || []))
      .catch(error => console.error("Error fetching settings:", error));
  }, []);

  const handleSave = () => {
    axios.post("/api/settings", { emailRecipients })
      .then(() => notifications.show({
        title: "Success",
        message: "Settings saved successfully",
        color: "green",
      }))
      .catch(error => {
        console.error("Error saving settings:", error);
        notifications.show({
          title: "Error",
          message: "Failed to save settings",
          color: "red",
        });
      });
  };

  return (
    <Main className="">
      <div>
        <div className="font-bold mb-4">
          <h3>Indstillinger</h3>
        </div>
        <TagsInput
          label="Email modtagere"
          placeholder="Email"
          value={emailRecipients}
          onChange={setEmailRecipients}
          clearable
          create
        />
        <Button className="bg-black mt-5" size="sm" onClick={handleSave}>Gem</Button>
      </div>
    </Main>
  );
}

export default withAuthProtection(SettingsIndex);
