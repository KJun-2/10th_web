import { useAppSelector } from "../hooks/useCustomRedux.ts";
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
        <ul>
            {cartItems.map((item) => (
                <CartItem key={item.id} lp={item} />
            ))}
        </ul>
    </div>
  );
};

export default CartList;