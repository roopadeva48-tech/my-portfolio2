import React, { useRef, useEffect, useState } from 'react';

interface AnimatedStatProps {
    // The final number the counter should reach
    value: number;
    // The label for the statistic
    label: string;
    // Text to append after the number (e.g., '+' or 'k')
    suffix?: string;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, label, suffix = '' }) => {
    // Reference to the DOM element to observe for visibility
    const statRef = useRef<HTMLDivElement>(null);
    // State for the current displayed count
    const [count, setCount] = useState(0);
    // State to check if the animation has been triggered
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const currentRef = statRef.current;
        if (!currentRef) return;

        // --- Intersection Observer Setup ---
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the element is visible AND the animation hasn't run yet
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    // Disconnect observer after triggering once
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the component is visible
        );

        observer.observe(currentRef);

        // Cleanup function for the observer
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasAnimated]);

    useEffect(() => {
        // --- Animation Frame Logic (Counting) ---
        if (!hasAnimated || count === value) return;

        let startTime: number | null = null;
        const duration = 4000; // Animation duration in milliseconds

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            // Calculate the current value based on time progress
            const newCount = Math.min(value, (progress / duration) * value);

            // Use Math.ceil to avoid seeing decimal numbers and ensure we reach 'value' precisely
            setCount(Math.ceil(newCount)); 

            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                // Ensure the final count is exactly the 'value'
                setCount(value);
            }
        };

        const animationFrameId = requestAnimationFrame(step);

        // Cleanup function for the animation frame
        return () => cancelAnimationFrame(animationFrameId);
    }, [value, hasAnimated, count]); // Recalculate animation when 'hasAnimated' changes or 'value' changes

    return (
        <div ref={statRef} className="text-center p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:shadow-2xl">
            <h3 className="text-6xl font-extrabold pb-1 gradient-text-stat">
                {/* Apply number formatting if needed */}
                {count.toLocaleString()}
                <span className="text-4xl">{suffix}</span>
            </h3>
            <p className="text-gray-400 uppercase tracking-widest font-medium text-sm mt-2">{label}</p>
        </div>
    );
};

export default AnimatedStat;