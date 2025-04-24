import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import './EditContent.css';

const EditContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'movie',
        release_year: new Date().getFullYear(),
        duration: '',
        image_url: '',
        category_id: ''
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Charger les catégories
        fetch('http://localhost:3001/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => setError('Erreur lors du chargement des catégories'));

        // Charger les données du contenu
        fetch(`http://localhost:3001/api/contents/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    title: data.title,
                    description: data.description,
                    type: data.type,
                    release_year: data.release_year,
                    duration: data.duration,
                    image_url: data.image_url,
                    category_id: data.category_id
                });
            })
            .catch(err => setError('Erreur lors du chargement du contenu'));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/contents/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la mise à jour');
            }

            navigate('/content');
        } catch (err) {
            setError(err.message);
            console.error('Erreur lors de la mise à jour:', err);
        }
    };

    return (
        <Container maxWidth="md" className="edit-content-container">
            <Paper elevation={3} className="edit-content-paper">
                <Typography variant="h4" gutterBottom>
                    Modifier le contenu
                </Typography>

                {error && (
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
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

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="movie">Film</MenuItem>
                                    <MenuItem value="documentary">Documentaire</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
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

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Durée"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
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

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Mettre à jour
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EditContent;
