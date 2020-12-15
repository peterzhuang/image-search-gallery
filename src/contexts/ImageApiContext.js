import React, {useState, createContext } from 'react';

export const ImageApiContext = createContext();

export const ImageApiProvider = (props) => {
    const [images, setImages] = useState([]);

    return (
        <ImageApiContext.Provider value={[images, setImages]}>
            {props.children}
        </ImageApiContext.Provider>
    );
}