import React, { useState, useEffect } from "react";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export default function EmailAccess() {
  const form = useForm({
    initialValues: {
      onboardmails: [],
      offboardmails: [],
      itmails: [],
    },
  });

  const [inputValue, setInputValue] = useState("");
  const [currentList, setCurrentList] = useState("onboardmails");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/settings");
        const settings = response.data.data || {};

        console.log("Fetched settings:", settings); // Debugging

        form.setValues({
          onboardmails: JSON.parse(settings.onboardmails || "[]"),
          offboardmails: JSON.parse(settings.offboardmails || "[]"),
          itmails: JSON.parse(settings.itmails || "[]"),
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
        notifications.show({
          title: "Error",
          color: "red",
          message: "Failed to fetch settings.",
        });
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValueTrimmed = inputValue.trim();
      if (inputValueTrimmed && validateEmail(inputValueTrimmed)) {
        form.setFieldValue(currentList, [
          ...form.values[currentList],
          inputValueTrimmed,
        ]);
        setInputValue(""); // Clear input after adding
      } else {
        alert("Please enter a valid email address.");
      }
    }
  };

  const handleDeleteEmail = (emailToDelete, listName) => {
    form.setFieldValue(
      listName,
      form.values[listName].filter((email) => email !== emailToDelete)
    );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    try {
      // Validate data
      if (
        !Array.isArray(form.values.onboardmails) ||
        !Array.isArray(form.values.offboardmails) ||
        !Array.isArray(form.values.itmails)
      ) {
        throw new Error("Data validation failed: Values must be arrays.");
      }
  
      const response = await axios.put("/api/settings", {
        onboardmails: form.values.onboardmails,
        offboardmails: form.values.offboardmails,
        itmails: form.values.itmails,
      });
  
      console.log("Update response:", response.data); // Debugging
  
      notifications.show({
        title: "Success",
        color: "green",
        message: "Settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      notifications.show({
        title: "Error",
        color: "red",
        message: error.message || "Failed to update settings.",
      });
    }
  };
  

  return (
    <div className="p-6">
      <div className="font-bold text-lg mb-4 mt-4">
        <h3>Email Settings</h3>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Onboard Mails</h4>
        <TextInput
          size="xs"
          placeholder="Enter email and press Enter"
          value={currentList === "onboardmails" ? inputValue : ""}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full mb-4"
          onFocus={() => setCurrentList("onboardmails")}
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {form.values.onboardmails.map((email, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {email}
              <button
                onClick={() => handleDeleteEmail(email, "onboardmails")}
                className="ml-2 text-red-300"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Offboard Mails</h4>
        <TextInput
          size="xs"
          placeholder="Enter email and press Enter"
          value={currentList === "offboardmails" ? inputValue : ""}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full mb-4"
          onFocus={() => setCurrentList("offboardmails")}
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {form.values.offboardmails.map((email, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {email}
              <button
                onClick={() => handleDeleteEmail(email, "offboardmails")}
                className="ml-2 text-red-300"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">IT Mails</h4>
        <TextInput
          size="xs"
          placeholder="Enter email and press Enter"
          value={currentList === "itmails" ? inputValue : ""}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full mb-4"
          onFocus={() => setCurrentList("itmails")}
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {form.values.itmails.map((email, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {email}
              <button
                onClick={() => handleDeleteEmail(email, "itmails")}
                className="ml-2 text-red-300"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button className="mt-4 bg-black" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
