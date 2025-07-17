// DELETE REQUEST TEST USING K6

import http from 'k6/http';
import { sleep, check } from 'k6';

// Test configuration: 10 virtual users for 5 seconds
export let options = {
  vus: 10,
  duration: '5s',
};

export default function () {
  // Send DELETE request to remove post with ID 1
  let res = http.del("https://jsonplaceholder.typicode.com/posts/1");

  // Assertion checks
  check(res, {
    'DELETE status is 200 or 204': (r) => r.status === 200 || r.status === 204,
  });

  // Log status code
  console.log(\`DELETE status code: \${res.status}\`);

  // Pause
  sleep(1);
}
