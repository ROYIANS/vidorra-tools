import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import './ui.css';

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ToastPrimitive.Viewport;

export const Toast = React.forwardRef(({ children, title, description, ...props }, ref) => {
    return (
        <ToastPrimitive.Root className="ToastRoot" {...props} ref={ref}>
            {title && <ToastPrimitive.Title className="ToastTitle">{title}</ToastPrimitive.Title>}
            {description && (
                <ToastPrimitive.Description className="ToastDescription">
                    {description}
                </ToastPrimitive.Description>
            )}
            {children}
            <ToastPrimitive.Close aria-label="Close">
                <span aria-hidden="true">×</span>
            </ToastPrimitive.Close>
        </ToastPrimitive.Root>
    );
});

export const useToast = () => {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState({ title: '', description: '' });

    const showToast = (title, description) => {
        setContent({ title, description });
        setOpen(true);
        // Auto hide handled by Radix, but we need to reset open state to allow re-trigger
        setTimeout(() => setOpen(false), 3000);
    };

    return { open, setOpen, content, showToast };
};
