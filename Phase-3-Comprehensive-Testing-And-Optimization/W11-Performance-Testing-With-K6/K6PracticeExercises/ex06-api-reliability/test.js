import http from "k6/http";
import { check } from "k6";

// Define test options for K6 load testing
export let options = {
  vus: 40, // 40 Virtual Users
  duration: "45s", // Total duration of the test 
  // Performance thresholds for evaluating test success
  thresholds: {
    http_req_failed: ["rate<0.01"], // Ensure error rate is below 1%
    checks: ["rate>0.99"], // Ensure success rate is above 99%
  },
};

export default function () {
  let res = http.get("https://pokeapi.co/api/v2/pokemon/ditto");

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}

// import http from "k6/http";
// import { check } from "k6";

// export let options = {
//   vus: 40, // 40 Virtual Users
//   duration: "45s", // Run for 45 seconds
// };

// export default function () {
//   let res = http.get("https://pokeapi.co/api/v2/pokemon/ditto");

//   check(res, {
//     "status is 200": (r) => r.status === 200,
//   });
// }
