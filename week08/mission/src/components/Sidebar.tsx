import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}


function Sidebar({ isOpen, onClose }: SidebarProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        }
        document.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [close, isOpen]);


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm
            transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={onClose}
            >
            <aside className={`w-80  z-50  top-0 fixed top-0 left-0 h-full bg-gray-900
                tarnsform transition-transform duration-300 ease-in-out ${isOpen ? "trasition x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col gap-4 text-white">
                    <Link to="/" >Home</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/mypage">Mypage</Link>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;