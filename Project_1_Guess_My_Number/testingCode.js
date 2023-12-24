let s = 'Start guessing';
let time = 0;

setInterval((print = () => {
    
    if (time < 4000) {
      time += 1000;
      s = s + '.';
      console.log(s);
      return setTimeout(print(s, time), time, s, time);
    }
    if (time === 4000) {
      s = 'Start guessing';
      time = 1000;
      return;
    }
  }), 1000);
