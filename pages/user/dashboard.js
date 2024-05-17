import React from "react";
import Main from "components/layouts/Main";
import { TextInput } from "@mantine/core";
import Welcome from "../../components/Dashboard/Welcome";
import Feature from "../../components/Dashboard/Feature";
import BasicStats from "../../components/Dashboard/Basicstats";
import { IoIosStats, IoIosDocument } from "react-icons/io";
import { IoPeopleCircle } from "react-icons/io5";

export default function DashboardIndex() {
  return (
    <Main className="">
      <div className="grid gap-4 "> 
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-4">
            <Welcome />
          </div>
          <div className="md:col-span-2 col-span-6">
            <Feature />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-2">
            <BasicStats
              topic="Total medarbejdere"
              total="0"
              icon={<IoIosStats className="h-8 w-8 text-[#151617]" />}
            />
          </div>
          <div className="col-span-6 md:col-span-2">
            <BasicStats
              topic="Total afdelinger"
              total={"0"}
              icon={<IoPeopleCircle className="h-8 w-8 text-[#151617]" />}
            />
          </div>
          <div className="col-span-6 md:col-span-2">
            <BasicStats
              topic="Total test"
              total={"0"}
              icon={<IoIosDocument className="h-8 w-8 text-[#151617]" />}
            />
          </div>
        </div>
      </div>
    </Main>
  );
}
