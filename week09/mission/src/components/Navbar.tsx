import { FaShoppingCart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux.ts";
import { useEffect } from "react";
import { calculateTotals } from "../features/cart/cartSlice";

const Navbar = () => {
  const { amount, cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-2xl font-semibold cursor-pointer"
      >
        Ohthani Ahn
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl"></FaShoppingCart>
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;