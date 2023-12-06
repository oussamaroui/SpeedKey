const SpeedKey = ({ text }) => {
    const lines = text.split(' ');

    const check = e => {
        let letterNumber = 0 ;
        while ( letterNumber < text.length ) {
            text[letterNumber] === e.target.value ? console.log('yes') : console.log('no');
            letterNumber++ ;
        }
    }

    return (
        <>
            <div className="flex gap-[0.35rem] text-xl">
                {lines.map((line, index) => (
                    <div key={index}>
                        {line.split('').map((char, charIndex) => (
                            <span key={charIndex}>{char}</span>
                        ))}
                    </div>
                ))}
            </div>
            <br />
            <input type="text" className="border-2 shadow-lg" onChange={(e) => { check(e) }} />
        </>
    );
};

export default SpeedKey

