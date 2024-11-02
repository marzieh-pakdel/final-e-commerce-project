import { RouteObject, useRoutes } from "react-router-dom";
import {
  DashBoardPage,
  CheckoutPage,
  ProfilePage,
  ShoppingProgressPage,
  CartPage,
  MyOrdersPage,
  DetailsPage,
  ProductPage,
  UsersListPage,
  AdminDashboardPage,
  HomePage,
  NotFoundPage,
  AllProductsPage,
} from "../pages/index/pages";
import CreateProductPage from "../pages/createProductPage/CreateProductPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoardPage />,
      },
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/shoppingProgress",
        element: <ShoppingProgressPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/orders",
        element: <MyOrdersPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailsPage />,
      },
      {
        path: `/detail/deliverd/:id`,
        element: <DetailsPage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/users",
        element: <UsersListPage />,
      },
      {
        path: "/adminDashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "/create-product",
        element: <CreateProductPage />,
      },
      {
        path: "/allProducts",
        element: <AllProductsPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage />
  }
];

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
