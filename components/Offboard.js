import { useForm } from "@mantine/form";
import React, { useState } from "react";

export default function OnboardIndex() {
  const form = useForm({
    initialValues: {},
  });

  const handleShowConfirmation = () => {
    console.log(form.values);
  };

  return (
    <div>
      <div className="font-bold mb-4">
        <h3>Offboarding</h3>
      </div>
      <form onSubmit={form.onSubmit(() => handleShowConfirmation())}></form>
    </div>
  );
}
