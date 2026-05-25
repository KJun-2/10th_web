import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const handleNo = () => {
    dispatch(closeModal());
  };

  const handleYes = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleNo}
    >
      <div
        className="bg-white rounded-lg p-6 w-80 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-lg font-bold mb-6">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleNo}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"
          >
            아니요
          </button>
          <button
            onClick={handleYes}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
