import React from "react";
import { createClient, Provider } from "urql";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";

const client = createClient({
  url: "http://localhost:3000/graphql",
});

const App: React.FC = () => {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
