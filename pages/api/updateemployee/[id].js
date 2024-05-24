import dbConnect from "/utils/db";
import EmployeeModel from "/models/EmployeeModel";

export default async function updateEmployee(req, res) {
  const { id } = req.query;
  const employeeData = req.body;

  await dbConnect();

  if (req.method === "PUT") {
    try {
      const result = await EmployeeModel.findByPk(id);
      if (!result) {
        return res.status(404).json({ success: false, error: "Medarbejder ikke fundet." });
      }
      await result.update(employeeData);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Fejl ved opdatering af medarbejder:", error);
      res.status(500).json({ success: false, error: "Der opstod en fejl ved opdatering af medarbejderen." });
    }
  } else {
    res.status(405).json({ success: false, error: "Metode ikke tilladt." });
  }
}
