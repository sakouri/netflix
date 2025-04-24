import 'dotenv/config';
import express from "express";
import cors from "cors";
import contentRoutes from './routes/contentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contents', contentRoutes);
app.use('/api/categories', categoryRoutes);

// Route de test
app.get('/', async (req, res) => {
    res.json({ message: "Connexion à la BDD: OK" });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
