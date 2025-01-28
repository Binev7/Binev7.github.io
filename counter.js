    const counterDisplay = document.getElementById('counter');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    const resetButton = document.getElementById('reset');

    let counter = 0;

    incrementButton.addEventListener('click', () => {
      counter++;
      counterDisplay.textContent = counter;
    });

    decrementButton.addEventListener('click', () => {
      counter--;
      counterDisplay.textContent = counter;
    });

    resetButton.addEventListener('click', () => {
      counter = 0;
      counterDisplay.textContent = counter;
    });
  