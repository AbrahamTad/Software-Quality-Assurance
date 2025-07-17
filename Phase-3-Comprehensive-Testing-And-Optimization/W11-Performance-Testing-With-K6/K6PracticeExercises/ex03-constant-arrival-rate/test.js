// Import the HTTP module from k6 to make HTTP requests
import http from "k6/http";

// Import the check function from k6 for validating test results
import { check } from "k6";

// Define test configuration options
export let options = {
  scenarios: {
    constant_rate: {
      // Use the 'constant-arrival-rate' executor to generate requests at a fixed rate
      executor: "constant-arrival-rate",

      // Send 50 iterations (requests) per second
      rate: 50,

      // The time unit over which iterations are scheduled (50 iterations per 1 second)
      timeUnit: "1s",

      // Total duration of the test
      duration: "1m",

      // Number of virtual users (VUs) to pre-allocate before test starts
      preAllocatedVUs: 10,

      // Maximum number of VUs that can be initialized if needed
      maxVUs: 100,
    },
  },
};

// Default function that k6 will execute for each iteration
export default function () {
  // Send a GET request to the specified URL
  let res = http.get("https://test.k6.io/");

  // Check that the HTTP response status is 200 (OK)
  check(res, { "status is 200": (r) => r.status === 200 });
}
