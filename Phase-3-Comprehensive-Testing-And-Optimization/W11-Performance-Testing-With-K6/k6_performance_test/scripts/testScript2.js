//  Importing k6 modules for HTTP requests and test validations
import http from "k6/http";
import { check, sleep } from "k6";

// Defining test configuration: 10 virtual users (VUs) run for 5 seconds
export let options = {
  vus: 10, // Number of virtual users running concurrently
  duration: "5s", // Duration of the test
};

// Default test function executed by each VU
export default function () {
  // Sending an HTTP GET request to the specified endpoint
  let res = http.get("https://automationexercise.com/api/productsList");

  // Performing a check to validate if the response status is 200 (OK)
  check(res, {
    "status code 200": (r) => r.status === 200,
  });
}
