import React, { useState } from "react";
import axios from "axios";

function App() {
    const host = "https://mistograph-engine.vercel.app";
//   const host = "http://127.0.0.1:8000/";
  const [selectedFile, setSelectedFile] = useState(null);
  const [winPercentage, setWinPercentage] = useState(null);
  const [selectedBroker, setSelectedBroker] = useState(""); // Add selectedBroker state

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBrokerChange = (event) => {
    setSelectedBroker(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedFile && selectedBroker) {
      // Define different API endpoints for each broker
      const apiEndpoints = {
        Exness: `${host}/api/trade-journals/analyze-win-percentage/`,
        TFT: `${host}/api/trade-journals/analyze-tft-account/`,
      };

      const formData = new FormData();
      formData.append("report", selectedFile);

      axios
        .post(apiEndpoints[selectedBroker], formData, {
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
      alert("Please select a file and a broker before submitting.");
    }
  };

  return (
    <div>
      <h2>Trade Journal Win Percentage</h2>
      <input type="file" onChange={handleFileChange} />

      {/* Add the broker dropdown */}
      <select value={selectedBroker} onChange={handleBrokerChange}>
        <option value="">Select Broker</option>
        <option value="TFT">TFT</option>
        <option value="Exness">Exness</option>
      </select>
      {console.log("selected_broker::",selectedBroker)}
      <button onClick={handleSubmit}>Submit</button>

      {winPercentage !== null && (
        <div>
          <p>Total Trades: {winPercentage.total_trades}</p>
          <p>Winning Trades: {winPercentage.winning_trades}</p>
          <p>Win Percentage: {winPercentage.win_percentage}</p>
          <p>Most Profitable Pair: {winPercentage.most_profitable_pair}</p>
          <p>Most Profitable Day: {winPercentage.most_profitable_day}</p>
          <p>
            Most Profitable Session: {winPercentage.most_profitable_session}
          </p>
          <p>London Session profit: {winPercentage.london_session_profit}</p>
          <p>
            New York Session profit: {winPercentage.new_york_session_profit}
          </p>

          {winPercentage.risk_reward != null && (
            <p>Risk Reward: {winPercentage.risk_reward}</p>
          )}

          <h2>Mean Profit By Day</h2>
          <p>Monday: {winPercentage.monday_mean_profit}</p>
          <p>Tuesday: {winPercentage.tuesday_mean_profit}</p>
          <p>Wednesday: {winPercentage.wednesday_mean_profit}</p>
          <p>Thursday: {winPercentage.thursday_mean_profit}</p>
          <p>Friday: {winPercentage.friday_mean_profit}</p>
        </div>
      )}
    </div>
  );
}

export default App;
