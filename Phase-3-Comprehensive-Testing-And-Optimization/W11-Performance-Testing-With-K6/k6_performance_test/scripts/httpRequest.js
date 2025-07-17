//  Importing k6 modules for HTTP requests and test validations
import http from "k6/http";
import { check, sleep } from "k6";

// // Defining test configuration: 10 virtual users (VUs) run for 5 seconds
// export let options = {
//   vus: 10, // Number of virtual users running concurrently
//   duration: "5s", // Duration of the test
// };

export default function () {
  let res = http.get("https://jsonplaceholder.typicode.com/posts");
  console.log(res.body);
  sleep(1); // Adding a sleep of 1 second between requests to simulate user think time
}
