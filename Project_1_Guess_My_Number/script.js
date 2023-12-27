document.addEventListener('readystatechange', function () {
  //let page load before js logic starts.
  if (document.readyState === 'complete') {
    //once it's loaded..

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

      //document.querySelector('#number').textContent = num;

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

      document //for all functions triggered by 'CHECK' button
        .querySelector('#button-check')
        .addEventListener('click', async () => {
          clearInterval(blink);

          choice = Number(document.querySelector('.input #type').value); //this has to be converted to a number since it's ANY input by user is ALWAYS a string by default

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
              document.querySelector('#number').textContent = num; //show 'my number'
              if (highscore < score) {
                //document.querySelector('#number').textContent = num; //show 'my number'
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
              //document.querySelector('#number').textContent = num; //show 'my number'
              if (score === 0) {
                gameEnded = true;
                document.querySelector('#number').textContent = num; //show 'my number'
                document.querySelector('.start-guessing').textContent =
                  'Uh-oh! Please RESTART!';
              }
              if (score > 0) {
                //document.querySelector('#number').textContent = num; //show 'my number'
                //console.log(score);
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

    //let score = 20;
    let highscore = 0;

    initializer();
    document
      .querySelector('.top #restart')
      .addEventListener('click', async () => {
        //console.log('inside restart button');
        initializer();
      });
  }
});
