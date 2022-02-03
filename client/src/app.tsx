import { createClient, Provider } from "urql";
import { Register } from "./pages/register";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";

const client = createClient({
  url: "http://localhost:3000/graphql",
});

const App: React.FC = () => {
  return (
    <Provider value={client}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
