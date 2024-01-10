export const isLoggedIn: () => boolean = () => {
  // sessionStorage에 userId가 저장되어 있는지 확인
  const userId = sessionStorage.getItem('userId');
  return userId !== null;
};
