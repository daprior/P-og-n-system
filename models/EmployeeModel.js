import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    udfyldtaf: {
      type: String,
      required: false,
      trim: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    company: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    username: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    newPhoneNumber: {
      type: String,
      required: false,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: false,
      trim: true,
    },
    department: {
      type: [String], // Since department is a multiselect field
      required: false,
    },
    position: {
      type: [String], // Since position is a multiselect field
      required: false,
    },
    checkboxes1: {
      type: [String], // Since position is a multiselect field
      required: false,
    },
    checkboxes2: {
      type: [String], // Since position is a multiselect field
      required: false,
    },
    newPhoneType: {
      type: String,
      required: false,
      trim: true,
    },
    message: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.EmployeeModel ||
  mongoose.model("EmployeeModel", EmployeeSchema, "employees");
