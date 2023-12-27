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
      if (n === c) {
        await display('.start-guessing', 'Correct!!', 1);
        return true;
      } else {
        if (n < c) await display('.start-guessing', 'Too high!', 1);
        if (n > c) await display('.start-guessing', 'Too low!', 1);
        return false;
      }
    }

    async function initializer() {
      let gameEnded = false;
      let num = randNum();
      let choice = null;
      let s = 'Start guessing';
      let counter = 0;
      let score = 20;

      document.querySelector('.input #type').value = '';
      document.querySelector('#score').textContent = 'SCORE: ' + score;
      document.querySelector('.number #number').textContent = '?';

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

      document
        .querySelector('#button-check')
        .addEventListener('click', async () => {
          clearInterval(blink);

          choice = Number(document.querySelector('.input #type').value);

          if (!choice) {
            display('.start-guessing', 'No number!', 1);
            counter = 0;
            s = 'Start guessing';

            if (!gameEnded) {
              blink = setInterval(() => {
                switch (counter % 4) {
                  case 0:
                    document.querySelector('.start-guessing').textContent = s;
                    break;
                  case 1:
                    document.querySelector('.start-guessing').textContent =
                      s + '.';
                    break;
                  case 2:
                    document.querySelector('.start-guessing').textContent =
                      s + '..';
                    break;
                  default:
                    document.querySelector('.start-guessing').textContent =
                      s + '...';
                    break;
                }
                counter++;
              }, 500);
            }
          } else {
            const isCorrect = await rightOrWrong(num, choice);
            if (isCorrect) {
              gameEnded = true;
              document.querySelector('#number').textContent = num;
              if (highscore < score) {
                highscore = score;
                document.querySelector('#highscore').textContent =
                  'Highscore: ' + highscore;
                score = 20;
                display('#score', 'SCORE: RECORD!!', 1);
                document.querySelector('.start-guessing').textContent =
                  'Press RESTART!';
              } else
                document.querySelector('.start-guessing').textContent =
                  'Press RESTART!';
            } else if (!isCorrect) {
              if (score === 0) {
                gameEnded = true;
                document.querySelector('#number').textContent = num;
                document.querySelector('.start-guessing').textContent =
                  'Uh-oh! Please RESTART!';
              }
              if (score > 0) {
                score = score - 1;
                display('#score', 'SCORE: ' + score, 0.2);

                counter = 0;
                s = 'Start guessing';

                if (!gameEnded) {
                  blink = setInterval(() => {
                    switch (counter % 4) {
                      case 0:
                        document.querySelector('.start-guessing').textContent =
                          s;
                        break;
                      case 1:
                        document.querySelector('.start-guessing').textContent =
                          s + '.';
                        break;
                      case 2:
                        document.querySelector('.start-guessing').textContent =
                          s + '..';
                        break;
                      default:
                        document.querySelector('.start-guessing').textContent =
                          s + '...';
                        break;
                    }
                    counter++;
                  }, 500);
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
