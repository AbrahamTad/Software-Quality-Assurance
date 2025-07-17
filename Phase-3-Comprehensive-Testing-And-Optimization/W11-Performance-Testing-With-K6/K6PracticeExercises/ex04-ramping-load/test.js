// Import HTTP module and check function from K6
import http from "k6/http";
import { check } from "k6";

// Define test configuration
export let options = {
  scenarios: {
    ramping_rps: {
      executor: "ramping-arrival-rate",
      startRate: 10, // Start at 10 RPS
      timeUnit: "1s", // Rate is per second
      stages: [
        { target: 100, duration: "20s" }, // Ramp up to 100 RPS in 20s
        { target: 100, duration: "30s" }, // Stay at 100 RPS for 30s
        { target: 20, duration: "20s" }, // Ramp down to 20 RPS in 20s
      ],
      preAllocatedVUs: 10, // Start with 10 VUs
      maxVUs: 100, // Max 100 VUs to handle the load
    },
  },
};

// Default function executed by each VU (Virtual User)
export default function () {
  // Make an HTTP GET request to the test site
  let res = http.get("https://test.k6.io/");

  // Perform basic checks on the response
  check(res, {
    "status is 200": (r) => r.status === 200, // Check if status is 200 OK
    "HTML response": (r) => r.body.includes("<html"), // Check if response contains HTML content
  });
}


// import http from "k6/http";
// import { check } from "k6";

// export const options = {
//   scenarios: {
//     constant_arrival: {
//       executor: "constant-arrival-rate", // Constant request rate executor
//       rate: 50, // 50 requests per second
//       timeUnit: "1s", // Time unit for the rate

//       duration: "1m", // Total test duration: 1 minute
//       preAllocatedVUs: 10, // Pre-allocated Virtual Users
//       maxVUs: 100, // Maximum allowed Virtual Users
//     },
//   },
//   thresholds: {
//     http_req_duration: ["p(95)<2000"], // 95% of requests must complete < 2s
//   },
// };

// export default function () {
//   const res = http.get("https://test.k6.io/");

//   check(res, {
//     "Status is 200": (r) => r.status === 200,
//     "HTML response": (r) => r.body.includes("<html"),
//   });
// }

// import http from 'k6/http';

// export let options = {
//   stages: [
//     { duration: '20s', target: 100 },
//     { duration: '30s', target: 100 },
//     { duration: '20s', target: 20 },
//   ],
// };

// export default function () {
//   http.get('https://test.k6.io/');
// }
