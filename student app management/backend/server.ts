import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client";

//instances
const app = express();
const prisma = new PrismaClient();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to  Student management app!");

});


app.post("/students", async (req, res) => {

  const { name, roll_no, dept, age, image } = req.body;
  const student = await prisma.student.create({
    data:{
      name: name,
      roll_no: roll_no,
      dept: dept,
      age: age,
      image: image
    }
  })

  res.status(201).json({ message: "Student created successfully", student });

});


app.get("/students/getdetails", async (req, res) => {

  const students = await prisma.student.findMany();

  res.status(200).json({ message: "Students retrieved successfully", students });

});



app.listen(5000, () => {
  console.log("Server is running on https://localhost:5000");
});