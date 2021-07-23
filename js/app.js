const forms = document.querySelectorAll("form");
const table = document.querySelector(".table");
const tbody = document.querySelector("tbody");
const nameInput = document.querySelector("#name");
const dateInput = document.querySelector("#date");
const valueInput = document.querySelector("#value");
const submitButton = document.querySelector("button");
const modal = document.querySelector(".modal");
const modalCurrencyInput = document.querySelector(".modalInput");
const modalButton = document.querySelector(".modalButton");
const totalExpensesDiv = document.querySelector(".totalExpensesContainer");
const totalExpenses = document.querySelector(".totalExpenses");
const inputs = [nameInput, dateInput, valueInput];
let currency;

if (!document.cookie) {
  modal.style.visibility = "visible";
  modalButton.addEventListener("click", () => {
    if (modalCurrencyInput.value === "") {
      modalCurrencyInput.classList.add("invalidInput");
    } else {
      document.cookie = `currency=${modalCurrencyInput.value}`;
      modal.style.visibility = "hidden";
      window.location.reload();
    }
  });
}

currency = document.cookie;
currency = currency.split("=")[1];

const createTableElements = (name, date, value) => {
  const tableRow = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  td1.innerText = name;
  td2.innerText = moment(date).format("ll");
  td3.innerText = `${value} ${currency}`;
  td4.innerText = "Delete";
  tableRow.appendChild(td1);
  tableRow.appendChild(td2);
  tableRow.appendChild(td3);
  tableRow.appendChild(td4);
  table.appendChild(tableRow);
  tbody.appendChild(tableRow);

  td4.addEventListener("click", (e) => {
    const expenseToRemove = e.path[1].children[0].innerText;
    tableRow.remove();
    window.localStorage.removeItem(expenseToRemove);
  });
};

for (let [key] of Object.entries(localStorage)) {
  const result = JSON.parse(window.localStorage.getItem(key));
  totalExpensesValue += Number(result.value);
  createTableElements(result.name, result.date, result.value);
}

const formValidator = () => {
  for (const input of inputs) {
    if (input.value === "") {
      input.classList.add("invalidInput");
    } else {
      input.classList.remove("invalidInput");
    }
  }
};

submitButton.addEventListener("click", () => {
  forms.forEach((form) => {
    form.addEventListener("submit", () => {
      forms[0].submit();
      forms[1].submit();
    });
  });

  for (const input of inputs) {
    if (input.value == "") {
      formValidator();
      return false;
    }
  }

  createTableElements(nameInput.value, dateInput.value, valueInput.value);
  const expenseData = {
    name: nameInput.value,
    date: dateInput.value,
    value: `${valueInput.value}`,
  };

  window.localStorage.setItem(
    `${nameInput.value}`,
    JSON.stringify(expenseData)
  );

  for (const input of inputs) {
    input.value = "";
  }
});
