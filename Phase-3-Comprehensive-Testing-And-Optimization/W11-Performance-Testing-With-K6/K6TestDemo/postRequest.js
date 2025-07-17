// POST REQUEST TEST USING K6

import http from 'k6/http';
import { sleep, check } from 'k6';

// Test configuration: 10 virtual users for 5 seconds
export let options = {
  vus: 10,
  duration: '5s',
};

export default function () {
  // Define payload for creating a new post
  const payload = JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  });

  // Define headers for JSON request
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Send POST request
  let res = http.post("https://jsonplaceholder.typicode.com/posts", payload, params);

  // Assertion checks
  check(res, {
    'POST status is 201': (r) => r.status === 201,
    'Response contains ID': (r) => JSON.parse(r.body).id !== undefined,
  });

  // Log response to console
  console.log(res.body);

  // Wait before next iteration
  sleep(1);
}
