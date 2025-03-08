document.getElementById("viewAnalytics").addEventListener("click", () => {
  window.open("http://localhost:3000", "_blank"); // Open the main dashboard
});

document.getElementById("viewWeeklyReport").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "getWeeklyReport" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error fetching weekly report:", chrome.runtime.lastError);
      alert("Failed to fetch weekly report. Please try again.");
    } else {
      console.log("Weekly Report:", response);
      const reportWindow = window.open("", "Weekly Report", "width=600,height=400");
      reportWindow.document.write(`
        <h1>Weekly Productivity Report</h1>
        <p>Total Time: ${response.totalTime.toFixed(2)} seconds</p>
        <p>Productive Time: ${response.productiveTime.toFixed(2)} seconds</p>
        <p>Unproductive Time: ${response.unproductiveTime.toFixed(2)} seconds</p>
      `);
    }
  });
});

chrome.storage.local.get(["timeLogs"], (result) => {
  const logs = result.timeLogs || {};
  let totalTime = 0;
  let productiveTime = 0;
  let unproductiveTime = 0;

  Object.keys(logs).forEach((key) => {
    if (key.endsWith("_type")) {
      const type = logs[key];
      const time = logs[key.replace("_type", "")] || 0;
      totalTime += time;
      if (type === "productive") productiveTime += time;
      else if (type === "unproductive") unproductiveTime += time;
    }
  });

  document.getElementById("totalTime").textContent = totalTime.toFixed(2);
  document.getElementById("productiveTime").textContent = productiveTime.toFixed(2);
  document.getElementById("unproductiveTime").textContent = unproductiveTime.toFixed(2);
});