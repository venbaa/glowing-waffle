function validateForm(formName) {
    const form = document.getElementById(formName);
    const inputs = form.querySelectorAll('input, select, textarea');
    let isFormValid = true;
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.required && !input.value) {
        isFormValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    }
  
    if (!isFormValid) {
      document.getElementById('alert').classList.remove('visually-hidden');
      return;
    }
  
    return 'true';
  }
  
  Telegram.WebApp.MainButton.onClick(() => {
    console.log(title);
    if (title == 'Expense') {
      var validationStatus = validateForm('expense-form');
      if (validationStatus) {
        var expenseData = {
          form: title,
          date: date.value,
          amount: value.value,
          account: account.value,
          currency: currency.value,
          w_currency: w_currency.value,
          category: exp_category.value,
          sub_category: sub_category.value,
          notes: vendor.value,
          description: description.value,
        };
        Telegram.WebApp.sendData(JSON.stringify(expenseData));
      }
    } else if (title == 'Income') {
      var validationStatus = validateForm('income-form');
      if (validationStatus) {
        var incomeData = {
          form: title,
          date: date.value,
          amount: value.value,
          account: account.value,
          currency: currency.value,
          w_currency: w_currency.value,
          category: inc_category.value,
          sub_category: sub_category.value,
          notes: notes.value,
          description: description.value,
        };
        Telegram.WebApp.sendData(JSON.stringify(incomeData));
      }
    } else if (title == 'Transfer') {
      var validationStatus = validateForm('transfer-form');
      if (validationStatus) {
        var transferData = {
          form: title,
          date: date.value,
          amount: value.value,
          from_account: account.value,
          to_account: to_account.value,
          currency: currency.value,
          w_currency: w_currency.value,
          tw_currency: tw_currency.value,
          notes: notes.value,
          description: description.value,
        };
        Telegram.WebApp.sendData(JSON.stringify(transferData));
      }
    }
  });
  