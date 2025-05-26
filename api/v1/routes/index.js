const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Events routes
router.get('/events', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'Sample Event 1',
            description: 'This is a sample event description',
            date: new Date('2024-05-01'),
            location: 'New York',
            price: 29.99
        },
        {
            id: 2,
            title: 'Sample Event 2',
            description: 'Another sample event description',
            date: new Date('2024-05-15'),
            location: 'Los Angeles',
            price: 39.99
        }
    ]);
});

// Auth routes
router.post('/auth/login', (req, res) => {
    res.json({ token: 'sample-token', user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' } });
});

router.get('/auth/me', (req, res) => {
    res.json({ id: 1, name: 'Test User', email: 'test@example.com', role: 'user' });
});

module.exports = router; 