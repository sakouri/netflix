import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import './AddContent.css';

const AddContent = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'movie',
        release_year: new Date().getFullYear(),
        duration: '',
        image_url: '',
        category_id: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // charger les catégories
        fetch('http://localhost:3001/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => setError('Erreur lors du chargement des catégories'));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/contents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du contenu');
            }

            navigate('/content');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="md" className="add-content-container">
            <Paper elevation={3} className="add-content-paper">
                <Typography variant="h4" component="h1" gutterBottom>
                    Ajouter un nouveau contenu
                </Typography>

                {error && (
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    label="Type"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="movie">Film</MenuItem>
                                    <MenuItem value="documentary">Documentaire</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Titre"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Année de sortie"
                                name="release_year"
                                type="number"
                                value={formData.release_year}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Durée"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="2h 30min"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="URL de l'image"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Catégorie</InputLabel>
                                <Select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} className="form-actions">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="submit-button"
                            >
                                Ajouter
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/')}
                                className="cancel-button"
                            >
                                Annuler
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddContent;
