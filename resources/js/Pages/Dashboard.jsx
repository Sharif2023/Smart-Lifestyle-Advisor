import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ user, todayRecord, recentRecords, chartData, stats }) {
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'bg-green-100';
        if (score >= 60) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                    <Link href={route('daily-input.create')}>
                        <PrimaryButton>
                            Add Today's Data
                        </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Today's Score Card */}
                    {todayRecord ? (
                        <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Lifestyle Score</h3>
                                        <div className="flex items-baseline">
                                            <span className={`text-5xl font-bold ${getScoreColor(todayRecord.lifestyle_score)}`}>
                                                {todayRecord.lifestyle_score?.toFixed(0)}
                                            </span>
                                            <span className="text-2xl text-gray-500 ml-2">/ 100</span>
                                        </div>
                                    </div>
                                    <div className={`px-6 py-4 rounded-lg ${getScoreBgColor(todayRecord.lifestyle_score)}`}>
                                        <div className="text-sm text-gray-600 mb-2">Status</div>
                                        <div className={`text-xl font-semibold ${getScoreColor(todayRecord.lifestyle_score)}`}>
                                            {todayRecord.lifestyle_score >= 80 ? 'Excellent' : 
                                             todayRecord.lifestyle_score >= 60 ? 'Good' : 'Needs Improvement'}
                                        </div>
                                    </div>
                                </div>
                                {todayRecord.advice && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm font-medium text-blue-900">💡 Smart Advice:</p>
                                        <p className="text-sm text-blue-800 mt-1">{todayRecord.advice}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <p className="text-yellow-800">
                                No data recorded for today. <Link href={route('daily-input.create')} className="font-semibold underline">Add your daily data</Link> to see your lifestyle score!
                            </p>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                        <span className="text-2xl">💤</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Avg Sleep</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.avgSleep}h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                        <span className="text-2xl">🏃</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Avg Exercise</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.avgExercise}m</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                                        <span className="text-2xl">💧</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Avg Water</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.avgWater}L</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Avg Score</p>
                                        <p className="text-2xl font-semibold text-gray-900">{stats.avgScore}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    {chartData && chartData.length > 0 ? (
                        <div className="space-y-8">
                            {/* Lifestyle Score Chart */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Score Trend (Last 7 Days)</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Legend />
                                            <Area type="monotone" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Sleep and Exercise Chart */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sleep & Exercise (Last 7 Days)</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis yAxisId="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip />
                                            <Legend />
                                            <Line yAxisId="left" type="monotone" dataKey="sleep" stroke="#3b82f6" name="Sleep (hours)" />
                                            <Line yAxisId="right" type="monotone" dataKey="exercise" stroke="#10b981" name="Exercise (minutes)" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Water Intake Chart */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Intake (Last 7 Days)</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="water" fill="#8b5cf6" name="Water (liters)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <p className="text-gray-600">
                                No data available yet. Start tracking your lifestyle to see charts and analytics!
                            </p>
                            <Link href={route('daily-input.create')} className="mt-4 inline-block">
                                <PrimaryButton>Add Your First Entry</PrimaryButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
