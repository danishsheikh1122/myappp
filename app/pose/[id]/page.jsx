'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const PoseDetails = () => {
    const searchParams = useSearchParams();
    const sanskrit_name = searchParams.get('sanskrit_name');
    const url_svg = searchParams.get('url_svg');
    const pose_description = searchParams.get('pose_description');

    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]);

    useEffect(() => {
        let timer;
        if (isRecording) {
            timer = setInterval(() => {
                setRecordingTime((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= 30) {
                        stopRecording();
                        setIsNextEnabled(true);
                    }
                    return newTime;
                });
            }, 1000);
        } else if (!isRecording && recordingTime !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRecording]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6 w-full">
            <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl ">

                {/* Pose Details Section */}
                <div className="flex-1 text-center lg:text-left px-6">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-6">{sanskrit_name}</h2>
                    {url_svg && (
                        <img
                            src={url_svg}
                            alt={sanskrit_name}
                            className="mx-auto lg:mx-0 mb-6 w-3/4 lg:w-full max-w-md rounded-lg shadow-md"
                        />
                    )}
                    <p className="text-gray-600 leading-relaxed text-lg">{pose_description}</p>
                </div>

                {/* Video Recording Section */}
                <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-inner w-full max-w-md">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Record Your Pose</h3>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-60 bg-black rounded-md shadow-lg mb-4"
                    ></video>

                    <div className="flex items-center justify-between w-full mb-4">
                        <button
                            onClick={startRecording}
                            disabled={isRecording}
                            className={`px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg transition duration-200 w-1/2 ${isRecording ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                        >
                            {isRecording ? "Recording..." : "Start Recording"}
                        </button>
                        <span className="text-gray-700 font-medium">Time: {recordingTime}s / 30s</span>
                    </div>

                    <button
                        disabled={!isNextEnabled}
                        className={`w-full py-2 font-bold text-white rounded-lg transition duration-200 ${isNextEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PoseDetails;
