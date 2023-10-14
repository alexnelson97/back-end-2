const express = require("express");
const cors = require("cors");
const app = express();
const port = 4004;
const controller = require("./controller");

app.use(cors());
app.use(express.json());

app.get("/houses", (req, res) => {
  const houses = controller.getHouses();
  res.json(houses);
});

app.post("/houses", (req, res) => {
  const { address, price, imageUrl } = req.body;
  if (!address || !price || !imageUrl) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newHouse = controller.createHouse(address, price, imageUrl);
  res.status(201).json(newHouse);
});

app.put("/houses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { newPrice } = req.body;
  if (!newPrice) {
    return res.status(400).json({ error: "Missing newPrice field" });
  }

  const updatedHouse = controller.updateHouse(id, newPrice);
  if (!updatedHouse) {
    return res.status(404).json({ error: "House not found" });
  }

  res.json(updatedHouse);
});

app.delete("/houses/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const houseDeleted = controller.deleteHouse(id);
  if (!houseDeleted) {
    return res.status(404).json({ error: "House not found" });
  }

  res.json({ message: "House deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
