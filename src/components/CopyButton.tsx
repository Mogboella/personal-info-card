import { Button, IconButton } from '@mui/material';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export interface CopyButtonProps {
    textToCopy: string;
    onAfterCopy?: () => void;
    className?: string;
}

export function CopyButton({
    textToCopy,
    onAfterCopy,
    className = '',
}: CopyButtonProps) {

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            onAfterCopy?.();
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <IconButton
            onClick={handleCopy}
            size="small"
            sx={{ ml: 1 }}
            color={isCopied ? "success" : "primary"}
            className={`${className}`}
        >
            {isCopied ? (
                <Check size={12} />
            ) : (
                <Copy size={12} />
            )}
        </IconButton>
    );
}