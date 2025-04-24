import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DisplayAllContent from './DisplayAllContent/DisplayAllContent.jsx';
import DisplayContent from './DisplayContent/DisplayContent.jsx';
import AddContent from './AddContent/AddContent.jsx';
import EditContent from './EditContent/EditContent.jsx';

const Content = () => {
    return (
        <Routes>
            <Route path="/" element={<DisplayAllContent />} />
            <Route path="/:id" element={<DisplayContent />} />
            <Route path="/add" element={<AddContent />} />
            <Route path="/edit/:id" element={<EditContent />} />
        </Routes>
    );
};

export default Content;
