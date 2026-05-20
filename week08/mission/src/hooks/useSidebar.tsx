import { useState } from "react";

function useSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);
    const toggle = () => setIsOpen(prev => !prev);


    return { open, close, toggle, isOpen };
    
}

export default useSidebar;