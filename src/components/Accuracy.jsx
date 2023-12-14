import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Accuracy = ({ accuracy }) => {
    return (
        <div style={{ width: '180px', margin: 'auto' }}>
            <CircularProgressbar
                value={accuracy}
                text={`${accuracy}%`}
                styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: 'butt',
                    textSize: '16px',
                    pathTransitionDuration: 3,
                    textColor: '#ffffff',
                    trailColor: '#00000050',
                    pathColor: '#6d28d9',
                })}
            />
        </div>
    );
};

export default Accuracy;