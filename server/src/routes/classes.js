const express = require('express');
const router = express.Router();

const classesCol = [];

////-- add classes
router.post("/", (req, res) => {
    const { name, id, classId, teacher } = req.body

    if (!name || !classId || !teacher) {

        return res.status(400).json({
            status: false,
            message: "form field are required"
        })
    }


    const newClass = {
        id: id || "CLA0" + (1 + studentsCol.length),
        name,
        teacher,
        classId,
    };


    classesCol.push(newClass);


    res.status(200).json({
        status: true,
        data: newClass
    });
})

///----get all classes
router.get("/", (req, res) => {

    res.status(200).json({
        status: true,
        data: classesCol

    });

})

///---get by class id

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const getClass = classesCol.find(getClass => getClass.id === id);

    if (!getClass) {

        return res.status(404).json({
            status: false,
            message: "class not found"
        })
    }
    res.status(200).json({
        status: true,
        data: getClass
    });
})


module.exports = router;
