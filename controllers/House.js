const House = require('../model/house');

// Create and Save a new house
exports.create = async (req, res) => {
    const { houseName, location, description, photo, pricePerNight, facilities, capacity, size, view, houseRules } = req.body;

    if (!houseName || !location || !description || !photo || !pricePerNight || !facilities || !capacity || !size || !view || !houseRules) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    
    const house = new House({
        houseName,
        location,
        description,
        photo,
        pricePerNight,
        facilities,
        capacity,
        size,
        view,
        houseRules
    });
    
    await house.save().then(data => {
        res.send({
            message:"Yurt created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating yurt"
        });
    });
};

// Retrieve all houses from the database.
exports.findAll = async (req, res) => {
    try {
        let query = {};
        if (req.query.location) {
            query.location = req.query.location;
        }
        const houses = await House.find(query);
        res.status(200).json(houses);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single House with an id
exports.findOne = async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }
        res.status(200).json(house);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a house by the id in the request
exports.update = async (req, res) => {
    const { houseName, description, photos, pricePerNight, amenities, houseRules } = req.body;

    if (!houseName || !description || !photos || !pricePerNight || !amenities || !houseRules) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHouse) {
            return res.status(404).json({ message: "House not found" });
        }
        res.status(200).json(updatedHouse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a house with the specified id in the request
exports.destroy = async (req, res) => {
    try {
        const deletedHouse = await House.findByIdAndDelete(req.params.id);
        if (!deletedHouse) {
            return res.status(404).json({ message: "House not found" });
        }
        res.status(200).json({ message: "House deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
