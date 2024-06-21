// pages/api/settings.js
import SettingsModel from "../../models/SettingsModel";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const settings = await SettingsModel.findOne();
      res.status(200).json(settings || { emailRecipients: [] });
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ success: false, error: "Failed to fetch settings" });
    }
  } else if (req.method === 'POST') {
    const { emailRecipients } = req.body;

    try {
      let settings = await SettingsModel.findOne();
      if (!settings) {
        settings = await SettingsModel.create({ emailRecipients });
      } else {
        settings.emailRecipients = emailRecipients;
        await settings.save();
      }
      res.status(200).json({ success: true, message: "Settings saved successfully" });
    } catch (error) {
      console.error("Error saving settings:", error);
      res.status(500).json({ success: false, error: "Failed to save settings" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
