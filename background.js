chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "transformToUppercase",
    title: "Transform to Uppercase",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "transformToLowercase",
    title: "Transform to Lowercase",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "transformToCapitalize",
    title: "Capitalize First Letter",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "transformToTitleCase",
    title: "Capitalize First Letter of Each Word",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "copyCoordinates",
    title: "Copy Coordinates",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "openInGoogleMaps",
    title: "Open in Google Maps",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "addLanguageRow",
    title: "Add Language Row",
    contexts: ["page"]
  });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "transformToUppercase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: transformSelectionToUppercase
    });
  } else if (info.menuItemId === "transformToLowercase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: transformSelectionToLowercase
    });
  } else if (info.menuItemId === "transformToCapitalize") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: transformSelectionToCapitalize
    });
  } else if (info.menuItemId === "transformToTitleCase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: transformSelectionToTitleCase
    });
  } else if (info.menuItemId === "copyCoordinates") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyCoordinates
    });
  } else if (info.menuItemId === "openInGoogleMaps") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openInGoogleMaps
    });
  } else if (info.menuItemId === "addLanguageRow") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addLanguageRow
    });
  } else if (info.menuItemId === "changeButtonText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changeButtonText
    });
  }
});

function transformSelectionToUppercase() {
  handleTextTransformation(text => text.toUpperCase());

  function handleTextTransformation(transformFn) {
    const activeElement = document.activeElement;
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const transformed = transformFn(selectedText);

      if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
        const start = activeElement.selectionStart;
        const end = activeElement.selectionEnd;
        activeElement.value = activeElement.value.substring(0, start) + transformed + activeElement.value.substring(end);
        activeElement.setSelectionRange(start, start + transformed.length);
      } else if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, transformed);
      } else {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(transformed);
        range.insertNode(textNode);
        selection.removeAllRanges();
        range.selectNodeContents(textNode);
        selection.addRange(range);
      }
    }
  }
}

function transformSelectionToLowercase() {
  handleTextTransformation(text => text.toLowerCase());

  function handleTextTransformation(transformFn) {
    const activeElement = document.activeElement;
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const transformed = transformFn(selectedText);

      if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
        const start = activeElement.selectionStart;
        const end = activeElement.selectionEnd;
        activeElement.value = activeElement.value.substring(0, start) + transformed + activeElement.value.substring(end);
        activeElement.setSelectionRange(start, start + transformed.length);
      } else if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, transformed);
      } else {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(transformed);
        range.insertNode(textNode);
        selection.removeAllRanges();
        range.selectNodeContents(textNode);
        selection.addRange(range);
      }
    }
  }
}

function transformSelectionToCapitalize() {
  handleTextTransformation(text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());

  function handleTextTransformation(transformFn) {
    const activeElement = document.activeElement;
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const transformed = transformFn(selectedText);

      if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
        const start = activeElement.selectionStart;
        const end = activeElement.selectionEnd;
        activeElement.value = activeElement.value.substring(0, start) + transformed + activeElement.value.substring(end);
        activeElement.setSelectionRange(start, start + transformed.length);
      } else if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, transformed);
      } else {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(transformed);
        range.insertNode(textNode);
        selection.removeAllRanges();
        range.selectNodeContents(textNode);
        selection.addRange(range);
      }
    }
  }
}

function transformSelectionToTitleCase() {
  handleTextTransformation(text => text.replace(/\b\w/g, char => char.toUpperCase()));

  function handleTextTransformation(transformFn) {
    const activeElement = document.activeElement;
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const transformed = transformFn(selectedText);

      if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
        const start = activeElement.selectionStart;
        const end = activeElement.selectionEnd;
        activeElement.value = activeElement.value.substring(0, start) + transformed + activeElement.value.substring(end);
        activeElement.setSelectionRange(start, start + transformed.length);
      } else if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, transformed);
      } else {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(transformed);
        range.insertNode(textNode);
        selection.removeAllRanges();
        range.selectNodeContents(textNode);
        selection.addRange(range);
      }
    }
  }
}

function copyCoordinates() {
  const bodyText = document.body.innerText;
  const latitudeMatch = bodyText.match(/Широта:\s*([\d.]+)/);
  const longitudeMatch = bodyText.match(/Долгота:\s*([\d.]+)/);

  if (latitudeMatch && longitudeMatch) {
    const latitude = latitudeMatch[1];
    const longitude = longitudeMatch[1];
    const coordinates = `Latitude: ${latitude}, Longitude: ${longitude}`;
    
    navigator.clipboard.writeText(coordinates).then(() => {
      alert(`Copied coordinates: ${coordinates}`);
    }).catch(err => {
      console.error('Failed to copy coordinates: ', err);
    });
  } else {
    alert('Coordinates not found');
  }
}

function openInGoogleMaps() {
  const bodyText = document.body.innerText;
  const latitudeMatch = bodyText.match(/Широта:\s*([\d.]+)/);
  const longitudeMatch = bodyText.match(/Долгота:\s*([\d.]+)/);

  if (latitudeMatch && longitudeMatch) {
    const latitude = latitudeMatch[1];
    const longitude = longitudeMatch[1];
    const googleMapsUrl = `https://www.google.ru/maps/place/${latitude},${longitude}`;
    
    window.open(googleMapsUrl, '_blank');
  } else {
    alert('Coordinates not found');
  }
}

