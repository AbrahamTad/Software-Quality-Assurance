import http from 'k6/http';
import { sleep, check } from 'k6';

// 50 virtual users for 30 seconds
export let options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  let res = http.get('https://test.k6.io/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
