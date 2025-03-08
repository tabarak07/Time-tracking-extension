const userId = localStorage.getItem('userId') || 123;
let chartInstance = null;

function fetchData(timePeriod = 'daily') {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('error').style.display = 'none';

  fetch(`http://localhost:3000/api/logs/analytics?userId=${userId}&period=${timePeriod}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById('loading').style.display = 'none';

      if (!data.analytics) {
        throw new Error("No analytics data found for the user.");
      }

      const labels = ['Productive', 'Unproductive', 'Neutral'];
      const timeSpent = [
        data.analytics.productive / 60,
        data.analytics.unproductive / 60,
        data.analytics.neutral / 60,
      ];

      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = document.getElementById("chart").getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Time Spent (minutes)",
              data: timeSpent,
              backgroundColor: [
                "#36A2EB", // Productive
                "#FF6384", // Unproductive
                "#FFCE56", // Neutral
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching or processing data:", error);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('error').style.display = 'block';
      document.getElementById('error').textContent = `Error: ${error.message}`;
    });
}

document.getElementById('dailyView').addEventListener('click', () => {
  fetchData('daily');
});

document.getElementById('weeklyView').addEventListener('click', () => {
  fetchData('weekly');
});

document.getElementById('monthlyView').addEventListener('click', () => {
  fetchData('monthly');
});

fetchData('daily');