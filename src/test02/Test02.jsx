import React, { useCallback, useEffect, useState } from "react";

export default function Test02() {
  const [key, setKey] = useState(0);
  // code something here ...

  useEffect(() => {
    if (key < 0) return;
    console.log("run effect");
  }, [key]);

  const handleSubmit = useCallback(() => {
    setKey((key) => key + 1);
  }, []);

  return (
    <div className="App">
      <h2>Test02: Skip first render</h2>

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
