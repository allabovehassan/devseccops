import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch the initial counter value from the backend
    axios
      .get("http://localhost:8080/api/counter")
      .then((response) => {
        if (response.data.success) {
          setCount(response.data.data.count); 
          // alert(response.data.message)
        } else {
          console.error(
            "Failed to fetch counter:",
            response.data.message
          );
        }
      })
      .catch((error) =>
        console.error("Error fetching counter:", error)
      );
  }, []);

  const incrementCounter = () => {
    // Increment the counter value in the backend
    axios
      .post(
        "http://localhost:8080/api/counter/increment"
      )
      .then((response) => {
        if (response.data.success) {
          setCount(response.data.data.newCount); 
        } else {
          console.error(
            "Failed to increment counter:",
            response.data.message
          );
        }
      })
      .catch((error) =>
        console.error(
          "Error incrementing counter:",
          error
        )
      );
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={incrementCounter}>
        Increment
      </button>
      <button
        onClick={() => {
          // Fetch the current counter value from the backend
          axios
            .get("http://localhost:8080/api/counter")
            .then((response) => {
              if (response.data.success) {
                setCount(response.data.data.count); 
              } else {
                console.error(
                  "Failed to fetch counter:",
                  response.data.message
                );
              }
            })
            .catch((error) =>
              console.error(
                "Error fetching counter:",
                error
              )
            );
        }}
      >
        Get Current Counter
      </button>
    </div>
  );
};

export default App;
