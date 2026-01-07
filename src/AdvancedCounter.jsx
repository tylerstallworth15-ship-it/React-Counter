import { useState, useEffect } from "react";

export default function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [saveStatus, setSaveStatus] = useState("");
  const [step,setStep] = useState(1);

  const handleIncrement = () => {
    setCount(prev => prev + step);
  };

  const handleDecrement = () => {
    setCount(prev => prev - step);
  };

  const handleReset = () => {
    setCount(0);
    setHistory([0]);
    setSaveStatus("");
  };

  useEffect(() => {
    const saved = localStorage.getItem("advanced-counter-count");
    if (saved !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(Number(saved));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(prev => {
      if (prev[prev.length - 1] !== count) {
        return [... prev.slice(-49), count];
      } 
      return prev;
    });
  }, [count]); 

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <div
        style={{
          border: "2px solid #ffe600ff",
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "400px",
          margin: "20px auto",
          backgroundColor: "#911cb4ff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <h1>Advanced Counter</h1>

        <p>Current Count: {count}</p>

        <label>Step Amount: </label>
        <input
          type="number"
          value={String(step)}
          onChange={(e) => {
            const raw = e.target.value;
            const cleaned = Number(raw);
            setStep(cleaned);
          }}
        />
        <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleReset}
        style={{
          background: "#e74c3c",
          color: "white",
          border: "none",
          padding: "2px 6px",
          fontSize: "0.9rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        >
          Reset
        </button>

        <p>{saveStatus}</p>

        <h2>Count History:</h2>
        <p
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          maxSpace: "normal",
          maxWidth: "100%"
        }}
       > 
         {history.join(",")}
       </p>

        <p> Use ArrowUp to increment and ArrowDown to decrement.</p>
      </div>
    </div>
    );
  }