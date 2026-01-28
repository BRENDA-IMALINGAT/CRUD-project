const { db } = require('../config/firebase');

let localItems = [
    { id: '1', title: 'Welcome Item', description: 'This is a sample item served from Node.js (In-Memory). Add valid Firebase credentials to persist data to Firestore.', createdAt: new Date().toISOString() }
];

const getCollection = () => db.collection('items');

exports.getItems = async (req, res) => {
    try {
        if (db) {
            const snapshot = await getCollection().orderBy('createdAt', 'desc').get();
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.json(items);
        }
        return res.json(localItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const newItem = { title, description, createdAt: new Date().toISOString() };

        if (db) {
            const docRef = await getCollection().add(newItem);
            return res.status(201).json({ id: docRef.id, ...newItem });
        }

        const id = Date.now().toString();
        const localItem = { id, ...newItem };
        localItems.unshift(localItem);
        return res.status(201).json(localItem);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (db) {
            await getCollection().doc(id).update({ title, description });
            return res.json({ id, title, description });
        }

        const index = localItems.findIndex(i => i.id === id);
        if (index !== -1) {
            localItems[index] = { ...localItems[index], title, description };
            return res.json(localItems[index]);
        }
        return res.status(404).json({ error: 'Item not found' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (db) {
            await getCollection().doc(id).delete();
            return res.json({ message: 'Item deleted' });
        }

        const initialLength = localItems.length;
        localItems = localItems.filter(i => i.id !== id);

        if (localItems.length === initialLength) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.json({ message: 'Item deleted' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
