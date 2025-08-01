import http from "k6/http"; // HTTP module
import { check, sleep } from "k6"; // Validation + delay
import { Counter } from "k6/metrics"; // Custom metric
import { SharedArray } from "k6/data"; // to load test data
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"; // Console summary

export const totalIterations = new Counter("total_iterations"); // Track total runs

// Load credentials once before VUs start
const users = new SharedArray("users", () =>
  JSON.parse(open("../data/users.json"))
);

// Load profile settings
export let options = {
  stages: [
    { duration: "10s", target: 10 }, // ramp-up
    { duration: "30s", target: 10 }, // steady
    { duration: "10s", target: 0 }, // ramp-down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // fast response
    http_req_failed: ["rate<0.05"], // low error rate
    total_iterations: ["count > 0"], // ensure activity
  },
  cloud: {
    projectID: 3785321,
    name: "Login Test - OrangeHRM", // for K6 Cloud
  },
};

// Core test flow
export default function () {
  totalIterations.add(1); // Count this iteration
  console.log(`VU ${__VU} - Iteration ${__ITER}`); // Debug

  const user = users[Math.floor(Math.random() * users.length)]; // Pick random user

  const res = http.post(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate",
    JSON.stringify({ username: user.username, password: user.password }), // login payload
    { headers: { "Content-Type": "application/json" } } // send as JSON
  );

  check(res, {
    "status 200|302": (r) => r.status === 200 || r.status === 302, // success or redirect
    "has body": (r) => r.body?.length > 0, // response isn’t empty
  });

  sleep(1); // simulate user wait
}
// Display test results + save detailed JSON
export function handleSummary(data) {
  return {
    stdout:
      textSummary(data, { indent: " ", enableColors: true }) +
      `\n\nTEST COMPLETED: Iterations: ${data.metrics.total_iterations.values.count}\n`,
    "summary.json": JSON.stringify(data, null, 2),
  };
}

// import http from "k6/http";
// import { check, sleep } from "k6";
// import { SharedArray } from "k6/data"; //to load test data
// import { Counter } from "k6/metrics"; //Import Counter to track how many times the main test function is executed across all VUs
// export const totalIterations = new Counter("total_iterations"); //  count the total number of iterations across all Virtual Users (VUs)

// // Load users from an external JSON file
// const users = new SharedArray("users", function () {
//   return JSON.parse(open("../data/users.json")); // expects an array of { username, password }
// });

// //Define test configuration options
// // This configuration sets the stages of the test, thresholds for performance metrics, and cloud settings for running the test in K6 Cloud
// // Stages define how the load will ramp up and down, and thresholds define performance expectations for the test
// export let options = {
//   stages: [
//     { duration: "10s", target: 10 }, // Ramp-up: increase from 0 to 10 users over 10 seconds
//     { duration: "30s", target: 10 }, // Steady-state: maintain 10 users for 30 seconds
//     { duration: "10s", target: 0 }, // Ramp-down: decrease from 10 to 0 users over 10 seconds
//   ],
//   thresholds: {
//     http_req_duration: ["p(95)<2000"], // 95% of HTTP request durations must be < 2 seconds
//     http_req_failed: ["rate<0.05"], // Less than 5% of requests should fail
//     total_iterations: ["count > 0"], // Ensure at least 1 iteration ran (useful sanity check)
//   },
//   // 🏢 Cloud configuration for running the test in K6 Cloud
//   cloud: {
//     // Project: Default project
//     projectID: 3785321,
//     // Test runs with the same name groups test runs together.
//     name: "Login Test - OrangeHRM",
//   },
// };

// // Main test function executed by each Virtual User (VU) in a loop
// // This function simulates a user logging in by sending a POST request with credentials
// // It also includes checks to validate the response and logs the iteration details
// // Each VU will execute this function repeatedly until the test ends
// export default function () {
//   // 📈Increment the custom counter to track how many iterations were executed across all VUs
//   totalIterations.add(1);

//   // 🖨️ Log the current Virtual User ID (__VU) and iteration number (__ITER)
//   console.log(`VU ${__VU} - Iteration ${__ITER}`);

//   // 👤 Select a random user from the loaded user credentials array
//   const user = users[Math.floor(Math.random() * users.length)];

//   // 🔗 Define the URL for the login API endpoint
//   const url =
//     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate";

//   // 📦 Prepare the JSON payload with username and password
//   const payload = JSON.stringify({
//     username: user.username,
//     password: user.password,
//   });

//   // 📄 Set headers to indicate that the payload is in JSON format
//   const params = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // 🚀 Send the POST request to the login endpoint
//   const res = http.post(url, payload, params);

