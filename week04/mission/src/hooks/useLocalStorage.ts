export const useLocalStorage = (key: string) => {
  // 1. setItem 정의
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      console.log('브라우저에 저장 시도:', key, value); 
    } catch (error) {
      console.error(error);
    }
  };

  // 2. getItem 정의 (setItem 밖으로 나옴)
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // 3. removeItem 정의
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  // 4. 최종 반환 (useLocalStorage의 결과물)
  return { setItem, getItem, removeItem };
};