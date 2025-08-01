#  3: Performance Testing with K6

## Overview
This test simulates user logins to the OrangeHRM system and collects performance metrics such as response time and error rate.

## Folder Structure

```
Phase-3-Performance-K6/
├── scripts/
│   └── login_test.js
├── data/
│   └── users.json
├── reports/
└── README.md
```

## Run Test

To run the test:
```bash
cd scripts
k6 run login_test.js
```

## Optional: Run with InfluxDB for Grafana
```bash
K6_OUT=influxdb=http://localhost:8086/k6 k6 run login_test.js
```

