import dbConnect from "/utils/db";
import OrderModel from "/models/OrderModel";

export default async function getOrders(req, res) {
  await dbConnect();

  try {
    const orders = await OrderModel.findAll();

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    // Håndter fejl, hvis der opstår nogen
    console.error("Fejl ved hentning af bestillinger:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Der opstod en fejl ved hentning af bestillinger.",
      });
  }
}
