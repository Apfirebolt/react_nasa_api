import { useState, useMemo, useEffect, use } from "react";
import { Button } from "antd";

const Test = () => {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState("light");

  const slowFunction = () => {
    for (let i = 0; i < 1000000000; i++) {
      // long operation
    }
    return number * 2;
  }

  console.log('Changed again')

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const doubleNumber = slowFunction();

//   const doubleNumber = useMemo(() => {
//     return slowFunction();
//   }
//   , [number]);

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Launches {doubleNumber}</h1>
      <h2>Number: {number}</h2>
      <h2>Theme: {theme}</h2>
      <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
      <Button type="primary" onClick={() => changeTheme()}>Change Theme</Button>
    </div>
  );
};

export default Test;
