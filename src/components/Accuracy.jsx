import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Accuracy = ({ accuracy }) => {
    return (
        <div style={{ width: '100px', margin: 'auto' }}>
            <CircularProgressbar
                value={accuracy}
                text={`${accuracy}%`}
                styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: 'butt',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    textColor: '#4CAF50',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                })}
            />
        </div>
    );
};

export default Accuracy;
