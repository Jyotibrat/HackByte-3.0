import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  clearTokens,
  fetchCurrentUser,
  getAccessToken,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authApiService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(getAccessToken()));

  // Restore the session from a stored access token on first load.
  useEffect(() => {
    let cancelled = false;
    if (!getAccessToken()) {
      setIsLoading(false);
      return undefined;
    }
    fetchCurrentUser()
      .then((data) => {
        if (!cancelled) {
          const cachedPic = localStorage.getItem(`flanora_pic_${data.email}`);
          if (cachedPic) data.picture = cachedPic;
          setUser(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearTokens();
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Global "session expired" event raised by the API client after a failed
  // silent refresh.
  useEffect(() => {
    const handleSessionExpired = () => setUser(null);
    window.addEventListener("flanora:session-expired", handleSessionExpired);
    return () => window.removeEventListener("flanora:session-expired", handleSessionExpired);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    const cachedPic = localStorage.getItem(`flanora_pic_${data.user.email}`);
    if (cachedPic) data.user.picture = cachedPic;
    setUser(data.user);
    return data;
  }, []);

  const signup = useCallback(async (payload) => {
    const data = await registerUser(payload);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      signup,
      logout,
      setUser,
    }),
    [user, isLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>.");
  }
  return context;
}
