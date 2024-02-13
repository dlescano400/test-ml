import "./App.css";
import BoxSearch from "./components/BoxSearch/BoxSearch";
import BoxMainList from "./containers/BoxMainList/BoxMainList";
import BoxDetailItem from "./containers/BoxDetailItem/BoxDetailItem";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BoxSearch />
      <main>
        <Routes>
          <Route exact path="/" element={<></>} />
          <Route path="/items/" element={<BoxMainList />} />
          <Route path="/items/:id" element={<BoxDetailItem />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
