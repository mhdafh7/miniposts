import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import postReducer from "./features/posts/postSlice";

const store = configureStore({
  reducer: { auth: authReducer, post: postReducer },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// TODO: google Oauth
// TODO: protected route
