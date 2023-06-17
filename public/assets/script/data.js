// This function updates the drop down using the data file

function updateDropDown(sourceData, sourceColHeader, targetElementID, conditionColHeader, conditionVal) {
    fetch(sourceData)
      .then((response) => response.json())
      .then((data) => {
        try {
          var element = document.getElementById(targetElementID);
          var uniqueValues = new Set();
          data.forEach((item) => {
            var value = item[sourceColHeader];
            if (!uniqueValues.has(value)) {
              if (item[conditionColHeader] == conditionVal) {
                var option = document.createElement('option');
                option.text = value;
                element.appendChild(option);
                uniqueValues.add(value); // Add value to Set
              }
            }
          });
          element.selectedIndex = 0;
        } catch (err) {
          console.log(err.message);
        }
      });
  }
  
  // This function updates the dependent drop down
  function updateDependentDropDown(sourceData, parentColHeader, dependentColHeader, parentElementId, dependantElementId) {
    fetch(sourceData)
      .then((response) => response.json())
      .then((data) => {
        try {
          var parentElement = document.getElementById(parentElementId);
          var dependantElement = document.getElementById(dependantElementId);
          parentElement.addEventListener('change', function () {
            var selectedParent = parentElement.value;
            var values = [];
            data.forEach((item) => {
              if (item[parentColHeader] === selectedParent) {
                values.push(item[dependentColHeader]);
              }
            });
            if (values.length > 1) {
              dependantElement.length = 1;
              values.forEach((item) => {
                var option = document.createElement('option');
                option.text = item;
                dependantElement.appendChild(option);
                dependantElement.selectedIndex = 0;
              });
            } else {
              dependantElement.value = values[0];
            }
          });
        } catch (err) {
          console.log(err.message);
        }
      });
  }
  
  // Get current date and time
  function getDateTime() {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }
  
  // Update the current date and time in the local datetime field
  window.onload = function () {
    document.getElementById('date').value = getDateTime();
  };
  
  // Expense & Income & Transfer
  updateDropDown('data/currency_data.json', 'code', 'currency');
  updateDropDown('data/currency_data.json', 'code', 'w_currency');
  updateDropDown('data/account_data.json', 'account', 'account', 'hide', 'No');
  updateDependentDropDown('data/account_data.json', 'account', 'base_currency', 'account', 'currency');
  updateDependentDropDown('data/account_data.json', 'account', 'base_currency', 'account', 'w_currency');
  
  // Expense
  updateDropDown('data/category_data.json', 'category', 'exp_category', 'transaction_type', 'Expense');
  updateDependentDropDown('data/category_data.json', 'category', 'sub_category', 'exp_category', 'sub_category');
  
  // Income
  updateDropDown('data/category_data.json', 'category', 'inc_category', 'transaction_type', 'Income');
  updateDependentDropDown('data/category_data.json', 'category', 'sub_category', 'inc_category', 'sub_category');
  
  // Transfer
  updateDropDown('data/currency_data.json', 'code', 'tw_currency');
  updateDropDown('data/currency_data.json', 'code', 'fw_currency');
  updateDropDown('data/account_data.json', 'account', 'from_account', 'hide', 'No');
  updateDropDown('data/account_data.json', 'account', 'to_account', 'hide', 'No');
  updateDependentDropDown('data/account_data.json', 'account', 'base_currency', 'to_account', 'tw_currency');
  