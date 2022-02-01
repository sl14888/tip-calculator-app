// находим все инпуты
const inputDollar = document.querySelector('[data-input-dollar]');
const inputPeople = document.querySelector('[data-input-people]');
const inputCustom = document.querySelector('.splitter__btn-custom');

// результат
const tipAmount = document.querySelector('#tipAmount span');
const totalAmount = document.querySelector('#total span');

// кнопка сброса
const btnRest = document.querySelector('.splitter__btn-rest');

// глобальные переменные для проверки подсчета
let dollar = 0;
let people = 0;
let btnValue = 0;

// функция подсчета кастомной кнопки
function getCustom() {
  let custom;
  inputCustom.addEventListener('input', function () {
    custom = inputCustom.value;
    btnValue = custom;
    calculateAll(btnValue);
  });
}
// функция подсчета и вывода значений
function calculateAll(btnValue) {
  if (dollar != 0 && people != 0 && btnValue != 0) {
    tipAmount.innerText = ((dollar * (btnValue / 100)) / people).toFixed(2);
    totalAmount.innerText = (dollar / people + parseInt(tipAmount.innerText)).toFixed(2);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // значение инпутов
  inputDollar.addEventListener('input', function () {
    dollar = inputDollar.value;
  });

  inputPeople.addEventListener('input', function () {
    people = inputPeople.value;
  });

  // добовление класса active для изменения цвета кнопки
  const selectors = document.querySelectorAll('.splitter__btn');
  // функция обнуления инпутов
  btnRest.onclick = () => {
    inputDollar.value = 0;
    inputPeople.value = 0;
    inputCustom.value = '';
    selectors.forEach((select) => select.classList.remove('splitter__btn--active'));
    totalAmount.innerText = '0.00';
    tipAmount.innerText = '0.00';
  };
  selectors.forEach((select) => {
    select.addEventListener('click', function () {
      selectors.forEach((activity) => activity.classList.remove('splitter__btn--active'));
      select.classList.add('splitter__btn--active');
      calculateAll(btnValue);
      // проверка на выбор кнопки 'custom'
      if (select.innerText === '') {
        getCustom();
        // проверка на изменения в инпутах
        inputDollar.oninput = () => calculateAll(btnValue);
        inputPeople.oninput = () => calculateAll(btnValue);
      } else if (select.innerText !== '') {
        btnValue = parseInt(select.textContent);
        inputDollar.oninput = () => calculateAll(btnValue);
        inputPeople.oninput = () => calculateAll(btnValue);
      }
    });
  });
});
