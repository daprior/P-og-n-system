import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { TextInput, Table, Loader } from "@mantine/core";
import Main from "components/layouts/Main";
import withAuthProtection from "../../components/withAuthProtection";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

function MedarbejderIndex() {
  const {
    data: orders,
    error,
    isValidating,
  } = useSWR("/api/getorders", fetcher);

  console.log(orders);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const rows = isValidating ? (
    <Table.Tr>
      <Table.Td colSpan="6" className="text-center">
        <Loader />
      </Table.Td>
    </Table.Tr>
  ) : error ? (
    <Table.Tr>
      <Table.Td colSpan="6" className="text-center">
        Failed to load
      </Table.Td>
    </Table.Tr>
  ) : (
    orders.map((order) => (
      <Table.Tr key={order?.id}>
        <Table.Td>{order?.medarbejderensnavn}</Table.Td>
        <Table.Td>{order?.udfyldtaf}</Table.Td>
        <Table.Td>{order?.hardware}</Table.Td>
        <Table.Td>{order?.andet}</Table.Td>
        <Table.Td>{order?.modtageradresse}</Table.Td>
        <Table.Td>
        {order?.createdAt &&
              new Date(order?.createdAt).toLocaleDateString("da-DK")}
        </Table.Td>
      </Table.Tr>
    ))
  );

  return (
    <Main className="">
      <div className="font-bold mb-4">
        <h3>Bestillinger</h3>
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
              <Table.Th>Medarbejderens navn</Table.Th>
              <Table.Th>Udfyldt af</Table.Th>
              <Table.Th>Hardware</Table.Th>
              <Table.Th>Andet</Table.Th>
              <Table.Th>Adresse / Afdeling</Table.Th>
              <Table.Th>Oprettet</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </Main>
  );
}

export default withAuthProtection(MedarbejderIndex);
