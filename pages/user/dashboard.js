import React from "react";
import Main from "components/layouts/Main";
import { TextInput } from "@mantine/core";
import Welcome from "../../components/Dashboard/Welcome";
import Feature from "../../components/Dashboard/Feature";
import BasicStats from "../../components/Dashboard/Basicstats";
import { IoIosStats, IoIosDocument } from "react-icons/io";
import { IoPeopleCircle } from "react-icons/io5";
import withAuthProtection from '../../components/withAuthProtection';
import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

function DashboardIndex() {
  const {
    data: employees,
    error,
    isValidating,
  } = useSWR("/api/getemployees", fetcher);

  // Calculate total employees count
  const totalEmployees = employees ? employees.length : 0;

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
              total={totalEmployees.toString()}
              icon={<IoIosStats className="h-8 w-8 text-[#151617]" />}
            />
          </div>
          <div className="col-span-6 md:col-span-2">
            <BasicStats
              topic="Total afdelinger"
              total={"10"}
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

export default withAuthProtection(DashboardIndex);