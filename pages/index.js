import { Button } from "@mantine/core";
import Link from "next/link";
import Onboard from "components/Onboard";

export default function Index() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#EFF5F9]">
        <img src="/logo.png" className="h-16 w-48"></img>

        <div className="pt-10 pr-20 pl-20 pb-20  shadow-xl mt-10 rounded-lg bg-white">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Opret medarbejder dasmjhdjasdhjas
        </h2>
          <Onboard />
        </div>

        {/* Button in the right corner */}
        <div className="absolute top-0 right-0 m-4">
          <Link href="/login">
            <Button size="md" className="bg-black">Gå til Login</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
