import { useState, useEffect, useRef } from 'react';

const SpeedKey = () => {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(15);
    const [showResult, setShowResult] = useState(false);
    const targetText =
        'Any fool can write code that a computer can understand, Good programmers write code that humans can understand. Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program. There is always one more bug to fix';
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
            .filter((word, index) => word === targetText.split(/\s+/)[index]);

        const typingSpeed = Math.round((correctWords.length / 30) * 60);
        return typingSpeed;
    };

    const renderColoredText = () => {
        const targetTextArray = targetText.split('');
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


    return (
        <div>
            <h1>Typing Speed Test</h1>
            <p>{startTime}</p>
            <p className='absolute top-20 left-0 opacity-50'>{targetText}</p>
            <p className='absolute top-20 left-0'>{renderColoredText()}</p>
            <textarea
                rows="5"
                cols="50"
                value={input}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                disabled={showResult}
                className='opacity-0'
                autoFocus
            />
            {showResult && (
                <div>
                    <p>Typing Speed: {calculateTypingSpeed()} words per minute</p>
                </div>
            )}
        </div>
    );
};

export default SpeedKey;
