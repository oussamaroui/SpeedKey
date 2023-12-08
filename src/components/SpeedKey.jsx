// const SpeedKey = ({ text }) => {
//     const lines = text.split(' ');

//     let letterNumber = 0;
//     const check = e => {
//         text[letterNumber] === e.target.value ? console.log('yes') : console.log('no');
//         letterNumber++;
//     }

//     return (
//         <>
//             <div className="flex gap-[0.35rem] text-xl">
//                 {lines.map((line, index) => (
//                     <div key={index}>
//                         {line.split('').map((char, charIndex) => (
//                             <span key={charIndex}>{char}</span>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//             <br />
//             <input type="text" className="border-2 shadow-lg" onChange={(e) => { check(e) }} />
//         </>
//     );
// };

// export default SpeedKey

import { useState, useEffect } from 'react';

const TypingSpeedTest = () => {
    const [text, setText] = useState('');
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const sampleText =
        'The quick brown fox jumps over the lazy dog. This is a sample text for typing speed test.';

    useEffect(() => {
        setStartTime(new Date());
    }, []);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);

        if (inputValue === sampleText) {
            setEndTime(new Date());
            setShowResult(true);
        }
    };

    const calculateTypingSpeed = () => {
        const totalTime = (endTime - startTime) / 1000; // in seconds
        const wordsTyped = input.trim().split(/\s+/).length;
        const typingSpeed = Math.round((wordsTyped / totalTime) * 60); // words per minute
        return typingSpeed;
    };

    const renderColoredText = () => {
        const correctLetters = input
            .split('')
            .map((letter, index) => (
                <span
                    key={index}
                    style={{
                        color: letter === sampleText[index] ? 'green' : 'red',
                    }}
                >
                    {letter}
                </span>
            ));

        return <span>{correctLetters}</span>;
    };

    return (
        <div>
            <h1>Typing Speed Test</h1>
            <p className='absolute'>{sampleText}</p>
            <p className='relative'>{renderColoredText()}</p>
            <textarea
                rows="5"
                cols="50"
                value={input}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                disabled={showResult}
            />
            {showResult && (
                <div>
                    <p>
                        Typing Speed: {calculateTypingSpeed()} words per minute
                    </p>
                </div>
            )}
        </div>
    );
};

export default TypingSpeedTest;
