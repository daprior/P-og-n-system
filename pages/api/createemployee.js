// pages/api/addEmployee.js

import dbConnect from '/utils/db';
import EmployeeModel from '/models/EmployeeModel';
import sendEmail from '/utils/sendEmail';

export default async function addEmployee(req, res) {
  const employeeData = req.body;
  await dbConnect();

  try {
    // Create a new employee in the database
    const result = await EmployeeModel.create(employeeData);
    
    // Send email notification
    const to = 'daniel.prior@autohus.dk'; // replace with the actual recipient email
    const subject = 'New Employee Created';
    const text = `A new employee has been created:\n\nName: ${employeeData.name}\nEmail: ${employeeData.email}`;
    await sendEmail(to, subject, text);

    // Send response to client
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    // Handle error if any
    console.error('Error creating employee:', error);
    res.status(500).json({ success: false, error: 'An error occurred while creating the employee.' });
  }
}
