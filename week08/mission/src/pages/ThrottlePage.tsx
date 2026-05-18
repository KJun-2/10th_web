import { useState, useEffect } from "react";
import { useThrottledCallback } from "../hooks/useThrottle.ts";
const ThrottlePage = () => {

    const [scrollY, setScrollY] = useState(0);
    const handleScroll = useThrottledCallback(
        () => {setScrollY(window.scrollY)}, 1000);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    console.log("리렌더링");
    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <h1>쓰로틀링</h1>
            <p>Scroll:{scrollY}px</p>
        </div>
    )
}

export default ThrottlePage;