// AuthContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// 초기 상태 정의
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
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
type AuthAction = { type: ActionTypes.LOGIN; payload: User } | { type: ActionTypes.LOGOUT };

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
        user: null,
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
    user: null,
  });

  const login = (user: User) => {
    dispatch({ type: ActionTypes.LOGIN, payload: user });
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
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
