const XLSX = require('xlsx');

const data = [
  { username: 'Admin', password: 'admin123', valid: true },
  { username: 'wrongUser', password: 'wrongPass', valid: false },
  { username: '', password: 'admin123', valid: false },
  { username: 'Admin', password: '', valid: false }
];

const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
XLSX.writeFile(workbook, 'cypress/fixtures/loginData.xlsx');

console.log("✅ loginData.xlsx created successfully in cypress/fixtures/");
