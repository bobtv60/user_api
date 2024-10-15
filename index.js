// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Define a simple model
const Item = mongoose.model('Item', new mongoose.Schema({
    username: String,
    password: String,
    highScore: Number
}));

// Routes
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

app.delete('/items/:id', async (req, res) => {
    const itemUserName = req.params.id;

    try {
        const deletedItem = await Item.deleteOne({ username: itemUserName});
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully", deletedItem });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
