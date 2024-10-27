import Link from 'next/link';
import React from 'react';
import { Cards } from './Cards';

const Hero = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full overflow-hidden">

            {/* Main Content */}
            <main className="flex justify-center items-center flex-col px-6">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-6xl font-bold text-gray-800 leading-tight">
                            Fitness &<br />Welness Training
                        </h1>
                        <p className="mt-4 text-gray-600">
                            Strong is the simplest, most intuitive workout tracking experience. Trusted by over 3 million users worldwide.
                        </p>
                        <Link href={'/user-dashboard'}><button className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold">
                            Get Started
                        </button></Link>
                    </div>
                    <div className="md:w-[28rem] mt-10 md:mt-0 ml-20">
                        <img
                            src="/assest/shiva.png"
                            alt="Person exercising with dumbbells"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mt-16 flex justify-around text-center">
                    <Statistic value="3.2k" label="Happy User" />
                    <Statistic value="350k" label="Running Track" />
                    <Statistic value="100+" label="Workout Type" />
                </div>
            </main>
            <Cards/>
        </div>
    );
};

const Statistic = ({ value, label }) => (
    <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-gray-600">{label}</p>
    </div>
);

export default Hero;