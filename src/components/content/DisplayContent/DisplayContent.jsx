import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './DisplayContent.css';

const DisplayContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/api/contents/${id}`)
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => setError('Erreur lors du chargement du contenu'));
    }, [id]);

    const handleEdit = () => {
        navigate(`/content/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/contents/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression');
                }

                navigate('/content');
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    if (!content) {
        return (
            <Container>
                <Typography>Chargement...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" className="content-detail-container">
            <Paper elevation={3} className="content-detail-paper">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <img
                            src={content.image_url}
                            alt={content.title}
                            className="content-image"
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <div className="content-header">
                            <Typography variant="h4" component="h1">
                                {content.title}
                            </Typography>
                            <div className="content-actions">
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={handleEdit}
                                    variant="outlined"
                                    className="edit-button"
                                >
                                    Modifier
                                </Button>
                                <Button
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDelete}
                                    variant="outlined"
                                    color="error"
                                    className="delete-button"
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </div>

                        <Typography variant="subtitle1" gutterBottom>
                            {content.type === 'movie' ? 'Film' : 'Documentaire'} • {content.release_year} • {content.duration}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {content.description}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>
                            Catégorie: {content.category_name}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default DisplayContent;
