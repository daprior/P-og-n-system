import dbConnect from "/utils/db";
import EmployeeModel from "/models/EmployeeModel";

export default async function addEmployee(req, res) {
  const employeeData = req.body;
  await dbConnect();

  try {
    // Opret en ny medarbejder i databasen
    const result = await new EmployeeModel(employeeData).save();
    
    // Send responsen til klienten
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    // Håndter fejl, hvis der opstår nogen
    console.error("Fejl ved oprettelse af medarbejder:", error);
    res.status(500).json({ success: false, error: "Der opstod en fejl ved oprettelse af medarbejderen." });
  }
}
