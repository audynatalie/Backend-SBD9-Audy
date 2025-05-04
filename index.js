const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', require(`./src/routes/todo.route`));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
