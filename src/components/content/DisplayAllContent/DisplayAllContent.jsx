import React, { useState, useEffect } from 'react';
import { Typography, Box, Container } from '@mui/material';
import './DisplayAllContent.css';
import ContentList from '../ContentList.jsx';

const DisplayAllContent = () => {
    const [movies, setMovies] = useState([]);
    const [documentaries, setDocumentaries] = useState([]);

    useEffect(() => {
        // charger les films
        fetch('http://localhost:3001/api/contents/type/movie')
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error('Erreur lors du chargement des films:', err));

        // charger les documentaires
        fetch('http://localhost:3001/api/contents/type/documentary')
            .then(res => res.json())
            .then(data => setDocumentaries(data))
            .catch(err => console.error('Erreur lors du chargement des documentaires:', err));
    }, []);

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom className="section-title">
                    Films
                </Typography>
                <ContentList contents={movies} />

                <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }} className="section-title">
                    Documentaires
                </Typography>
                <ContentList contents={documentaries} />
            </Box>
        </Container>
    );
};

export default DisplayAllContent;
