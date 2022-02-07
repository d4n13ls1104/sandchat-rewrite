import React from "react";
import { createClient, Provider } from "urql";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { getToken } from "./util/getToken";

const client = createClient({
  url: "http://localhost:3000/graphql",
  fetchOptions: () => {
    const token = getToken();

    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  },
});

const App: React.FC = () => {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
