import { useState, useEffect, useRef } from 'react';
import Texts from './Texts.json'

const SpeedKey = () => {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(15);
    const [showResult, setShowResult] = useState(false);
    const [level, setLevel] = useState(1);
    const buttonsLevel = ['Easy', 'Medium', 'Hard'];
    const timerIdRef = useRef();

    useEffect(() => {
        timerIdRef.current = setTimeout(() => {
            setStartTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
            clearTimeout(timerIdRef.current);
        };
    }, [startTime]);

    useEffect(() => {
        if (startTime === 0) {
            setShowResult(true);
            clearTimeout(timerIdRef.current);
        }
    }, [startTime]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const calculateTypingSpeed = () => {
        const correctWords = input
            .trim()
            .split(/\s+/)
            .filter((word, index) => word === Texts[level].split(/\s+/)[index]);

        const typingSpeed = Math.round((correctWords.length / 30) * 60);
        return typingSpeed;
    };

    const renderColoredText = () => {
        const targetTextArray = Texts[level].split('');
        const userInputArray = input.split('');

        const coloredText = targetTextArray.map((letter, index) => {
            let color = 'text-gray-500';

            if (index < userInputArray.length) {
                if (userInputArray[index] === letter) {
                    color = 'text-green-600';
                } else {
                    color = 'text-red-500';
                }
            }

            return (
                <span key={index} className={color}>
                    {letter}
                </span>
            );
        });

        return <span>{coloredText}</span>;
    };

    const getLevel = (l) => {
        setLevel(l)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-center text-4xl font-bold mb-5">Typing Speed Test</h1>
                    <p className="text-center text-4xl font-bold mb-5">{startTime}</p>
                    <div className='flex bg-slate-600 w-auto'>
                        {buttonsLevel.map((btnLevel, index) => (
                            <p key={index} onClick={() => getLevel(index)}
                                className={`py-1 px-2 m-[0.20rem] rounded ${level == index && 'bg-slate-400'} cursor-pointer`}>
                                {btnLevel}
                            </p>
                        ))}
                    </div>
                    <p className='absolute top-20 left-0 opacity-50'>{Texts[level]}</p>
                    <p className='absolute top-20 left-0'>{renderColoredText()}</p>
                    <textarea
                        onChange={handleInputChange}
                        className="w-full h-[300px] bg-transparent outline-none resize-none text-xl mt-5"
                        placeholder="Start typing here..."
                    ></textarea>
                    {showResult && (
                        <div className="mt-5">
                            <p className="text-2xl font-bold">
                                Your Typing Speed is: {calculateTypingSpeed()} wpm
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpeedKey;