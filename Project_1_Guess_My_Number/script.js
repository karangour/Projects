document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') {
    const randNum = () => {
      return Math.floor(Math.random() * 20) + 1;
    };

    async function display(id, message, time) {
      document.querySelector(id).textContent = message;
      return new Promise(resolve => setTimeout(resolve, time * 1000));
    }

    async function rightOrWrong(n, c) {
      // If the number is equal to random number:
      if (n === c) {
        await display('.start-guessing', 'Correct!!', 1);
        return true;
      }
      // If the number isn't equal to the random number and:
      else {
        // If the number is less than the random number:
        if (n < c) await display('.start-guessing', 'Too high!', 1);
        // If the number is greater than the random number:
        if (n > c) await display('.start-guessing', 'Too low!', 1);
        return false;
      }
    }

    async function initializer() {
      let isCorrect = false;
      let gameEnded = false;
      let num = randNum();
      let choice = null;
      let s = 'Start guessing';
      let counter = 0;
      let score = 20;

      document.querySelector('.input #type').value = '';
      document.querySelector('#score').textContent = 'SCORE: ' + score;
      document.querySelector('.number #number').textContent = '?';

      guessLoop = () =>
        setInterval(() => {
          // 'start guessing...' loop
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

      let blink = guessLoop();

      document
        .querySelector('#button-check')
        .addEventListener('click', async () => {
          clearInterval(blink);

          choice = Number(document.querySelector('.input #type').value);
          // No number has been input
          if (!choice) {
            display('.start-guessing', 'No number!', 1);
            counter = 0;
            s = 'Start guessing';
            if (!gameEnded) {
              blink = guessLoop();
            }
          } else {
            // Number has been input and:
            isCorrect = await rightOrWrong(num, choice);
            // Number entered matches the random number.
            if (isCorrect) {
              gameEnded = true;
              document.querySelector('#number').textContent = num; // show random number
              console.log('in here');
              // If the current score beats the highscore:
              if (highscore < score) {
                highscore = score;
                document.querySelector('#highscore').textContent =
                  'Highscore: ' + highscore;
                score = 20;
                display('#score', 'SCORE: RECORD!!', 1);
                document.querySelector('.start-guessing').textContent =
                  'Press RESTART!';
              }
              // If the current score doesn't beat the highscore:
              else
                document.querySelector('.start-guessing').textContent =
                  'Press RESTART!';
            }
            // If the number doesn't match the random number and:
            else if (!isCorrect) {
              // If the score has depleted to zero:
              if (score === 0) {
                gameEnded = true;
                document.querySelector('#number').textContent = num;
                document.querySelector('.start-guessing').textContent =
                  'Uh-oh! Please RESTART!';
              }
              // If there is still more score left for another chance:
              if (score > 0) {
                score--;
                display('#score', 'SCORE: ' + score, 0.2);

                counter = 0;
                s = 'Start guessing';

                if (!gameEnded) {
                  blink = guessLoop();
                }
              }
            }
          }
        });
    }

    let highscore = 0;

    initializer();
    document
      .querySelector('.top #restart')
      .addEventListener('click', async () => {
        initializer();
      });
  }
});
