import { RxHamburgerMenu } from "react-icons/rx";

function Hamburgar({ toggle }: { toggle: () => void }) {
    return (
        <button onClick={toggle}>
            <RxHamburgerMenu className="text-2xl text-white-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer z-70"/>
        </button>
    )
}

export default Hamburgar;