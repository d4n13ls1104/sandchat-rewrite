import { createClient, Provider } from "urql";
import { Register } from "./pages/register";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { getToken } from "./util/getToken";

const client = createClient({
  url: "http://localhost:3000/graphql",
  fetchOptions: () => {
    const token = getToken();
    console.log(token);

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
      <HashRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
