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
    const coordinates = `${latitude}, ${longitude}`;
    
    navigator.clipboard.writeText(coordinates).then(() => {
      alert(`Скопированы координаты: ${coordinates}`);
    }).catch(err => {
      console.error('Не удалось скопировать координаты: ', err);
    });
  } else {
    alert('Координаты не найдены!');
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
    alert('Координаты не найдены!');
  }
}

function addLanguageRow() {
  const formSelector = '.card-section.card-section_view_names.card-section_write.company-info__section.island.island_theme_islands.form.i-bem.card-section_js_inited.company-info__section_js_inited.card-section_edit';

  // Функция для изменения текста "Рус." на целевой текст внутри указанной формы
  function changeLastRusTextTo(targetText) {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const buttons = Array.from(form.querySelectorAll('.button__text'));
    const rusButtons = buttons.filter(button => button.innerText.trim() === 'Рус.');
    console.log(`Found ${rusButtons.length} buttons with text "Рус." inside the target form`);

    rusButtons.forEach((button, index) => {
      console.log(`Button ${index + 1}: ${button.outerHTML}`);
    });

    if (rusButtons.length > 0) {
      const lastRusButton = rusButtons[rusButtons.length - 1];
      console.log(`Changing button text "${lastRusButton.innerText}" to "${targetText}"`);
      lastRusButton.innerText = targetText;
      console.log(`Last button text changed to "${targetText}"`);
    } else {
      console.log('No button with text "Рус." found to change');
    }
  }

  // Функция для изменения значения языка "ru" на целевое значение внутри указанной формы
  function changeLastRusFieldTo(langValue) {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const langFields = Array.from(form.querySelectorAll('.select__control[name="lang"]'));
    console.log(`Total language fields inside the form: ${langFields.length}`);
    langFields.forEach((field, index) => {
      console.log(`Language field ${index + 1}: ${field.outerHTML}`);
    });

    const rusLangFields = langFields.filter(field => field.value === 'ru' && isVisible(field));
    console.log(`Found ${rusLangFields.length} visible language fields with value "ru" inside the target form`);

    rusLangFields.forEach((field, index) => {
      console.log(`Lang field ${index + 1}: ${field.outerHTML}`);
    });

    if (rusLangFields.length > 0) {
      const lastRusLangField = rusLangFields[rusLangFields.length - 1];
      console.log(`Changing language field value "${lastRusLangField.value}" to "${langValue}"`);
      lastRusLangField.value = langValue;
      lastRusLangField.dispatchEvent(new Event('change'));
      console.log(`Last language field changed to "${langValue}"`);
    } else {
      console.log('No visible "ru" language field found to change');
    }
  }

  // Функция для изменения значения типа "main" на "short" внутри указанной формы
  function changeLastTypeFieldToShort() {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const typeFields = Array.from(form.querySelectorAll('.select__control[name="type"]'));
    console.log(`Total type fields inside the form: ${typeFields.length}`);
    typeFields.forEach((field, index) => {
      console.log(`Type field ${index + 1}: ${field.outerHTML}`);
    });

    const mainTypeFields = typeFields.filter(field => field.value === 'main' && isVisible(field));
    console.log(`Found ${mainTypeFields.length} visible type fields with value "main" inside the target form`);

    mainTypeFields.forEach((field, index) => {
      console.log(`Type field ${index + 1}: ${field.outerHTML}`);
    });

    if (mainTypeFields.length > 0) {
      const lastMainTypeField = mainTypeFields[mainTypeFields.length - 1];
      console.log(`Changing type field value "${lastMainTypeField.value}" to "short"`);
      lastMainTypeField.value = 'short';
      lastMainTypeField.dispatchEvent(new Event('change'));
      console.log(`Last type field changed to "short"`);
    } else {
      console.log('No visible "main" type field found to change');
    }
  }

  // Функция для изменения текста "Названия" на "Короткие" внутри указанной формы
  function changeLastNameTextToShort() {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const nameButtons = Array.from(form.querySelectorAll('.button__text'));
    const nameFields = nameButtons.filter(button => button.innerText.trim() === 'Названия');
    console.log(`Found ${nameFields.length} buttons with text "Названия" inside the target form`);

    nameFields.forEach((button, index) => {
      console.log(`Name field ${index + 1}: ${button.outerHTML}`);
    });

    if (nameFields.length > 0) {
      const lastNameField = nameFields[nameFields.length - 1];
      console.log(`Changing name field text "${lastNameField.innerText}" to "Короткие"`);
      lastNameField.innerText = 'Короткие';
      console.log(`Last name field text changed to "Короткие"`);
    } else {
      console.log('No button with text "Названия" found to change');
    }
  }

  // Проверка, виден ли элемент
  function isVisible(element) {
    return !(element.style.display === 'none' || element.style.visibility === 'hidden');
  }

  // Сохраним исходные поля с именем "type" и "button__text" внутри формы
  const form = document.querySelector(formSelector);
  if (!form) {
    console.log('Target form not found');
    return;
  }

  const originalTypeFields = new Set(form.querySelectorAll('.select__control[name="type"]'));
  const originalNameButtons = new Set(form.querySelectorAll('.button__text'));

  // Шаг 1: Меняем последнюю строку "Рус." на "Тур.", "ru" на "tr" и "main" на "short"
  changeLastRusTextTo('Тур.');
  changeLastRusFieldTo('tr');
  changeLastTypeFieldToShort();
  changeLastNameTextToShort();

  // Нажмем первый раз на плюсик
  const addButton = form.querySelector('.card-section__icon-add.card-section__add');
  if (addButton) {
    console.log('First click on add button');
    addButton.click();
    setTimeout(() => {
      // Шаг 2: Меняем "Рус." на "Анг." и "ru" на "en"
      changeLastRusTextTo('Анг.');
      changeLastRusFieldTo('en');

      // Нажмем второй раз на плюсик
      console.log('Second click on add button');
      addButton.click();
      setTimeout(() => {
        // Шаг 3: Меняем "Рус." на "Анг.", "ru" на "en" и "main" на "short"
        changeLastRusTextTo('Анг.');
        changeLastRusFieldTo('en');
        changeLastTypeFieldToShort();
        changeLastNameTextToShort();
      }, 1500); // Wait for 1.5 seconds to allow the new field to be added
    }, 1500); // Wait for 1.5 seconds before second click
  } else {
    alert('Add button not found');
  }
}