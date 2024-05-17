import React from "react";

export default function BasicStats({ total, percentage, icon, topic }) {
  return (
    <div
      className="rounded-xl bg-white p-5 shadow-xl flex flex-row justify-between items-center"
      style={{ minHeight: "125px" }}
    >
      <div>
        <div className="text-black font-bold">{topic}</div>
        <div className="text-black font-bold text-xl mt-3">{total}</div>
      </div>
      <div className="flex items-center">
        {icon && <div className="ml-2">{icon}</div>}
      </div>
    </div>
  );
}
