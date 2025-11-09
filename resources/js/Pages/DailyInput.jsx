import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function DailyInput({ todayRecord, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        sleep_hours: todayRecord?.sleep_hours?.toString() || '',
        water_intake_liters: todayRecord?.water_intake_liters?.toString() || '',
        exercise_minutes: todayRecord?.exercise_minutes?.toString() || '',
        stress_level: todayRecord?.stress_level?.toString() || '5',
        screen_time_hours: todayRecord?.screen_time_hours?.toString() || '',
        calories_consumed: todayRecord?.calories_consumed?.toString() || '',
        steps: todayRecord?.steps?.toString() || '',
        diet_quality: todayRecord?.diet_quality || '',
        record_date: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('daily-input.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Daily Lifestyle Input
                </h2>
            }
        >
            <Head title="Daily Input" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Sleep Hours */}
                                <div>
                                    <InputLabel htmlFor="sleep_hours" value="Sleep Hours (Last Night)" />
                                    <TextInput
                                        id="sleep_hours"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="24"
                                        name="sleep_hours"
                                        value={data.sleep_hours}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('sleep_hours', e.target.value)}
                                        placeholder="e.g., 7.5"
                                    />
                                    <InputError message={errors.sleep_hours} className="mt-2" />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Recommended: 7-9 hours for adults
                                    </p>
                                </div>

                                {/* Water Intake */}
                                <div>
                                    <InputLabel htmlFor="water_intake_liters" value="Water Intake (Liters)" />
                                    <TextInput
                                        id="water_intake_liters"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        name="water_intake_liters"
                                        value={data.water_intake_liters}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('water_intake_liters', e.target.value)}
                                        placeholder="e.g., 2.5"
                                    />
                                    <InputError message={errors.water_intake_liters} className="mt-2" />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Recommended: 2-3 liters daily
                                    </p>
                                </div>

                                {/* Exercise Minutes */}
                                <div>
                                    <InputLabel htmlFor="exercise_minutes" value="Exercise (Minutes)" />
                                    <TextInput
                                        id="exercise_minutes"
                                        type="number"
                                        min="0"
                                        max="1440"
                                        name="exercise_minutes"
                                        value={data.exercise_minutes}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('exercise_minutes', e.target.value)}
                                        placeholder="e.g., 30"
                                    />
                                    <InputError message={errors.exercise_minutes} className="mt-2" />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Recommended: At least 30 minutes of moderate activity
                                    </p>
                                </div>

                                {/* Stress Level */}
                                <div>
                                    <InputLabel htmlFor="stress_level" value="Stress Level (1-10)" />
                                    <input
                                        id="stress_level"
                                        type="range"
                                        min="1"
                                        max="10"
                                        name="stress_level"
                                        value={data.stress_level}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('stress_level', e.target.value)}
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Low (1)</span>
                                        <span className="font-semibold text-gray-700">Current: {data.stress_level}</span>
                                        <span>High (10)</span>
                                    </div>
                                    <InputError message={errors.stress_level} className="mt-2" />
                                </div>

                                {/* Screen Time */}
                                <div>
                                    <InputLabel htmlFor="screen_time_hours" value="Screen Time (Hours)" />
                                    <TextInput
                                        id="screen_time_hours"
                                        type="number"
                                        min="0"
                                        max="24"
                                        name="screen_time_hours"
                                        value={data.screen_time_hours}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('screen_time_hours', e.target.value)}
                                        placeholder="e.g., 6"
                                    />
                                    <InputError message={errors.screen_time_hours} className="mt-2" />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Total hours spent on screens today
                                    </p>
                                </div>

                                {/* Optional Fields */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Optional Fields</h3>

                                    {/* Calories */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="calories_consumed" value="Calories Consumed" />
                                        <TextInput
                                            id="calories_consumed"
                                            type="number"
                                            min="0"
                                            max="10000"
                                            name="calories_consumed"
                                            value={data.calories_consumed}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('calories_consumed', e.target.value)}
                                            placeholder="e.g., 2000"
                                        />
                                        <InputError message={errors.calories_consumed} className="mt-2" />
                                    </div>

                                    {/* Steps */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="steps" value="Steps" />
                                        <TextInput
                                            id="steps"
                                            type="number"
                                            min="0"
                                            max="100000"
                                            name="steps"
                                            value={data.steps}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('steps', e.target.value)}
                                            placeholder="e.g., 10000"
                                        />
                                        <InputError message={errors.steps} className="mt-2" />
                                    </div>

                                    {/* Diet Quality */}
                                    <div>
                                        <InputLabel htmlFor="diet_quality" value="Diet Quality" />
                                        <select
                                            id="diet_quality"
                                            name="diet_quality"
                                            value={data.diet_quality}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            onChange={(e) => setData('diet_quality', e.target.value)}
                                        >
                                            <option value="">Select diet quality</option>
                                            <option value="poor">Poor</option>
                                            <option value="fair">Fair</option>
                                            <option value="good">Good</option>
                                            <option value="excellent">Excellent</option>
                                        </select>
                                        <InputError message={errors.diet_quality} className="mt-2" />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end">
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Saving...' : todayRecord ? 'Update Today\'s Data' : 'Save Today\'s Data'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


