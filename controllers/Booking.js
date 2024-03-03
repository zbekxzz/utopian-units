const Booking = require('../model/booking');

// Create and save a new booking
exports.create = async (req, res) => {
    const { userId, houseId, checkInDate, checkOutDate, numberOfGuests, totalPrice } = req.body;

    if (!userId || !houseId || !checkInDate || !checkOutDate || !numberOfGuests || !totalPrice) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    
    const booking = new Booking({
        userId,
        houseId,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        totalPrice
    });
    
    try {
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all bookings from the database
exports.findAll = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

// Retrieve a single booking by id
exports.findById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a booking by id
exports.update = async (req, res) => {
    const { userId, houseId, checkInDate, checkOutDate, numberOfGuests, totalPrice } = req.body;

    if (!userId || !houseId || !checkInDate || !checkOutDate || !numberOfGuests || !totalPrice) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking by id
exports.delete = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
