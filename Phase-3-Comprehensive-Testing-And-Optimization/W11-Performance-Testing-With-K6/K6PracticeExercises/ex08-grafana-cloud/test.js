import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 20, // 20 virtual users
  duration: "1m", // test runs for 1 minute
  cloud: {
    // Project: Default project
    projectID: 3785321,
    // Test runs with the same name groups test runs together.
    name: "Test (17/07/2025-00:36:09)",
  },
};

export default function () {
  let res = http.get("https://test.k6.io");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
