const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

mongoose.connect(
  "mongodb+srv://unnihc369:social123@recipes.58dyt8f.mongodb.net/assign?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const employeeSchema = new mongoose.Schema({
  employee_id: Number,
  employee_name: String,
  employee_salary: Number,
  employee_age: Number,
  profile_image: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

app.use(express.json());

app.use(cors());
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employee_id: req.params.id });
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const result = await Employee.deleteOne({ employee_id: req.params.id });
    if (result.deletedCount === 1) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
