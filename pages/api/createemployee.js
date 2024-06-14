import dbConnect from '/utils/db';
import EmployeeModel from '/models/EmployeeModel';

export default async function addEmployee(req, res) {
  const employeeData = req.body;

  try {
    await dbConnect(); // Ensure database connection is established

    // Create a new employee in the database
    const result = await EmployeeModel.create(employeeData);

    // Log success
    console.log('Employee created successfully:', result);

    // Send response to client
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    // Log error
    console.error('Error creating employee:', error);

    // Send detailed error response to client
    res.status(500).json({ success: false, error: 'An error occurred while creating the employee.', message: error.message });
  }
}
