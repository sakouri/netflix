import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import './ContentList.css';

const ContentList = ({ contents }) => {
    return (
        <Grid container spacing={3}>
            {contents.map((content) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={content.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Card className="content-card content-card-hoverable" style={{ display: 'flex', flexDirection: 'column', height: '540px' }}>
                        <Link to={`/content/${content.id}`} className="content-link" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="media-wrapper">
                                <CardMedia
                                    component="img"
                                    className="media-img"
                                    image={content.image_url || 'https://via.placeholder.com/300x450'}
                                    alt={content.title}
                                />
                            </div>
                            <CardContent className="content-card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 12, paddingBottom: 8 }}>
                                <Typography gutterBottom variant="h6" component="div" className="content-title">
                                    {content.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="content-info">
                                    {content.release_year} • {content.duration}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="content-category">
                                    {content.category_name}
                                </Typography>
                            </CardContent>
                        </Link>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ContentList;
