import React, { useState, useEffect } from 'react';

interface Slide {
    image: string;
    text: string;
}

const slides: Slide[] = [
    { image: '/imagenes/1.jpg', text: 'Seed Indumentaria Deportiva' },
    { image: '/imagenes/2.jpg', text: 'Coleccion de Futbol' },
    { image: '/imagenes/3.jpg', text: 'Coleccion de Basket' },
    { image: '/imagenes/4.jpg', text: 'Coleccion de Gimnasio' },
    { image: '/imagenes/5.jpg', text: '25% descuento en transferencias' },
];

const autoPlayInterval = 3000;

const Carrousell: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex === slides.length - 1 ? 0 : prevIndex + 1);
        }, autoPlayInterval);
        return () => clearInterval(interval);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? slides.length - 1 : prevIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === slides.length - 1 ? 0 : prevIndex + 1);
    };

    return (
        <main className="relative bg-black flex items-center justify-center py-2 px-8 sm:p-20 overflow-hidden">
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white cursor-pointer text-2xl transition-colors hover:bg-white/40 rounded-full h-10 w-10 z-10"
                onClick={goToPrevious}
            >
                &#8249;
            </button>
            <div className="w-full flex items-center justify-center overflow-hidden">
                <div
                    className="transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        display: 'flex',
                        width: `${slides.length * 100}%`
                    }}
                >
                    {slides.map((slide, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-full flex flex-col items-center"
                            style={{ width: '100%' }}
                        >
                            <img
                                src={slide.image}
                                alt={`Slide ${idx + 1}`}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                            <div className="text-white text-xl font-semibold mt-4 text-center drop-shadow-lg">
                                {slide.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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