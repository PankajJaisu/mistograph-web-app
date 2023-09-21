import React, { useState } from "react";
import axios from "axios";

function App() {
  const host = "https://mistograph-engine.vercel.app";
//   const host = "http://127.0.0.1:8000/";
  const apiUrl = `${host}/api/trade-journals/analyze-win-percentage/`;
  const [selectedFile, setSelectedFile] = useState(null);
  const [winPercentage, setWinPercentage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("report", selectedFile);

      axios
        .post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle the response as needed
          console.log(response.data);
          setWinPercentage(response.data.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select a file before submitting.");
    }
  };

  return (
    <div>
      <h2>Trade Journal Win Percentage</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>

      {winPercentage !== null && (
        <p>
          {console.log(winPercentage)}

          <p>Total Trades: {winPercentage?.total_trades}</p>
          <p>Winning Trades: {winPercentage?.winning_trades}</p>
          <p>Win Percentage: {winPercentage?.win_percentage}</p>
          <p>Most Profitable Pair: {winPercentage?.most_profitable_pair}</p>
          <p>Most Profitable Day: {winPercentage?.most_profitable_day}</p>
          <p>
            Most Profitable Session: {winPercentage?.most_profitable_session}{" "}
          </p>
          <p>London Session profit: {winPercentage?.london_session_profit} </p>
          <p>
            New York Session profit: {winPercentage?.new_york_session_profit}{" "}
          </p>

          {winPercentage?.risk_reward != null && (
            <p>Risk Reward:{winPercentage?.risk_reward}</p>
          )}

          <h2>Mean Profit By Day</h2>
          <p>Monday. {winPercentage?.monday_mean_profit}</p>
          <p>Tuesday. {winPercentage?.tuesday_mean_profit}</p>
          <p>Wednesday. {winPercentage?.wednesday_mean_profit}</p>
          <p>Thursday. {winPercentage?.thursday_mean_profit}</p>
          <p>Friday. {winPercentage?.friday_mean_profit}</p>
        </p>
      )}
    </div>
  );
}

export default App;
