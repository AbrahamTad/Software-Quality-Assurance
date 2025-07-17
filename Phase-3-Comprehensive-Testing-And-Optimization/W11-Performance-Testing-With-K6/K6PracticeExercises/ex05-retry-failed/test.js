import http from "k6/http";
import { check, sleep } from "k6";

// 1000 virtual users, running for 15 seconds
export let options = {
  // vus: 1000,
  vus: 500,
  duration: "15s",
};

export default function () {
  const url = "https://test.k6.io/";
  let success = false;

  // Try the request up to 3 times
  for (let i = 0; i < 3; i++) {
    let res = http.get(url);

    // Check if response was successful
    const passed = check(res, {
      "status is 200": (r) => r.status === 200,
    });

    // If passed, break the loop and mark as success
    if (passed) {
      success = true;
      break;
    }

    sleep(0.5); // Optional wait between retries (to avoid instant spam)
  }

  // You can also log or track failed attempts if needed
}

// import http from 'k6/http';
// import { check } from 'k6';

// export let options = {
//   vus: 1000,
//   duration: '15s',
// };

// export default function () {
//   let attempts = 0;
//   let res;
//   do {
//     res = http.get('https://test.k6.io/');
//     attempts++;
//   } while (!check(res, { 'status is 200': (r) => r.status === 200 }) && attempts < 3);
// }
