import dbConnect from "/utils/db";
import EmployeeModel from "/models/EmployeeModel";

export default async function getEmployees(req, res) {
  await dbConnect();

  try {
    // Hent alle medarbejdere fra databasen
    const employees = await EmployeeModel.find();
    
    // Send responsen til klienten
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    // Håndter fejl, hvis der opstår nogen
    console.error("Fejl ved hentning af medarbejdere:", error);
    res.status(500).json({ success: false, error: "Der opstod en fejl ved hentning af medarbejdere." });
  }
}
