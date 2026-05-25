import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

//저장소 생성
function createStore() {
  const store = configureStore({
    //리듀서 설정
    reducer: {
      cart: cartReducer,
    },
  });

  return store;
}


//싱글톤 패턴
const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//store을 활용할 수 있도록 내보내야 함.
export default store;