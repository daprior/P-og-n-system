import { Button, Modal, Group } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import ItBoard from "components/ItBoard";
import { IoChevronBack } from "react-icons/io5";

export default function ItIndex() {

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#EFF5F9]">
        <img src="/logo.png" className="h-16 w-48"></img>

        <div className="pt-10 pr-20 pl-20 pb-20 shadow-xl mt-10 rounded-lg bg-white">
          <div className="flex justify-between mb-5">
            <Button
            component="a"
            href="/"
            className="bg-black"><IoChevronBack/> Tilbage</Button>
          </div>
            <h2 className="mt-4 mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              IT-udstyr
            </h2>

          <ItBoard  />
        </div>

        {/* Buttons in the right corner */}
        <div className="absolute top-0 right-0 m-4">
          <Group>
            <Link href="/login">
              <Button size="md" className="bg-black">
                Gå til Login
              </Button>
            </Link>
          </Group>
        </div>

   
      </div>
    </>
  );
}
