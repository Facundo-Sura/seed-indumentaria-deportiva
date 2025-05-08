import React, { useState, useEffect } from 'react';

interface CarrousellProps {
    images: string[];
    autoPlayInterval?: number;
}
const Carrousell: React.FC<CarrousellProps> = ({ images, autoPlayInterval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
        }, autoPlayInterval);
        return () => clearInterval(interval);
    }, [autoPlayInterval, images.length])

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
        <div className='relative w-full mb-24 mx-auto overflow-hidden'>
            <button className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-4 cursor-pointer text-2xl transition-colors hover:bg-black/80 z-10'
                onClick={goToPrevious}
            >
                &#8249;
            </button>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover"
            />
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-4 cursor-pointer text-2xl transition-colors hover:bg-black/80 z-10"
                onClick={goToNext}
            >
                &#8250;
            </button>
        </div>
    );
};

export default Carrousell;