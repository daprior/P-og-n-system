import { Button } from "@mantine/core";
import React from "react";

export default function Welcome() {
  return (
    <div
      className="rounded-xl bg-white shadow-xl p-10 flex flex-col justify-between"
      style={{ minHeight: "300px" }}
    >
      {/* <div>
        <h1 className="font-bold text-black">Velkommen tilbage</h1>
        <p className="text-gray-500 text-sm mt-5">
          Velkommen til Pedersen & Nielsen Automobiler A/S onboarding portal....
        </p>
      </div> */}
      <div className="m-auto">
        <img src="/logo.png">
        </img>
      </div>
    </div>
  );
}
