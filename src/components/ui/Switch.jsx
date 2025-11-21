import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import './ui.css';

const Switch = ({ checked, onCheckedChange, id, ...props }) => (
    <SwitchPrimitive.Root
        className="SwitchRoot"
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        {...props}
    >
        <SwitchPrimitive.Thumb className="SwitchThumb" />
    </SwitchPrimitive.Root>
);

export default Switch;
