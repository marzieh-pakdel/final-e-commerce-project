import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import AppRoutes from "./routes/AppRoutes";
import PubicRoutes from "./routes/PublicRoutes";
import PrivateRoute from "./components/privateRoutes/PrivateRoutes";
import queryClient from "./api/queryClient";
import { useAuthStatus } from "./stores/authStore";

const App = () => {
  const isAuth = useAuthStatus((state) => state.isAuth);
  const router = createBrowserRouter([
    ...PubicRoutes.routes,
    {
      path: "/*",
      element: (
        <PrivateRoute element={<AppRoutes />} isAuthentication={isAuth} />
      ),
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
