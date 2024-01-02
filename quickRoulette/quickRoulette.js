const totalAmount = 5000;
let bet1 = 50;
let bet2 = 70;

let total = totalAmount;
let number;
let best = 0;
let grandTotal = 0;

for (i = 0; i < 1000; i++) {
  number = Math.floor(Math.random() * 100) % 37;
  total -= bet1 * 3 + bet2 * 2;
  if (total <= 0) break;
  if ((number > 0 && number < 13) || (number > 24 && number < 31))
    total += bet1 * 6;
  else if (number > 12 && number < 27) total += bet2 * 6;
  console.log(`The number is ${number}  Total is ${total}`);
}
grandTotal = total - totalAmount;
if (total <= 0) {
  console.log(`On spin ${i} you lost all your cash`);
}

console.log(grandTotal);



