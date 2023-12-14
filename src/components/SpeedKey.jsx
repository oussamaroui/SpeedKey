import { useState, useEffect, useRef } from 'react';
import Texts from './Texts.json'
import TypingStatsChart from './TypingStatsChart';
import Accuracy from './Accuracy';

const SpeedKey = () => {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(30);
    const [totalTypedCharacters, setTotalTypedCharacters] = useState(0);
    const [level, setLevel] = useState(1);
    const buttonsLevel = ['Easy', 'Medium', 'Hard'];
    const timerIdRef = useRef();
    const inpt = useRef();
    let correctCharacters = 0;

    useEffect(() => {
        if (inpt.current.value.length > 0) {
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
            clearTimeout(timerIdRef.current);
        }
    }, [startTime]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (e.nativeEvent.inputType !== 'deleteContentBackward') {
            if (e.target.value[e.target.value.length - 1] !== ' ') {
                setTotalTypedCharacters(totalTypedCharacters + 1);
            }
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
                    if (letter != ' ') {
                        correctCharacters++
                    }
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
                    <span className={`absolute text-purple-600 font-semibold animate-blink ${!startTime ? 'hidden' : display}`}>|</span>
                    {letter}
                </span>
            );
        });

        return coloredText;
    }

    const getLevel = (lvl) => {
        setLevel(lvl);
        inpt.current.focus();
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
            <p className="text-4xl font-bold my-3 text-transparent bg-clip-text bg-gradient-to-b from-violet-800 to-purple-500 text-center">{startTime}</p>
            <p className='text-2xl text-justify m-auto mx-28 tracking-wide'>{renderColoredText()}</p>
            <div className={`flex justify-around px-10 mt-10 ${!startTime ? 'opacity-1' : 'opacity-0'} ${startTime > 3 && 'hidden'}`}>
                <TypingStatsChart typingSpeed={startTime === 0 ? calculateTypingSpeed() : 0} />
                <Accuracy accuracy={startTime === 0 ? Math.floor(correctCharacters / totalTypedCharacters * 100) : 0} />
            </div>
            <textarea
                onChange={handleInputChange}
                className="bg-transparent outline-non resize-none text-sm opacity-1"
                autoFocus
                disabled={startTime == 0 ? true : false}
                ref={inpt}
            ></textarea>
        </section>
    );
};

export default SpeedKey;