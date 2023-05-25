require("dotenv").config();
const { app, port } = require("./server");

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log("Connection Failed", error.message));

// Syncing all the models at once.
app.listen(port, () => {
  console.log("Port connected", port);
});
module.exports = mongoose;