function addLanguageRow() {
  // Сначала изменим текст "Рус." на "Анг." и значение языка на "en"
  const buttons = document.querySelectorAll('.button__text');
  buttons.forEach(buttonText => {
    console.log(`Found button text: ${buttonText.innerText}`);
    if (buttonText.innerText.trim() === 'Рус.') {
      buttonText.innerText = 'Анг.';
      console.log('Button text changed to "Анг."');
    } else {
      console.log(`Button text is not "Рус.": ${buttonText.innerText}`);
    }
  });

  if (buttons.length === 0) {
    console.log('No buttons with class "button__text" found');
  }

  const langFieldsEn = document.querySelectorAll('.select__control[name="lang"]');
  langFieldsEn.forEach(field => {
    if (field.value === 'ru') {
      field.value = 'en';
      field.dispatchEvent(new Event('change'));
      console.log('Language field changed to "en"');
    }
  });

  // Сохраним исходные поля с именем "type"
  const originalTypeFields = new Set();
  document.querySelectorAll('.select__control[name="type"]').forEach(field => {
    originalTypeFields.add(field);
  });

  // Сохраним исходные кнопки "Названия"
  const originalNameButtons = new Set();
  document.querySelectorAll('.button__text').forEach(button => {
    if (button.innerText.trim() === 'Названия') {
      originalNameButtons.add(button);
    }
  });

  // Нажмем первый раз на плюсик
  const addButton = document.querySelector('.card-section__icon-add.card-section__add');
  if (addButton) {
    addButton.click();
    setTimeout(() => {
      // Изменим текст "Рус." на "Тур." и значение языка на "tr"
      const buttonsAfterFirstClick = document.querySelectorAll('.button__text');
      buttonsAfterFirstClick.forEach(buttonText => {
        console.log(`After first click found button text: ${buttonText.innerText}`);
        if (buttonText.innerText.trim() === 'Рус.') {
          buttonText.innerText = 'Тур.';
          console.log('Button text changed to "Тур."');
        } else {
          console.log(`Button text is not "Рус.": ${buttonText.innerText}`);
        }
      });

      const langFieldsTr = document.querySelectorAll('.select__control[name="lang"]');
      langFieldsTr.forEach(field => {
        if (field.value === 'ru') {
          field.value = 'tr';
          field.dispatchEvent(new Event('change'));
          console.log('Language field changed to "tr"');
        }
      });

      // Изменим только новые поля ввода "Названия" на "Короткие"
      const newTypeFields = document.querySelectorAll('.select__control[name="type"]');
      newTypeFields.forEach(field => {
        if (field.value === 'main' && !originalTypeFields.has(field)) {
          field.value = 'short';
          field.dispatchEvent(new Event('change'));
          console.log('Type field changed to "short"');
        }
      });

      const newNameButtons = document.querySelectorAll('.button__text');
      newNameButtons.forEach(button => {
        if (button.innerText.trim() === 'Названия' && !originalNameButtons.has(button)) {
          button.innerText = 'Короткие';
          console.log('Button text changed to "Короткие"');
        }
      });

      // Нажмем второй раз на плюсик
      addButton.click();
      setTimeout(() => {
        // Изменим текст "Рус." на "Анг." и значение языка на "en"
        const buttonsAfterSecondClick = document.querySelectorAll('.button__text');
        buttonsAfterSecondClick.forEach(buttonText => {
          console.log(`After second click found button text: ${buttonText.innerText}`);
          if (buttonText.innerText.trim() === 'Рус.') {
            buttonText.innerText = 'Анг.';
            console.log('Button text changed to "Анг."');
          } else {
            console.log(`Button text is not "Рус.": ${buttonText.innerText}`);
          }
        });

        const langFieldsEnAgain = document.querySelectorAll('.select__control[name="lang"]');
        langFieldsEnAgain.forEach(field => {
          if (field.value === 'ru') {
            field.value = 'en';
            field.dispatchEvent(new Event('change'));
            console.log('Language field changed to "en"');
          }
        });

        // Изменим только новые поля ввода "Названия" на "Короткие"
        const newTypeFieldsAgain = document.querySelectorAll('.select__control[name="type"]');
        newTypeFieldsAgain.forEach(field => {
          if (field.value === 'main' && !originalTypeFields.has(field)) {
            field.value = 'short';
            field.dispatchEvent(new Event('change'));
            console.log('Type field changed to "short"');
          }
        });

        const newNameButtonsAgain = document.querySelectorAll('.button__text');
        newNameButtonsAgain.forEach(button => {
          if (button.innerText.trim() === 'Названия' && !originalNameButtons.has(button)) {
            button.innerText = 'Короткие';
            console.log('Button text changed to "Короткие"');
          }
        });
      }, 1000); // Wait for 1 second to allow the new field to be added
    }, 500); // Wait for 0.5 second before second click
  } else {
    alert('Add button not found');
  }
}
