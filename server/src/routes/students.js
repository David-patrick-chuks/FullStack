const express = require('express');
const router = express.Router();

const studentsCol = [];

////-- add students
router.post("/", (req, res) => {
    const { name, id, age, classId } = req.body

    if (!name || !age || !classId) {
        return res.status(400).json({
            status: false,
            message: "form field are required"
        })
    }

    if (typeof age === "number" || age <= 0) {
        return res.status(401).json({
            status: false,
            message: "age must be positive"
        })
    }

    const newStudent = {
        id: id || "STU0" + (1 + studentsCol.length),
        name,
        age,
        classId
    };


    studentsCol.push(newStudent);


    res.status(200).json({
        status: true,
        data: newStudent
    });
})
///--delete--////
router.post("/del", (req, res) => {

    const { classId } = req.body

    if (!classId) {
        return res.status(400).json({
            status: false,
            message: "form field are required"
        })
    }

    const filterStudents = studentsCol.find(student => student.classId === classId);

    if (!filterStudents) {
        return res.status(404).json({
            status: false,
            message: "student not found"
        });
    }

    const index = studentsCol.indexOf(filterStudents);
    studentsCol.splice(index, 1);
    res.status(200).json({
        status: true,
        message: `$' deleted successfully`
    });


})




///----get all students

router.get("/", (req, res) => {
    const { classId } = req.query;

    if (classId) {
        const filterStudents = studentsCol.filter(student => student.classId === classId);
        return res.status(200).json({
            status: true,
            data: filterStudents
        });
    }


    res.status(200).json({
        status: true,
        data: studentsCol
    });

})

//---get student by their id
router.get("/:id", (req, res) => {

    const { id } = req.params;

    const student = studentsCol.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            status: false,
            message: "student not found"
        })
    }
    res.status(200).json({
        status: true,
        data: student
    });
})


module.exports = router;
