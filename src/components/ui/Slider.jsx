import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import './ui.css';

const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1, ...props }) => (
    <SliderPrimitive.Root
        className="SliderRoot"
        defaultValue={[min]}
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        {...props}
    >
        <SliderPrimitive.Track className="SliderTrack">
            <SliderPrimitive.Range className="SliderRange" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="SliderThumb" aria-label="Volume" />
    </SliderPrimitive.Root>
);

export default Slider;
