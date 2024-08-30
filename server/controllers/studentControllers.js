const { Student } = require("../models/student");

//controller to get all students
const getStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({});
    res.status(200).send(allStudents);
  } catch (error) {
    console.error("ERROR:" + error);
    res.status(400).send("internal server error");
  }
};

//controller to get student by id
const getStudentById = async (req, res) => {};

//controller to add student
const addStudent = async (req, res) => {};

//controller to update student
const updateStudent = async (req, res) => {};

//controller to delete student
const deleteStudent = async (req, res) => {};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
