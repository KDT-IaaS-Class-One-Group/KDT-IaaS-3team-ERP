// import React, { useState, useEffect } from 'react';
// import Login from './Login';
// import { isLoggedIn } from './isLoggedIn';

// const LoginToggle: React.FC = () => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [isAdmin, setIsAdmin] = useState<boolean>(false);

//   useEffect(() => {
//     // userId가 sessionStorage에 저장되어 있는지 확인
//     const storedUserId = sessionStorage.getItem('userId');
//     if (storedUserId) {
//       setUserId(storedUserId);
//       setIsAdmin(storedUserId === 'adroot');
//     }
  
//     // 브라우저가 렌더링될 때마다 세션을 조회
//     setInterval(() => {
//       const storedUserId = sessionStorage.getItem('userId');
//       if (storedUserId) {
//         setUserId(storedUserId);
//         setIsAdmin(storedUserId === 'adroot');
//       }
//     }, 1000);
//   }, []);
    
//   const handleLogin = (id: string) => {
//     // 로그인 시 userId와 isAdmin을 sessionStorage에 저장
//     setUserId(id);
//     setIsAdmin(id === 'adroot');
//     sessionStorage.setItem('userId', id);
//   };

//   const handleLogout = () => {
//     // 로그아웃 시 userId와 isAdmin을 삭제하고 로그인 상태 초기화
//     setUserId(null);
//     setIsAdmin(false);
//     sessionStorage.removeItem('userId');
//   };

//   return (
//     <a href='/login' className='loginStatus'>
//       {isLoggedIn() ? (
//         <div>
//           <p>{`ID: ${userId}`}</p>
//           <button onClick={handleLogout}>로그아웃</button>
//           {/* 현재 사용자가 관리자인 경우에만 isAdmin을 true로 전달 */}
//           <Login isAdmin={isAdmin} userId={userId} onLogin={() => {}} />
//         </div>
//       ) : (
//         <div>
//           <p style={{ color: 'white', background: 'red' }}>로그인이 필요합니다.</p>
//           {/* <div className="Btn-login">
//             <button onClick={() => handleLogin('adroot')}>관리자</button>
//             <button onClick={() => handleLogin('root')}>사용자</button>
//           </div> */}
//         </div>
//       )}
//     </a>
//   );
// };

// export default LoginToggle;
