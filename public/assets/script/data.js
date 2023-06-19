// Retrieve the encryption key and IV from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key');
const ivString = urlParams.get('iv');
const iv = CryptoJS.enc.Hex.parse(ivString);

// function encryptData(jsonFile) {
//   fetch(jsonFile)
//     .then((response) => response.text())
//     .then((jsonData) => {
//       const jsonString = jsonData;
//       var encryptedData = CryptoJS.AES.encrypt(jsonString, key, { iv: iv }).toString();
//       USER_PROPERTIES.setProperty('iv', iv.toString());
//       console.log(encryptedData);
//       return encryptedData;
//     })
//     .catch((e) => console.error(e));
// }

async function decryptData(encFile) {
  try {
    const response = await fetch(encFile);
    const encData = await response.text();
    var decryptedData = CryptoJS.AES.decrypt(encData, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    decryptedJson = JSON.parse(decryptedData);
    // console.log(decryptedJson);
    return decryptedJson;
  } catch (error) {
    console.error(error);
  }
}

function getDecryptedData(encryptedFile) {
  decryptData(encryptedFile)
    .then((decryptedJson) => {
      return decryptedJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateDropDown(data, sourceColHeader, targetElementID, conditionColHeader, conditionVal) {
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
}

// This function updates the dependent drop down
function updateDependentDropDown(data, parentColHeader, dependentColHeader, parentElementId, dependantElementId) {
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
}

decryptData('data/account_data.txt')
  .then((decryptedData) => {
    updateDropDown(decryptedData, 'account', 'account', 'hide', 'No');
    updateDropDown(decryptedData, 'account', 'from_account', 'hide', 'No');
    updateDropDown(decryptedData, 'account', 'to_account', 'hide', 'No');
    updateDependentDropDown(decryptedData, 'account', 'base_currency', 'account', 'currency');
    updateDependentDropDown(decryptedData, 'account', 'base_currency', 'account', 'w_currency');
    updateDependentDropDown(decryptedData, 'account', 'base_currency', 'to_account', 'tw_currency');
  })
  .catch((error) => {
    console.error(error);
  });

decryptData('data/currency_data.txt')
  .then((decryptedData) => {
    updateDropDown(decryptedData, 'code', 'currency');
    updateDropDown(decryptedData, 'code', 'w_currency');
    updateDropDown(decryptedData, 'code', 'tw_currency');
    updateDropDown(decryptedData, 'code', 'fw_currency');
  })
  .catch((error) => {
    console.error(error);
  });

decryptData('data/category_data.txt')
  .then((decryptedData) => {
    updateDropDown(decryptedData, 'category', 'exp_category', 'transaction_type', 'Expense');
    updateDropDown(decryptedData, 'category', 'inc_category', 'transaction_type', 'Income');
    updateDependentDropDown(decryptedData, 'category', 'sub_category', 'exp_category', 'sub_category');
    updateDependentDropDown(decryptedData, 'category', 'sub_category', 'inc_category', 'sub_category');
  })
  .catch((error) => {
    console.error(error);
  });

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
