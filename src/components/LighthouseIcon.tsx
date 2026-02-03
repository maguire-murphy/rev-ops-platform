import { SVGProps } from "react";

export function LighthouseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="none"
            className={className}
            {...props}
        >
            {/* Light Beams */}
            <path
                d="M13.5 4.5L21 2"
                stroke="var(--color-yellow-primary, #FFD93D)"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-80"
            />

            {/* Lantern Room glow */}
            <circle cx="12" cy="6" r="3" fill="var(--color-yellow-primary, #FFD93D)" className="animate-pulse" />

            {/* Tower Body */}
            <path
                d="M7 22L9 8H15L17 22H7Z"
                fill="var(--color-navy-rich, #1E3A5F)"
                stroke="var(--color-navy-deep, #0A1628)"
                strokeWidth="1.5"
            />

            {/* Top Dome */}
            <path
                d="M12 2C10 2 8.5 3 8.5 4H15.5C15.5 3 14 2 12 2Z"
                fill="var(--color-navy-deep, #0A1628)"
            />

            {/* Railing */}
            <path
                d="M7.5 8H16.5"
                stroke="var(--color-navy-deep, #0A1628)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* Base */}
            <path
                d="M5 22H19"
                stroke="var(--color-navy-deep, #0A1628)"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Window */}
            <rect x="11" y="12" width="2" height="3" rx="1" fill="var(--color-blue-light, #8B9DC3)" />
        </svg>
    );
}
