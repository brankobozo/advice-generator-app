"use strict";
const adviceNum = document.querySelector(".num");
const adviceText = document.querySelector(".advice__text");
const btn = document.querySelector(".advice__btn");

const getJSON = async function (url, errorMsg = "Something went wrong") {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error("Something went wrong! No advice found! 😢");
  return await response.json();
};

const clear = () => {
  adviceNum.textContent = "";
  adviceText.textContent = "";
};

const renderAdvice = advice => {
  clear();
  adviceNum.textContent = advice.id;
  adviceText.textContent = advice.advice;
};
const renderError = err => {
  clear();
  adviceText.textContent = err;
};

const getAdvice = function () {
  getJSON("https://api.adviceslip.com/advice")
    .then(res => {
      const advice = res.slip;
      renderAdvice(advice);
    })
    .catch(err => {
      renderError(err);
    });
};

getAdvice();

btn.addEventListener("click", getAdvice);
