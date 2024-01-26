import React from "react";
import ChipComponent from "./components";
import { items } from "./constants/listItem";
const App: React.FC = () => {
  return (
    <div className="App">
      <ChipComponent items={items} />
    </div>
  );
};

export default App;
