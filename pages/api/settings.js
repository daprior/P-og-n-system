import dbConnect from "../../utils/db"; // Adjust the path as necessary
import SettingsModel from "../../models/SettingsModel"; // Adjust the path as necessary

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection is established

  switch (req.method) {
    case "GET":
      try {
        const settings = await SettingsModel.findOne();
        if (settings) {
          return res.status(200).json({ success: true, data: settings });
        } else {
          return res.status(200).json({ success: true, data: {} });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch settings",
          message: error.message,
        });
      }

    case "POST":
      try {
        const existingSettings = await SettingsModel.findOne();
        if (existingSettings) {
          return res.status(400).json({
            success: false,
            error: "Settings already exist. Use PUT to update.",
          });
        }
        const newSettings = await SettingsModel.create(req.body);
        return res.status(201).json({ success: true, data: newSettings });
      } catch (error) {
        console.error("Error creating settings:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to create settings",
          message: error.message,
        });
      }

    case "PUT":
      try {
        const { onboardmails, offboardmails, itmails } = req.body;

        // Find existing settings
        const existingSettings = await SettingsModel.findOne();
        if (existingSettings) {
          // Update existing settings
          await SettingsModel.update(
            {
              onboardmails,
              offboardmails,
              itmails,
            },
            {
              where: { id: existingSettings.id },
            }
          );

          // Fetch updated settings
          const updatedSettings = await SettingsModel.findOne({
            where: { id: existingSettings.id },
          });

          return res.status(200).json({ success: true, data: updatedSettings });
        } else {
          // Create new settings if none exist
          const newSettings = await SettingsModel.create({
            onboardmails,
            offboardmails,
            itmails,
          });

          return res.status(201).json({ success: true, data: newSettings });
        }
      } catch (error) {
        console.error("Error updating settings:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to update settings",
          message: error.message,
        });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} Not Allowed`,
      });
  }
}
