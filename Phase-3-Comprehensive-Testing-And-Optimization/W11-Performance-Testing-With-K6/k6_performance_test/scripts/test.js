// 🚀 Import k6 modules for making HTTP requests and performing checks
import http from "k6/http";
import { check, sleep } from "k6";

// ⚙️ Configuration options: 10 virtual users (VUs) run for 2 seconds
export let options = {
  vus: 10, // Number of concurrent virtual users
  duration: "2s", // Total duration of the test
};

// 📦 Data file declaration placeholder
// You can load test data from a local file like CSV or JSON if needed
// Example: const data = JSON.parse(open('./data.json'));

// 🧪 Main test logic
export default function () {
  // This function runs for each virtual user during the test
  // Add your HTTP requests and validations here
  // Example usage:
  // let res = http.get('https://example.com');
  // check(res, { "status is 200": (r) => r.status === 200 });
  // sleep(1); // Simulate user waiting time
}


    // Assert that the loading text is present