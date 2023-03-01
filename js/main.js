let budgetInp = document.querySelector('.forms #budget');
let expenseInp = document.querySelector('.forms #expense');
let amountInp = document.querySelector('.forms #amount');
let calcInp = document.querySelector('.forms .calc');
let addInp = document.querySelector('.forms .add');
let budgetValue = document.querySelector('.outPut .budget .mony');
let expenseValue = document.querySelector('.outPut .expense .mony');
let balanceValue = document.querySelector('.outPut .balance .mony');
let expense;
let balance;
let budget;
/* Budget Start */

//
// !localStorage.getItem('budget')
//   ? (budget = 0)
//   : (budget = Number(localStorage.getItem('budget')));

// si ils ont il vont venir
if (!localStorage.getItem('budget') == true) {
  budget = 0;
} else {
  budget = localStorage.getItem('budget');
  budgetValue.innerText = `${localStorage.getItem('budget')}$`;
  disable();
  balancees();
}
if (!localStorage.getItem('expense') == true) {
  expense = 0;
} else {
  expense = localStorage.getItem('expense');
  expenseValue.innerText = `${localStorage.getItem('expense')}$`;
  balancees();
}
calcInp.addEventListener('click', () => {
  if (budgetInp.value == '') return;
  if (budgetInp.value <= 0) return;
  if (!localStorage.getItem('budget') == true) {
    budget = Number(budgetInp.value);
    localStorage.setItem('budget', budget);
  } else {
    localStorage.removeItem('budget');
    budget = Number(budgetInp.value);
    localStorage.setItem('budget', budget);
  }
  budgetValue.innerText = `${localStorage.getItem('budget')}$`;

  disable();
  balancees();
});

function styleBudeget() {
  if (Number(budget) > Number(expense)) {
    budgetValue.style.cssText = `color: #fff;`;
  } else {
    budgetValue.style.cssText = `color: #fff;`;
  }
}
function disable() {
  if (!localStorage.getItem('budget') == true) {
    return;
  } else {
    document.forms[1].style.cssText = `
    pointer-events: all;
    opacity: 1;`;
  }
}
function balancees() {
  balance = Number(
    localStorage.getItem('budget') - Number(localStorage.getItem('expense'))
  );
  localStorage.setItem('balance', balance);
  balanceValue.innerText = `${balance}$`;
  if (balance < 0) {
    balanceValue.style.color = 'red';
  } else {
    balanceValue.style.color = '#03ac13';
  }
}

/* Budget End */

/* add function */

let expenseInpValue;

addInp.addEventListener('click', () => {
  if (expenseInp.value == '') return;
  if (amountInp.value == '') return;
  if (amountInp.value <= 0) return;
  for (let i = 0; i < localStorage.length; i++) {
    if (expenseInp.value == localStorage.key(i)) {
      alert('you cant add the same epense with the same title');
      return
    }
  }
  if (!localStorage.getItem('expense') == true) {
    expense = Number(amountInp.value);
    localStorage.setItem('expense', expense);
  } else {
    expense = localStorage.getItem('expense');
    localStorage.removeItem('expense');
    expense = Number(expense) + Number(amountInp.value);
    localStorage.setItem('expense', expense);
  }

  expenseValue.innerText = `${localStorage.getItem('expense')}$`;
  expenseValue.style.cssText = `color: red;`;
  /* creat elements */
  let title = expenseInp.value;
  let tr = document.createElement('tr');
  let titleTd = document.createElement('td');
  titleTd.innerText = `${title}`;
  tr.append(titleTd);
  let valueTd = document.createElement('td');
  let titleValue = amountInp.value;
  valueTd.innerText = `${titleValue}`;
  titleTd.after(valueTd);
  let icons = document.createElement('td');
  icons.innerHTML = `
  <span class="edit"><i class="fa-solid fa-pen-to-square"></i></span>
  <span class="delete"><i class="fa-solid fa-trash-can"></i></span>
  `;
  valueTd.after(icons);
  document.querySelector('.outPut table').append(tr);
  localStorage.setItem(title, titleValue);
  // expenseInp.value = '';
  // amountInp.value = 0;
  tr.style.color = 'red';
  // tr.children[2].style.color = 'white';
  let deleteBtn = document.querySelectorAll('tr td .delete');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      let title =
        btn.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      let tr = btn.parentElement.parentElement;
      expense = localStorage.getItem('expense') - localStorage.getItem(title);
      localStorage.removeItem('expense');
      localStorage.setItem('expense', expense);
      expenseValue.innerText = `${localStorage.getItem('expense')}$`;
      tr.remove();
      localStorage.removeItem(title);
      balancees();
    });
  });
  let editBtn = document.querySelectorAll('tr td .edit');
  editBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      let title =
        btn.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      expenseInp.value = title;
      amountInp.value = btn.parentElement.previousElementSibling.textContent;
      let deletei = btn.nextElementSibling;
      deletei.click();
    });
  });
});
for (let i = 0; i < localStorage.length; i++) {
  if (
    localStorage.key(i) == 'budget' ||
    localStorage.key(i) == 'expense' ||
    localStorage.key(i) == 'balance'
  ) {
    continue;
  }
  let title = localStorage.key(i);
  let tr = document.createElement('tr');
  let titleTd = document.createElement('td');
  titleTd.innerText = `${title}`;
  tr.append(titleTd);
  let valueTd = document.createElement('td');
  let titleValue = localStorage.getItem(localStorage.key(i));
  valueTd.innerText = `${titleValue}`;
  titleTd.after(valueTd);
  let icons = document.createElement('td');
  icons.innerHTML = `
  <span class="edit"><i class="fa-solid fa-pen-to-square"></i></span>
  <span class="delete"><i class="fa-solid fa-trash-can"></i></span>
  `;
  valueTd.after(icons);
  document.querySelector('.outPut table').append(tr);
  tr.style.color = 'red';
}

let deleteBtn = document.querySelectorAll('tr td .delete');
deleteBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    let title =
      btn.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    let tr = btn.parentElement.parentElement;
    expense = localStorage.getItem('expense') - localStorage.getItem(title);
    localStorage.removeItem('expense');
    localStorage.setItem('expense', expense);
    expenseValue.innerText = `${localStorage.getItem('expense')}`;
    tr.remove();
    localStorage.removeItem(title);
    balancees();
  });
});

let editBtn = document.querySelectorAll('tr td .edit');
editBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    let title =
      btn.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    expenseInp.value = title;
    amountInp.value = btn.parentElement.previousElementSibling.textContent;
    let deletei = btn.nextElementSibling;
    deletei.click();
  });
});

let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  localStorage.clear();
  deleteBtn.forEach((btn) => {
    btn.click();
  });
  expenseValue.innerText = `0$`;
  budgetValue.innerText = `0$`;
  balanceValue.innerText = `0$`;
  document.forms[1].style.cssText = `
  pointer-events: none;
  opacity: .3;`;
});
