import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux.ts";
import { clearCart } from "../slices/cartSlice.ts";

const PriceBox = () => {
  const { total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-12 flex justify-between">
      <div>
        <button
          onClick={handleInitializeCart}
          className="border p-4 rounded-md cursor-pointer"
        >
          장바구니 초기화
        </button>
      </div>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;