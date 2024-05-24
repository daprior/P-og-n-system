import dbConnect from "../../utils/db";
import EmployeeModel from "../../models/EmployeeModel";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Check if there are any employees in the database
    const employees = await EmployeeModel.findAll();

    // If no employees exist, create some sample data
    if (employees.length === 0) {
      await EmployeeModel.bulkCreate([
        {
          name: "John Doe",
          phone: "1234567890",
          email: "johndoe@example.com",
        },
        {
          name: "Jane Smith",
          phone: "2345678901",
          email: "janesmith@example.com",
        },
      ]);
    }

    // Fetch employees again to ensure we return the full list
    const updatedEmployees = await EmployeeModel.findAll();
    res.status(200).json(updatedEmployees);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch employees", details: error.message });
  }
}
