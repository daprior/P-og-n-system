import dbConnect from "/utils/db";
import EmployeeModel from "/models/EmployeeModel";

export default async function deleteEmployee(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "DELETE") {
    try {
      const result = await EmployeeModel.findByPk(id);
      if (!result) {
        return res.status(404).json({ success: false, error: "Medarbejder ikke fundet." });
      }
      await result.destroy();
      res.status(200).json({ success: true, message: "Medarbejder slettet." });
    } catch (error) {
      console.error("Fejl ved sletning af medarbejder:", error);
      res.status(500).json({ success: false, error: "Der opstod en fejl ved sletning af medarbejderen." });
    }
  } else {
    res.status(405).json({ success: false, error: "Metode ikke tilladt." });
  }
}
