import { useState }  from "react";

export default function AdvancedCounter() {
  const [count, setCount] = useState(0);

const handleIncrememnt = () => {
  setCount(prev => prev + 1);
};

const handleDecrememnt = () => {
  setCount(prev => prev - 1);
};

return (
    <div>
      <h1>Advanced Counter</h1>
      <p>Current Count: {count}</p>

      <button onClick={handleDecrement}><Decrement></Decrement></button>
      <button onClick={handleIncrement}><Increment></Increment></button>
      
    </div>
  );
}  

