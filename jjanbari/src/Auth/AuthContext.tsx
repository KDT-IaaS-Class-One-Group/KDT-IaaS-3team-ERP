// AuthContext.tsx
import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';

// 초기 상태 정의
interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

// 유저 정보 타입 정의
interface User {
  username: string;
  // 다른 유저 정보를 추가할 수 있습니다.
}

// 액션 타입 정의
enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

// 액션 타입과 페이로드를 갖는 액션 객체 정의
type AuthAction =
  | { type: ActionTypes.LOGIN; payload: User }
  | { type: ActionTypes.LOGOUT; payload: null };

// 리듀서 함수 정의
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: { username: '' },
      };
    default:
      return state;
  }
};

// Context 생성
interface AuthContextProps {
  state: AuthState;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider 컴포넌트 정의
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: { username: '' },
  });

  console.log('AuthProvider - Initial State:', state);

  // useEffect를 사용하여 초기화 시 localStorage를 확인하고 상태를 업데이트
  useEffect(() => {
    const storedUsername = localStorage.getItem('user_id');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedIsLoggedIn === 'true' && storedUsername) {
      dispatch({
        type: ActionTypes.LOGIN,
        payload: { username: storedUsername || '' },
      });
    }
  }, []);  // 빈 배열을 전달하여 최초 렌더링 시에만 실행되도록 함

  const login = (user: User) => {
    dispatch({ type: ActionTypes.LOGIN, payload: user });
    // localStorage에 로그인 정보 저장
    localStorage.setItem('user_id', user.username || '');  // null이 아니면 저장
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT, payload: null });
    // localStorage에서 로그인 정보 삭제
    localStorage.removeItem('user_id');
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅 생성
const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
