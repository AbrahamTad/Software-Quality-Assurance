// GET REQUEST TEST USING K6

import http from "k6/http";
import { sleep, check } from "k6";

// Test configuration: 10 virtual users for 5 seconds
export let options = {
  vus: 10,
  duration: "5s",
};

export default function () {
  // Send a GET request to fetch all posts
  let res = http.get("https://jsonplaceholder.typicode.com/posts");

  // Assertion checks
  check(res, {
    "GET status is 200": (r) => r.status === 200,
    "Response body is not empty": (r) => r.body.length > 0,
  });
  i,
    // Log response to console (optional)
    console.log(res.body);

  // Pause for 1 second
  sleep(1);
}
