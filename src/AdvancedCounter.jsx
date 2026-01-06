import { useState, useEffect } from "react";

export default function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [saveStatus, setSaveStatus] = useState("");

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  useEffect(() => {
    setHistory(prevHistory => [ ...prevHistory, count]);
  }, [count]); 

  useEffect(() => {
    setSaveStatus("Saving...");

    const timeoutId = setTimeout(() => {
      localStorage.setItem("advanced-counter-count", String(count));
      setSaveStatus("Changes saved.");
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [count]);

  useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key == "ArrowUp") {
          setCount(prev => prev + 1);
        } else if (event.key == "ArrowDown") {
          setCount(prev => prev -1);
        }
      };
       
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    return (
      <div>
        <h1>Advanced Counter</h1>

        <p>Current Count: {count}</p>

        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>

        <p>{saveStatus}</p>

        <h2>Count History:</h2>
        <p>{history.join(",")}</p>

        <p> Use ArrowUp to increment and ArrowDown to decrement.</p>
      </div>
    );
  }  


