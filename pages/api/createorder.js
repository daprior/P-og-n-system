import dbConnect from '/utils/db';
import OrderModel from '/models/OrderModel';

export default async function addOrder(req, res) {
  const orderData = req.body;

  try {
    await dbConnect();

    const result = await OrderModel.create(orderData);

    // Log success
    console.log('Order created successfully:', result);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    // Log error
    console.error('Error creating employee:', error);

    // Send detailed error response to client
    res.status(500).json({ success: false, error: 'An error occurred while creating the employee.', message: error.message });
  }
}
