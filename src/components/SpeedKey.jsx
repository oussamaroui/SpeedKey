import { useState, useEffect, useRef } from 'react';
import Texts from './Texts.json'

const SpeedKey = () => {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(15);
    const [showResult, setShowResult] = useState(false);
    const [level, setLevel] = useState(1);
    const [correctCaracters, setCorrectCaracters] = useState(0);
    const [totalTypedCharacters, setTotalTypedCharacters] = useState(0);
    const buttonsLevel = ['Easy', 'Medium', 'Hard'];
    const timerIdRef = useRef();
    const inpt = useRef();

    useEffect(() => {

        if (inpt.current.value != '') {
            timerIdRef.current = setTimeout(() => {
                setStartTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => {
                clearTimeout(timerIdRef.current);
            };
        }

    }, [inpt.current, startTime]);

    useEffect(() => {
        if (startTime === 0) {
            setShowResult(true);
            clearTimeout(timerIdRef.current);
        }
    }, [startTime]);

    const handleInputChange = (e) => {
        setInput(e.target.value);

        if (e.target.value[e.target.value.length - 1] !== ' ') {
            setTotalTypedCharacters(totalTypedCharacters + 1)
            console.log(totalTypedCharacters);
        }        
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
            let color = 'text-gray-400';
            let display = 'hidden';

            if (index < userInputArray.length) {
                if (userInputArray[index] === letter) {
                    color = 'text-green-600';
                    // setCorrectCaracters(correctCaracters + 1) ///////////////////
                    // console.log(correctCaracters);
                } else {
                    color = 'text-red-500';
                }
            }

            if (index === userInputArray.length) {
                if (userInputArray[index] === letter) {
                    display = 'inline';
                } else {
                    display = 'inline';
                }
            }

            return (
                <span key={index} className={color}>
                    <span className={`absolute text-purple-600 font-semibold animate-blink ${startTime == 0 ? 'hidden' : display}`}>|</span>
                    {letter}
                </span>
            );
        });

        return coloredText;
    }

    const getLevel = (l) => {
        setLevel(l)
    }

    return (
        <section className="min-h-screen bg-gray-900 py-6 ">
            <h1 className="text-center text-4xl font-bold text-white">Typing Speed Test</h1>
            <div className='flex justify-around bg-gray-600 text-white w-56 mx-auto my-8 rounded'>
                {buttonsLevel.map((btnLevel, index) => (
                    <p key={index} onClick={() => getLevel(index)}
                        className={`py-2 flex-1 text-center px-2 m-[0.16rem] rounded font-semibold ${level == index && 'bg-gradient-to-r from-violet-950 to-purple-900'} cursor-pointer`}>
                        {btnLevel}
                    </p>
                ))}
            </div>
            <p className="text-4xl font-bold my-3 text-transparent bg-clip-text bg-gradient-to-b from-violet-800 to-purple-500 ml-8">{startTime}</p>
            <p className='text-2xl text-justify m-auto mx-12 tracking-wide'>{renderColoredText()}</p>
            {showResult && (
                <div className="mt-5">
                    <p className="text-2xl text-white font-bold">
                        Your Typing Speed is: {calculateTypingSpeed()} wpm
                    </p>
                </div>
            )}
            <textarea
                onChange={handleInputChange}
                className="bg-transparent outline-none resize-none text-sm opacity-0"
                autoFocus
                disabled={startTime == 0 ? true : false}
                ref={inpt}
            ></textarea>
        </section>
    );
};

export default SpeedKey;