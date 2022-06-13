import http from 'k6/http';
import { sleep } from 'k6';

let root = 'http://localhost:3001';

// let answer = (Math.floor(Math.random() * 600000)) + 6120000;

// let product = (Math.floor(Math.random() * 100001)) + 900000;

export let options = {
  // stages: [
  //   { duration: '30s', target: 10 },
  //   { duration: '30s', target: 100 },
  //   { duration: '30s', target: 200 }
  // ]
  vus: 1000,
  duration: '1m'
};

export default function () {
  // let question = (Math.floor(Math.random() * 351896)) + 3150000;

  let answer = (Math.floor(Math.random() * 600000)) + 6120000;

  // let product = (Math.floor(Math.random() * 100001)) + 900000;


  http.put(`${root}/qa/answers/${answer}/report`);

  sleep(1);
};