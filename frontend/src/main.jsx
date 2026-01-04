
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AppRouter from "./routes/AppRouter.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slide, ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./auth/authProvider.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartProvider>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
            
            {/* Keep your existing ToastContainer for other toasts */}
            <ToastContainer
              position="top-center"
              autoClose={2000}
              theme="dark"
              transition={Slide}
            />
            
            {/* Add react-hot-toast for notification toasts */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#538767',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </QueryClientProvider>
        </SocketProvider>
      </CartProvider>
    </AuthContextProvider>
  </StrictMode>
);
