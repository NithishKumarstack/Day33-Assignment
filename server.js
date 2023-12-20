const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000 || 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
function generateTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

app.post('/createFile', (req, res) => {
    const timestamp = generateTimestamp();
    const fileName = `./time_file/${timestamp}.txt`;

    fs.writeFile(fileName, timestamp, 'utf8', (err) => {
        if (err) {
            return res.status(500).send(`Error creating file: ${err.message}`);
        }
        res.status(201).send({
            message: "Data has been created successfully",
        });
    });
});

app.get('/getAllFiles', (req, res) => {
   let folder = fs.readdirSync(`${__dirname}/time_file`
 )
res.status(200).send(`Files: ${folder}`)
});