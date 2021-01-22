import React, { useState } from 'react';
import Slider from 'react-rangeslider'
// import 'react-rangeslider/lib/index.css'

const CharacterLengthSlider = () => {
    const [sliderValue, updateValue] = useState(10);

    const handleChange = (value) => {
        updateValue(value)
    };

    return (
        <div className='rangeslider-horizontal'>
            <Slider
                min={10}
                max={100}
                value={sliderValue}
                onChange={handleChange}
            />
            <div className='value'>{sliderValue} Characters</div>
        </div>
    )
}

export default CharacterLengthSlider
