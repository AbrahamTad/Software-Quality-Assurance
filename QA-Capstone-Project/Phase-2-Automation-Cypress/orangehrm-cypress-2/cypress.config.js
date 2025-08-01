const { defineConfig } = require("cypress");
const xlsx = require("node-xlsx").default;
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    setupNodeEvents(on, config) {
      on("task", {
        readExcel(filepath) {
          const workbook = xlsx.parse(fs.readFileSync(filepath));
          const result = {};
          workbook.forEach((sheet) => {
            result[sheet.name] = sheet.data.slice(1).map((row) => ({
              username: row[0] || "",
              password: row[1] || "",
              expected: row[2] || "",
              testCase: row[3] || "",
            }));
          });
          return result;
        },
      });
    },
  },
});

// const { defineConfig } = require("cypress");
// const excelToJson = require("convert-excel-to-json");

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: "http://localhost/orangehrm/orangehrm",
//     setupNodeEvents(on, config) {
//       on("task", {
//         readExcel(filePath) {
//           return excelToJson({ sourceFile: filePath });
//         },
//       });
//       return config;
//     },
//     retries: 1,
//     video: false,
//   },
//   reporter: "mochawesome",
//   reporterOptions: {
//     reportDir: "cypress/reports",
//     overwrite: false,
//     html: true,
//     json: true,
//   },
// });

/********* */

// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: "http://localhost/orangehrm/orangehrm",
//     setupNodeEvents(on, config) {
//       // implement node event listeners here if needed
//     },
//   },
//   retries: {
//     runMode: 2,
//     openMode: 0,
//   },
//   reporter: "mochawesome",
//   reporterOptions: {
//     reportDir: "cypress/reports",
//     overwrite: false,
//     html: true,
//     json: true,
//   },
// });
