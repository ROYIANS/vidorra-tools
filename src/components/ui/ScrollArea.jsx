import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import './ui.css';

const ScrollArea = ({ children, className, ...props }) => (
    <ScrollAreaPrimitive.Root className={`ScrollAreaRoot ${className || ''}`} {...props}>
        <ScrollAreaPrimitive.Viewport className="ScrollAreaViewport">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="vertical"
        >
            <ScrollAreaPrimitive.Thumb className="ScrollAreaThumb" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="horizontal"
        >
            <ScrollAreaPrimitive.Thumb className="ScrollAreaThumb" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner className="ScrollAreaCorner" />
    </ScrollAreaPrimitive.Root>
);

export default ScrollArea;
