import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // nok ikke godt i production
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    try {
      // Send email
      await transporter.sendMail({
        from: `"Onboarding Pedersen & Nielsen" <no-reply@autohus.dk>`, // Adjust the 'from' field
        to,
        subject,
        text,
      });

      // Email sent successfully
      res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
      // Error sending email
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email.' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed.` });
  }
}
