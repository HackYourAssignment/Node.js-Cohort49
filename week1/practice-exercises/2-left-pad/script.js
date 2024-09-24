/**
 ** Exercise 2: To the left, to the left...
 *
 * In this file use the left-pad package to
 * pad the numbers to 8 characters and log them to the console
 *
 */

const leftPad = require("left-pad");

let numbers = ["12", "846", "2", "1236"];

// Pad each number to a length of 8 using spaces and log it
numbers.forEach((number) => {
  console.log(leftPad(number, 8, " "));
});
