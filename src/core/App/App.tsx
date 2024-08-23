import React, { useEffect } from "react";
import { Routes } from "@cookup/core";
import { auth } from "@cookup/firebase";
import { ROUTES } from "@cookup/constant";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@cookup/providers";
import { CustomLoader } from "@cookup/components";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, getCurrentUserData } from "@cookup/redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

const App = () => {
  const dispath = useDispatch<any>();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const { userLoading } = useSelector((state: any) => state.auth);

  let oobCode: string | null = searchParams.get("oobCode");
  oobCode === null
    ? ""
    : localStorage.setItem("oobCode", oobCode ? oobCode : "");

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (oobCode || queryParams.get("mode") === "resetPassword") {
      navigate(ROUTES.RESET_PASSWORD);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user && user.phoneNumber === null) {
          navigate(ROUTES.LOGIN_2FA);
        } else if (user && user.phoneNumber) {
          dispath(
            getCurrentUserData({
              uid: user.uid,
              email: user.email,
              role: "",
              userName: user.displayName,
            })
          );
        } else {
          auth.signOut();
          dispath(LOGOUT());
          navigate(ROUTES.LOGIN_ACCOUNT);
        }
      });
      return () => unsubscribe();
    }
  }, [dispath, auth]);

  if (userLoading === "pending" || isLoading) {
    return <CustomLoader />;
  }

  // //reset screen
  // if (oobCode) {
  //   navigate(ROUTES.RESET_PASSWORD)
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
