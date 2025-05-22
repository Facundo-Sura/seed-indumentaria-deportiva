import React, { useState, useEffect } from 'react';

const Carrousell: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Imágenes predefinidas para el carrusel
    const images = [
        '/imagenes/promo.jpg',
        '/imagenes/ubi.jpg',
        '/imagenes/cole.jpg'
    ];

    const autoPlayInterval = 3000;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
        }, autoPlayInterval);
        return () => clearInterval(interval);
    }, [images.length])

    const gotToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    }

    return (
        <main className='bg-black grid grid-rows-[1fr] items-center justify-items-center p-8 gap-16 sm:p-20'>
            <button className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white cursor-pointer text-2xl transition-colors hover:bg-white/40 rounded-full h-10 w-10 z-10'
                onClick={goToPrevious}
            >
                &#8249;
            </button>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="relative w-fit h-96 object-cover"
            />
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white cursor-pointer text-2xl transition-colors hover:bg-white/40 rounded-full h-10 w-10 z-10"
                onClick={goToNext}
            >
                &#8250;
            </button>
        </main>
    );
};

export default Carrousell;