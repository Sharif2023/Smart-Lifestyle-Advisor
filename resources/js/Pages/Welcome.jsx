import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Welcome - Smart Lifestyle Advisor" />
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                {/* Navigation */}
                <nav className="bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                    🌿 Smart Lifestyle Advisor
                                </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link
                                                href={route('login')}
                                                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                                            >
                                                Log in
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link
                                                href={route('register')}
                                            >
                                                <PrimaryButton>
                                                    Get Started
                                                </PrimaryButton>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Balance Your Life with
                            <span className="block mt-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Data-Driven Insights
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Get personalized lifestyle improvement suggestions based on your daily habits.
                            Track your sleep, diet, exercise, and well-being with AI-powered recommendations.
                        </p>
                        {!auth.user && (
                            <div className="flex justify-center space-x-4">
                                {canRegister && (
                                    <Link href={route('register')}>
                                        <PrimaryButton className="px-8 py-3 text-lg">
                                            Start Your Journey
                                        </PrimaryButton>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">💤</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sleep Tracking</h3>
                            <p className="text-gray-600">
                                Monitor your sleep patterns and get personalized recommendations for better rest and recovery.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🏃</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Activity Monitoring</h3>
                            <p className="text-gray-600">
                                Track your exercise, steps, and physical activity with smart suggestions to stay active.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Analytics</h3>
                            <p className="text-gray-600">
                                Visualize your progress with interactive dashboards and track your lifestyle score over time.
                            </p>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-green-600">1</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Input Your Data</h4>
                                <p className="text-gray-600 text-sm">
                                    Enter your daily habits: sleep, exercise, water intake, and more.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">2</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Get Your Score</h4>
                                <p className="text-gray-600 text-sm">
                                    Our AI calculates your lifestyle score based on health metrics.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-purple-600">3</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Receive Advice</h4>
                                <p className="text-gray-600 text-sm">
                                    Get personalized recommendations to improve your well-being.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-yellow-600">4</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
                                <p className="text-gray-600 text-sm">
                                    Monitor your improvement over time with visual analytics.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white/80 backdrop-blur-md mt-20 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                        <p>&copy; 2024 Smart Lifestyle Advisor. Built with Laravel & React.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
