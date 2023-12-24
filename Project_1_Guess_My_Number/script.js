document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') {
    let score = 20;
    let highscore = 0;

    const randNum = () => {
      return Math.floor(Math.random() * 20) + 1;
    };

    async function display(id, message) {
      document.querySelector(id).textContent = message;
      return new Promise ((resolve) => setTimeout(resolve, 1000))
    }
  

    async function rightOrWrong (n, c) {
      if (n === c) {
        await display('.start-guessing', 'Correct!!')
        return true;
      } else {
        await display('.start-guessing', 'Try again!!')
        return false;
      }
    };

    async function initializer () {
      let num = randNum();
      let choice = null;
      let s = 'Start guessing';
      let counter = 0;

      let blink = setInterval(() => {
        switch (counter % 4) {
          case 0:
            document.querySelector('.start-guessing').textContent = s;
            break;
          case 1:
            document.querySelector('.start-guessing').textContent = s + '.';
            break;
          case 2:
            document.querySelector('.start-guessing').textContent = s + '..';
            break;
          default:
            document.querySelector('.start-guessing').textContent = s + '...';
            break;
        }
        counter++;
      }, 500);

      document //for all functions triggered by 'CHECK' button
        .querySelector('#button-check')
        .addEventListener('click', async () => {
          clearInterval(blink);
          document.querySelector('#number').textContent = num; //show 'my number'
          choice = document.querySelector('.input #type').value;
          const isCorrect = await rightOrWrong(num, choice)
          if (isCorrect) {
            if (highscore < score) {
              highscore = score;
              document.querySelector('#highscore').textContent =
                'Highscore: ' + highscore;
              await display('#score', 'SCORE: RECORD!!')
              score = 20;
              initializer();
              };
            }
          else {
            if (score === 0) {
              await (display('.start-guessing', 'Uh-oh! Please RESTART!'))
            } else {
              console.log(score);
              score = score - 1;
              await (display ('#score', 'SCORE: ' + score))
              //document.querySelector('#score').textContent = 'SCORE: ' + score;
              initializer();
              
            }
          }
          
        });
    };

    initializer();
    document
    .querySelector('#restart')
    .addEventListener('click', () => this.location.reload(true));
  }

  
});
