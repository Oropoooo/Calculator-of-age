const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day = document.querySelector(".output-day");
const submit_btn = document.querySelector(".submit-btn");

let isValid = false;
const input_year = document.querySelector("#year");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");

const error_day = document.querySelector(".error-day");
const error_month = document.querySelector(".error-month");
const error_year = document.querySelector(".error-year");

submit_btn.addEventListener("click", CalculateDate);

function isValidDate(d, m, y) {
  if (y < 1755 || y > new Date().getFullYear()) return false;
  if (m < 1 || m > 12) return false;
  let daysInMonth = new Date(y, m, 0).getDate();
  if (d < 1 || d > daysInMonth) return false;
  return true;
}

function calculateFullAge(birthday) {
  let today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  let months = today.getMonth() - birthday.getMonth();
  let days = today.getDate() - birthday.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    age--;
    months += 12;
  }

  return {
    years: age,
    months: months,
    days: days
  };
}

function CalculateDate() {
  error_day.textContent = '';
  error_month.textContent = '';
  error_year.textContent = '';

  let day = +input_day.value, month = +input_month.value, year = +input_year.value;
  if (day && month && year && isValidDate(day, month, year)) {
    let birthday = new Date(year, month - 1, day);
    let fullAge = calculateFullAge(birthday);
    output_year.textContent = fullAge.years;
    output_month.textContent = fullAge.months;
    output_day.textContent = fullAge.days;
    isValid = true;
  } else {
    if (!day) error_day.textContent = 'This field is required.';
    else if (!isValidDate(day, 1, 1990)) error_day.textContent = 'Invalid day';

    if (!month) error_month.textContent = 'This field is required.';
    else if (!isValidDate(1, month, 1990)) error_month.textContent = 'Invalid month';

    if (!year) error_year.textContent = 'This field is required.';
    else if (!isValidDate(1, 1, year)) error_year.textContent = 'Invalid year';
    
    isValid = false;
  }
}

input_day.addEventListener("change", function() { validateInput(input_day, error_day); });
input_month.addEventListener("change", function() { validateInput(input_month, error_month); });
input_year.addEventListener("change", function() { validateInput(input_year, error_year); });

function validateInput(input, errorElement) {
  let day = +input_day.value, month = +input_month.value, year = +input_year.value;
  
  if (input === input_day && !isValidDate(day, 1, 1990)) {
    errorElement.textContent = "Invalid day";
    isValid = false;
  } else if (input === input_month && !isValidDate(1, month, 1990)) {
    errorElement.textContent = "Invalid month";
    isValid = false;
  } else if (input === input_year && !isValidDate(1, 1, year)) {
    errorElement.textContent = "Invalid year";
    isValid = false;
  } else {
    errorElement.textContent = "";
    isValid = true;
  }
}
