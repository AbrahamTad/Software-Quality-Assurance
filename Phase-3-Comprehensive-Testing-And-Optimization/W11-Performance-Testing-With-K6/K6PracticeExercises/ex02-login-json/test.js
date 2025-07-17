// import http from "k6/http";
// import { check, sleep } from "k6";
// import { CookieJar } from "k6/http";

// // 1. Load user credentials from an external JSON file called 'users.json'. This file contains an array of user objects with 'username' and 'password' fields.
// const users = JSON.parse(open("./users.json"));

// // 2. Test configuration: - vus: Number of virtual uhttp.getsers (simulated users) running concurrently (here, 1 user) - iterations: Number of times the test function will run (equal to the number of users).
// export let options = { vus: 1, iterations: users.length };

// export default function () {
//   // 3. Select the user object based on the current iteration index (__ITER). __ITER is a special built-in variable in K6 that increments with each iteration.
//   const user = users[__ITER];

//   // 4. Create a CookieJar object to store cookies (like session cookies). This allows the script to maintain login sessions across multiple HTTP requests.
//   const jar = new CookieJar();

//   // 5. Send a POST request to the login page with the current user's credentials. - The data is sent in "application/x-www-form-urlencoded" format (typical for web forms).- The cookie jar is used to store any cookies returned by the server (like session tokens).
//   http.post(
//     "https://test.k6.io/login.php",
//     `login=${user.username}&password=${user.password}`,
//     { headers: { "Content-Type": "application/x-www-form-urlencoded" }, jar }
//   );

//   // 6. After logging in, send a GET request to the inbox page (my_messages.php). - Use the same cookie jar to send session cookies so the server recognizes the logged-in user.
//   const inboxRes = ("https://test.k6.io/my_messages.php", { jar });

//   // 7. Perform checks to validate the response from the inbox page:
//   //    - Check that the HTTP status code is 200, meaning the page loaded successfully.
//   //    - Check that the response body contains any expected keywords that confirm successful login and inbox loading,
//   //      such as "Welcome", "Your inbox", "admin", or "Log out".
//   check(inboxRes, {
//     "Status 200 OK": (r) => r.status === 200,
//     "Inbox loaded": (r) =>
//       ["Welcome", "Your inbox", "admin", "Log out"].some((txt) =>
//         r.body.includes(txt)
//       ),
//   });

//   // 8. Pause the virtual user for 1 second before the next iteration. //  This simulates a small think time between user actions and avoids overwhelming the server.
//   sleep(1);
// }

import http from "k6/http";
import { check, sleep } from "k6";
import { CookieJar } from "k6/http";

// Load user credentials from JSON file
const users = JSON.parse(open("./users.json"));

//  Test configuration: - vus: Number of virtual uhttp.getsers (simulated users) running concurrently (here, 1 user) - iterations: Number of times the test function will run (equal to the number of users).
// Test config: 1 virtual user, one iteration per user
export let options = { vus: 1, iterations: users.length };

export default function () {
  const user = users[__ITER]; // Get current user by iteration index
  const jar = new CookieJar(); // Create cookie jar for session handling

  // Step 1: Login POST request with form data
  http.post(
    "https://test.k6.io/login.php",
    `login=${user.username}&password=${user.password}`,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" }, jar }
  );

  // Step 2: Access inbox page using same session cookies
  const inboxRes = http.get("https://test.k6.io/my_messages.php", { jar });

  // Step 3: Check that inbox page loads successfully and shows expected content
  check(inboxRes, {
    "Status 200 OK": (r) => r.status === 200,
    "Inbox loaded": (r) =>
      ["Welcome", "Your inbox", "admin", "Log out"].some((txt) =>
        r.body.includes(txt)
      ),
  });

  sleep(1); // Pause 1 second between iterations (optional)
}
