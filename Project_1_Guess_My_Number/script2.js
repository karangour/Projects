document.addEventListener('readystatechange', function () {
  // let page load before js logic starts.
  if (document.readyState === 'complete') {
    // once it's loaded..

    const secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('#number').textContent = secretNumber;

    document
      .querySelector('#button-check')
      .addEventListener('click', function () {
        let message = document.querySelector('.start-guessing');
        const guess = Number(document.querySelector('#type').value);
        if (!guess) {
          //ALWAYS check if there is no value and 'Check' has been pressed. Good to do this whenever asking for input.
          message.textContent = 'No Number!';
        } else if (guess === secretNumber) {
          message.textContent = 'Correct Number!';
        } else if (guess > secretNumber) {
          message.textContent = 'Too high!';
        } else if (guess < secretNumber) {
            message.textContent = 'Too low!'
        }
      });
  }
});
