import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 30, // 30 virtual users
  duration: "20s", // test duration: 20 seconds
};

export default function () {
  let res = http.get("https://jsonplaceholder.typicode.com/posts");

  // Validate the response
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
