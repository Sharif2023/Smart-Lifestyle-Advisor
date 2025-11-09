import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Tips({ tips }) {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        }, 5000); // Change tip every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, tips.length]);

    const nextTip = () => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        setIsAutoPlaying(false);
    };

    const prevTip = () => {
        setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
        setIsAutoPlaying(false);
    };

    const goToTip = (index) => {
        setCurrentTipIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Health & Wellness Tips
                </h2>
            }
        >
            <Head title="Health Tips" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Carousel */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-8">
                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4">{tips[currentTipIndex].icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {tips[currentTipIndex].title}
                                </h3>
                                <p className="text-lg text-gray-600">
                                    {tips[currentTipIndex].content}
                                </p>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-8">
                                <button
                                    onClick={prevTip}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    ← Previous
                                </button>

                                {/* Dots Indicator */}
                                <div className="flex space-x-2">
                                    {tips.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToTip(index)}
                                            className={`w-3 h-3 rounded-full transition ${
                                                index === currentTipIndex
                                                    ? 'bg-indigo-600'
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextTip}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Next →
                                </button>
                            </div>

                            {/* Auto-play toggle */}
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    {isAutoPlaying ? '⏸ Pause' : '▶ Play'} Auto-rotation
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* All Tips Grid */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">All Health Tips</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tips.map((tip, index) => (
                                <div
                                    key={index}
                                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-md transition"
                                >
                                    <div className="flex items-start">
                                        <div className="text-4xl mr-4">{tip.icon}</div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                {tip.title}
                                            </h4>
                                            <p className="text-gray-600">{tip.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


