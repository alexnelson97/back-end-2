let houses = [
  { id: 1, address: "123 Main St", price: 250000, imageURL: "image1.jpg" },
  { id: 2, address: "456 Elm St", price: 300000, imageURL: "image2.jpg" },
  { id: 3, address: "789 Oak St", price: 350000, imageURL: "image3.jpg" },
];

let nextHouseId = 4;

function getHouses(req, res) {
  res.json(houses);
}

function deleteHouse(req, res) {
  const idToDelete = parseInt(req.params.id);
  const indexToDelete = houses.findIndex((house) => house.id === idToDelete);

  if (indexToDelete === -1) {
    return res.status(404).json({ error: "House not found" });
  }

  houses.splice(indexToDelete, 1);

  res.json(houses);
}

function createHouse(req, res) {
  const { address, price, imageURL } = req.body;

  if (!address || !price || !imageURL) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newHouse = {
    id: nextHouseId,
    address,
    price,
    imageURL,
  };

  houses.push(newHouse);
  nextHouseId++;

  res.status(201).json(houses);
}

function updateHouse(req, res) {
  const idToUpdate = parseInt(req.params.id);
  const type = req.body.type;

  const indexToUpdate = houses.findIndex((house) => house.id === idToUpdate);

  if (indexToUpdate === -1) {
    return res.status(404).json({ error: "House not found" });
  }

  const houseToUpdate = houses[indexToUpdate];

  if (type === "plus") {
    houseToUpdate.price += 10000;
  } else if (type === "minus") {
    houseToUpdate.price -= 10000;
  }

  res.json(houses);
}

module.exports = {
  getHouses,
  deleteHouse,
  createHouse,
  updateHouse,
};
