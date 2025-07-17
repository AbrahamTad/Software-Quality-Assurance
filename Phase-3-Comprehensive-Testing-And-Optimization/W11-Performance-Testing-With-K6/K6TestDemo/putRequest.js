// PUT REQUEST TEST USING K6

import http from 'k6/http';
import { sleep, check } from 'k6';

// Test configuration: 10 virtual users for 5 seconds
export let options = {
  vus: 10,
  duration: '5s',
};

export default function () {
  // Payload to update existing post
  const payload = JSON.stringify({
    id: 1,
    title: "updated title",
    body: "updated body",
    userId: 1,
  });

  // Headers for PUT request
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Send PUT request to update post with ID 1
  let res = http.put("https://jsonplaceholder.typicode.com/posts/1", payload, params);

  // Assertion checks
  check(res, {
    'PUT status is 200': (r) => r.status === 200,
    'Updated title is present': (r) => JSON.parse(r.body).title === "updated title",
  });

  // Log updated response
  console.log(res.body);

  // Pause
  sleep(1);
}
