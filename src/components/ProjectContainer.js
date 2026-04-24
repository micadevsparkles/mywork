import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProjectContainer = ({ title, textPath, imagePath, isJeans }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        // Renderiza o arquivo .txt da pasta de textos
        fetch(textPath)
            .then(res => res.text())
            .then(text => setContent(text));
    }, [textPath]);

    return (
        <motion.section 
            initial={{ x: '-100%' }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
                backgroundColor: '#121212', 
                height: '100vh', 
                display: 'flex', 
                padding: '50px' 
            }}
        >
            <div className="project-image-wrapper">
                <img src={imagePath} alt={title} style={{ borderRadius: '20px' }} />
            </div>
            <div className="project-info">
                {/* Lógica para títulos específicos (LightsBlocker ou Mundo do Jeans) */}
                <h2 style={{ color: isJeans ? '#00FF00' : '#FFF' }}>
                    {title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
            </div>
        </motion.section>
    );
};
