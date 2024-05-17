import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { TextInput, Table } from "@mantine/core";
import { IoPencilOutline, IoSearchOutline, IoTrashBinOutline } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import EmployeeModal from "/components/EmployeeModal";
import EmployeeEditModal from "/components/EmployeeEditModal";
import Main from "components/layouts/Main";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function DashboardIndex() {
  const { data: employees, error, mutate } = useSWR('/api/getemployees', fetcher);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmployeeModalOpen, { open: openEmployeeModal, close: closeEmployeeModal }] = useDisclosure(false);
  const [isEmployeeEditModalOpen, { open: openEmployeeEditModal, close: closeEmployeeEditModal }] = useDisclosure(false);

  if (error) return <div>Failed to load</div>;
  if (!employees) return <div>Loading...</div>;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEmployeeModalClick = (employee) => {
    setSelectedEmployee(employee);
    openEmployeeModal();
  };

  const handleEmployeeEditModalClick = (employee) => {
    setSelectedEmployee(employee);
    openEmployeeEditModal();
  };

  const rows = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((employee) => (
      <Table.Tr key={employee._id}>
        <Table.Td>{employee._id}</Table.Td>
        <Table.Td>
          {employee.createdAt &&
            new Date(employee.createdAt).toLocaleDateString("da-DK")}
        </Table.Td>
        <Table.Td>{employee.name}</Table.Td>
        <Table.Td>{employee.phone}</Table.Td>
        <Table.Td>{employee.email}</Table.Td>
        <Table.Td>
          <div className="flex gap-4">
            <IoSearchOutline
              onClick={() => handleEmployeeModalClick(employee)}
              className="h-5 w-5 cursor-pointer"
            />
            <IoPencilOutline 
              onClick={() => handleEmployeeEditModalClick(employee)}
              className="h-5 w-5 cursor-pointer"
            />
            <IoTrashBinOutline className="h-5 w-5" />
          </div>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Main className="">
      <div className="font-bold mb-4">
        <h3>Medarbejdere</h3>
      </div>
      <div>
        <TextInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Søg efter navn"
          className="mb-4 mt-4"
          size="xs"
        />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Oprettet</Table.Th>
              <Table.Th>Navn</Table.Th>
              <Table.Th>Telefon</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Handlinger</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
      
      <EmployeeModal opened={isEmployeeModalOpen} onClose={closeEmployeeModal} selectedEmployee={selectedEmployee} />
      <EmployeeEditModal 
        opened={isEmployeeEditModalOpen} 
        onClose={() => {
          closeEmployeeEditModal();
          mutate(); // Revalidate the data when the modal closes
        }} 
        selectedEmployee={selectedEmployee} 
      />
    </Main>
  );
}
