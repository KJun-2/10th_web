import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className="p-12 flex justify-between">
      <div>
        <button
          onClick={handleOpenModal}
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
