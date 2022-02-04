import { createClient, Provider } from "urql";
import { Register } from "./pages/Register";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import { Login } from "./pages/Login";

const client = createClient({
  url: "http://localhost:3000/graphql",
});

const App: React.FC = () => {
  return (
    <Provider value={client}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