//   // ✅ Perform checks on the response to ensure it's valid
//   check(res, {
//     "status is 200 or redirect": (r) => r.status === 200 || r.status === 302, // Accept login success or redirect
//     "response is not empty": (r) => r.body && r.body.length > 0, // Ensure there's a response body
//   });

//   // ⏲️ Simulate real user think time (pause for 1 second before next iteration)
//   sleep(1);
// }

// // 📝 Custom Summary Report After Test Execution

// // 📚 Import a utility to format summary output nicely in the console
// import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// // 📦 Export a function to handle summary output after the test ends
// export function handleSummary(data) {
//   return {
//     // 🖥️ Output default metrics in a nicely formatted summary to the console
//     stdout:
//       textSummary(data, { indent: " ", enableColors: true }) +
//       `\n\n TEST COMPLETED: Total Iterations: ${data.metrics.total_iterations.values.count}\n`,

//     // 💾 Save full detailed summary (JSON format) to a file for later analysis
//     "summary.json": JSON.stringify(data, null, 2),
//   };
// }
//*******************************

// import http from "k6/http";
// import { check, sleep } from "k6";
// import { SharedArray } from "k6/data";
// import { Counter } from "k6/metrics";

// //  Custom metric to count total iterations
// export const totalIterations = new Counter("total_iterations");

// //  Load user credentials
// const users = new SharedArray("users", function () {
//   return JSON.parse(open("../data/users.json"));
// });

// // Test configuration
// export let options = {
//   stages: [
//     { duration: "10s", target: 10 }, // ramp-up
//     { duration: "30s", target: 10 }, // steady load
//     { duration: "10s", target: 0 }, // ramp-down
//   ],
//   thresholds: {
//     http_req_duration: ["p(95)<2000"],
//     http_req_failed: ["rate<0.05"],
//     total_iterations: ["count > 0"], // make sure at least 1 iteration runs
//   },
// };

// //  Main test function
// export default function () {
//   // Count this iteration
//   totalIterations.add(1);

//   // Log iteration details (optional)
//   console.log(`VU ${__VU} - Iteration ${__ITER}`);

//   // Pick a random user
//   const user = users[Math.floor(Math.random() * users.length)];

//   const url =
//     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate";

//   const payload = JSON.stringify({
//     username: user.username,
//     password: user.password,
//   });

//   const params = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const res = http.post(url, payload, params);

//   check(res, {
//     "status is 200 or redirect": (r) => r.status === 200 || r.status === 302,
//     "response is not empty": (r) => r.body && r.body.length > 0,
//   });

//   sleep(1); // Think time
// }

// //  Summary report at the end of the test
// import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// export function handleSummary(data) {
//   return {
//     stdout:
//       textSummary(data, { indent: " ", enableColors: true }) +
//       `\n\n TEST COMPLETED: Total Iterations: ${data.metrics.total_iterations.values.count}\n`,
//     "summary.json": JSON.stringify(data, null, 2),
//   };
// }

////*******************************//
// import http from "k6/http"; // For making HTTP requests
// import { check, group, sleep } from "k6"; // For assertions, grouping, and delays
// import { SharedArray } from "k6/data"; // For loading shared data across VUs efficiently

// // Load user credentials from a local JSON file
// // SharedArray ensures the data is parsed once and shared across all VUs (memory efficient)
// const users = new SharedArray("users", function () {
//   return JSON.parse(open("../data/users.json")); // Path to JSON containing array of user objects
// });

// // Load test configuration
// export let options = {
//   stages: [
//     { duration: "10s", target: 10 }, // Ramp-up to 10 virtual users over 10 seconds
//     { duration: "30s", target: 10 }, // Stay at 10 users for 30 seconds
//     { duration: "10s", target: 0 }, // Ramp-down to 0 users over 10 seconds
//   ],
//   thresholds: {
//     http_req_duration: ["p(95)<2000"], // 95% of requests must complete in under 2 seconds
//     http_req_failed: ["rate<0.05"], // Less than 5% of requests should fail
//   },
// };

// //  Main function executed by each VU in a loop during the test
// export default function () {
//   // Randomly select a user from the shared list
//   const user = users[Math.floor(Math.random() * users.length)];

//   // Target login endpoint
//   const url =
//     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate";

//   // Request payload with user credentials
//   const payload = JSON.stringify({
//     username: user.username,
//     password: user.password,
//   });

//   //  Request headers
//   const params = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   //  Send POST request to login endpoint
//   const res = http.post(url, payload, params);

//   //  Validate response with checks
//   check(res, {
//     "status is 200 or redirect": (r) => r.status === 200 || r.status === 302,
//     "response is not empty": (r) => r.body && r.body.length > 0,
//   });

//   sleep(1); // Simulate user think time (e.g., user reading the dashboard)
// }
