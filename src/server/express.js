import express from 'express';
import bodyParser from 'body-parser';
import PouchDB from 'pouchdb';
import path from 'path';
import { fileURLToPath } from 'url';
import { BloodAlcoholCalculator } from '../client/script';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('src'));

// Initialize PouchDB
const db = new PouchDB("counters");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /**
//  * Initialize database
//  */
// const initdb = async () => {
//     try {
//         await db.get('users');
//     } catch (e) {
//         await db.put({ _id: 'users', users: [] });
//     }

//     try {
//         await db.get('drinks');
//     } catch (e) {
//         await db.put({ _id: 'drinks', drinks: [] });
//     }
// };

// initdb();

const bacCalculator = new BloodAlcoholCalculator();

/**
 * Routes
 */
app.post('/calculateBAC', async (req, res, next) => {
    try {
        const { gender, weight, drinkCount, drinkType } = req.body;

        // Set user's information in the calculator instance
        bacCalculator.setGender(gender);
        bacCalculator.setWeight(weight);
        bacCalculator.setDrinkType(drinkType);
        bacCalculator.setDrinkCount(drinkCount);
        bacCalculator.setDrinkVolume(drinkType);

        // Calculate BAC
        const bacResult = bacCalculator.calculateBAC();

        // Send the BAC result as response
        res.json({ bacResult });
    } catch (e) {
        next(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const data = await db.get('users');
        res.json(data.users);
    } catch (e) {
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { userInfo } = req.body;
        const data = await db.get('users');
        data.users.push(userInfo);
        await db.put(data);
        res.status(201).json({ message: 'User added successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to add user' });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userInfo } = req.body;
        const data = await db.get('users');
        const userIndex = data.users.findIndex(user => user._id === id);
        if (userIndex === -1) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        data.users[userIndex] = userInfo;
        await db.put(data);
        res.json({ message: 'User updated successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to update user' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await db.get('users');
        data.users = data.users.filter(user => user._id !== id);
        await db.put(data);
        res.json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
