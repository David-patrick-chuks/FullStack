const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//-----Routes-----\\
const students = require("./routes/students");
const classes = require("./routes/classes");

const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use("/students", students);
app.use("/classes", classes);

app.get('/' , (req , res)=>{
   res.send('hello from chuks server :)')

})


app.post('/create', (req, res) => {
    const { id, userName, name, password } = req.body;

    const user = {
        id,
        userName,
        name,
        password,
    }

    res.status(200).send({
        user
    })

});



module.exports = app;