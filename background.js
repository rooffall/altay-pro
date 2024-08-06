chrome.runtime.onInstalled.addListener(() => {
  // Список основных меню.

  chrome.contextMenus.create({
    id: "transformText",
    title: "Редактор текста",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "autoCard",
    title: "Редактирование карточки",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "coordinates",
    title: "Работа с координатами",
    contexts: ["page"]
  });

  //////////////////////// ПОДМЕНЮ ///////////////////////


  //////////////////////
  ////////////////////// autoCard menu

  chrome.contextMenus.create({
    id: "addNameRow",
    title: "Создание строчек для названий",
    parentId: "autoCard",
    contexts: ["page"]
  });


  ////////////////////// autoFill name menu

  // Создаем подменю
  chrome.contextMenus.create({
    id: "autoFillRowNames",
    title: "Автоматическое заполнение названий",
    parentId: "autoCard",
    contexts: ["all"]
  });

  // Создаем подменю для автоматического заполнения названий
  chrome.contextMenus.create({
    id: "autoFillNames",
    title: "Автоматически заполнить названия без перевода",
    parentId: "autoFillRowNames",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "autoFillNamesWithTranslation",
    title: "Автоматически заполнить названия с переводом",
    parentId: "autoFillRowNames",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "manualFillNames",
    title: "Ручное заполнение названий по выделенному слову",
    parentId: "autoFillRowNames",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "manualFillShortNames",
    title: "Ручное заполнение коротких названий по выделенному слову",
    parentId: "autoFillRowNames",
    contexts: ["selection"]
  });


  //////////////////////
  ////////////////////// transformText menu

  chrome.contextMenus.create({
    id: "transformToUppercase",
    title: "Преобразовать в заглавные",
    parentId: "transformText",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "transformToLowercase",
    title: "Преобразовать в строчные",
    parentId: "transformText",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "transformToCapitalize",
    title: "Первая буква заглавная",
    parentId: "transformText",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "transformToTitleCase",
    title: "Заглавные буквы в каждом слове",
    parentId: "transformText",
    contexts: ["selection"]
  });


  //////////////////////
  ////////////////////// googleMaps menu

 

  chrome.contextMenus.create({
    id: "openInYandexMaps",
    title: "Открыть в Yandex Maps",
    parentId: "coordinates",
    contexts: ["page"]
  });

 chrome.contextMenus.create({
    id: "copyCoordinates",
    title: "Скопировать координаты",
    parentId: "coordinates",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "openInGoogleMaps",
    title: "Открыть в Google Maps",
    parentId: "coordinates",
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
  } else if (info.menuItemId === "openInYandexMaps") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openInYandexMaps
    });
  } else if (info.menuItemId === "addNameRow") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addNameRow
    });
  } else if (info.menuItemId === "autoFillNames") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: autoFillNames
    });
  } else if (info.menuItemId === "autoFillNamesWithTranslation") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: autoFillNamesWithTranslation
    });
    //TODO
  } else if (info.menuItemId === "manualFillNames") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: manualFillNames
    });
  } else if (info.menuItemId === "manualFillShortNames") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: manualFillShortNames
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

      navigator.clipboard.writeText(transformed).then(() => {
      }).catch(err => {
        console.error('Не удалось скопировать текст: ', err);
      });


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

      navigator.clipboard.writeText(transformed).then(() => {
      }).catch(err => {
        console.error('Не удалось скопировать текст: ', err);
      });

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

      navigator.clipboard.writeText(transformed).then(() => {
      }).catch(err => {
        console.error('Не удалось скопировать текст: ', err);
      });


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
  handleTextTransformation(text => text.replace(/\p{Alphabetic}\S*/gu, 
    word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()));

  function handleTextTransformation(transformFn) {
    const activeElement = document.activeElement;
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const transformed = transformFn(selectedText);

      navigator.clipboard.writeText(transformed).then(() => {
        console.log('Текст успешно скопирован в буфер обмена!');
      }).catch(err => {
        console.error('Ошибка при копировании текста: ', err);
      });

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
    }).catch(err => {
      alert(`Не удалось скопировать координаты, проверьте консоль на ошибки!`);
      console.error('Не удалось скопировать координаты: ', err);
    });
  } else {
    alert('Координаты не найдены!');
    console.error('Не удалось скопировать координаты: ', err);
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

function openInYandexMaps() {
  const bodyText = document.body.innerText;
  const latitudeMatch = bodyText.match(/Широта:\s*([\d.]+)/);
  const longitudeMatch = bodyText.match(/Долгота:\s*([\d.]+)/);

  if (latitudeMatch && longitudeMatch) {
    const latitude = latitudeMatch[1];
    const longitude = longitudeMatch[1];
    const yandexMapsUrl = `https://yandex.ru/maps/?text=${latitude},${longitude}`;
    
    window.open(yandexMapsUrl, '_blank');
  } else {
    alert('Координаты не найдены!');
  }
}

function addNameRow() {
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

  // Шаг 1: Меняем последнюю строку "Рус." на "Анг.", "ru" на "en"
  changeLastRusTextTo('Анг.');
  changeLastRusFieldTo('en');

  // Нажмем первый раз на плюсик
  const addButton = form.querySelector('.card-section__icon-add.card-section__add');
  if (addButton) {
    console.log('First click on add button');
    addButton.click();
    setTimeout(() => {
      // Шаг 2: Меняем "Рус." на "Тур.", "ru" на "tr" и "main" на "short"
      changeLastRusTextTo('Тур.');
      changeLastRusFieldTo('tr');
      changeLastTypeFieldToShort();
      changeLastNameTextToShort();

      // Нажмем второй раз на плюсик
      console.log('Second click on add button');
      addButton.click();
      setTimeout(() => {
        // Шаг 3: Меняем "Рус." на "Анг." и "ru" на "en" и "main" на "short"
        changeLastRusTextTo('Анг.');
        changeLastRusFieldTo('en');
        changeLastTypeFieldToShort();
        changeLastNameTextToShort();
      }, 850); // Wait for 0.8 seconds to allow the new field to be added
    }, 850); // Wait for 0.8 seconds before second click
  } else {
    alert('Add button not found');
  }
}

function autoFillNames() {
  const formSelector = '.card-section.card-section_view_names.card-section_write.company-info__section.island.island_theme_islands.form.i-bem.card-section_js_inited.company-info__section_js_inited.card-section_edit';

  // Функция для замены символов
  function replaceTurkishChars(text) {
    const replacements = {
      "Ş": "S", "ş": "s",
      "Ç": "C", "ç": "c",
      "Ğ": "G", "ğ": "g",
      "İ": "I", "ı": "i",
      "Ö": "O", "ö": "o",
      "Ü": "U", "ü": "u"
    };

    return text.split('').map(char => replacements[char] || char).join('');
  }

  // Функция для получения значения из строки с "Тур. Название" (tr main)
  function getTurMainValue() {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return null;
    }

    const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
    const turMainInput = inputs.find(input => {
      let langField = null;
      let typeField = null;
      let parent = input.parentElement;
      while (parent) {
        langField = parent.querySelector('.select__control[name="lang"]');
        typeField = parent.querySelector('.select__control[name="type"]');
        if (langField && typeField) break;
        parent = parent.parentElement;
      }
      if (!parent) {
        console.log('Parent with lang and type fields not found for input:', input);
        return false;
      }
      console.log('Checking input:', input);
      console.log('Found langField:', langField);
      console.log('Found typeField:', typeField);
      return langField && langField.value === 'tr' && typeField && typeField.value === 'main';
    });

    if (turMainInput) {
      console.log(`Found "Тур. Название" input: ${turMainInput.value}`);
      return turMainInput.value;
    } else {
      console.log('No "Тур. Название" input found');
      return null;
    }
  }

  // Функция для установки значения в новое поле
  function setNewValue(lang, type, value) {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
    const targetInput = inputs.find(input => {
      let langField = null;
      let typeField = null;
      let parent = input.parentElement;
      while (parent) {
        langField = parent.querySelector('.select__control[name="lang"]');
        typeField = parent.querySelector('.select__control[name="type"]');
        if (langField && typeField) break;
        parent = parent.parentElement;
      }
      if (!parent) {
        console.log('Parent with lang and type fields not found for input:', input);
        return false;
      }
      return langField && langField.value === lang && typeField && typeField.value === type;
    });

    if (targetInput) {
      console.log(`Setting value "${value}" to input with lang "${lang}" and type "${type}"`);
      targetInput.value = value;
      targetInput.dispatchEvent(new Event('input'));
      console.log(`Value set to "${value}"`);
    } else {
      console.log(`No input found with lang "${lang}" and type "${type}"`);
    }
  }

  // Получим значение из строки с "Тур. Название"
  const turMainValue = getTurMainValue();
  if (turMainValue) {
    // Вставим значение в поля с турецким языком без изменений
    setNewValue('tr', 'short', turMainValue); // Тур. Короткие (tr short)

    // Заменим символы в значении для английского языка
    const replacedValue = replaceTurkishChars(turMainValue);

    // Вставим значение в поля с английским языком
    setNewValue('en', 'main', replacedValue); // Анг. Название (en main)
    setNewValue('en', 'short', replacedValue); // Анг. Короткие (en short)
  }
}

async function autoFillNamesWithTranslation() {
  const formSelector = '.card-section.card-section_view_names.card-section_write.company-info__section.island.island_theme_islands.form.i-bem.card-section_js_inited.company-info__section_js_inited.card-section_edit';
  const response = await fetch(chrome.runtime.getURL('config.json'));
  const config = await response.json();
  const API_KEY = config.googleCloudApiKey;

  // Функция для замены символов
  function replaceTurkishChars(text) {
    const replacements = {
      "Ş": "S", "ş": "s",
      "Ç": "C", "ç": "c",
      "Ğ": "G", "ğ": "g",
      "İ": "I", "ı": "i",
      "Ö": "O", "ö": "o",
      "Ü": "U", "ü": "u"
    };

    return text.split('').map(char => replacements[char] || char).join('');
  }

  // Функция для получения значения из строки с "Тур. Название" (tr main)
  function getTurMainValue() {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return null;
    }

    const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
    const turMainInput = inputs.find(input => {
      let langField = null;
      let typeField = null;
      let parent = input.parentElement;
      while (parent) {
        langField = parent.querySelector('.select__control[name="lang"]');
        typeField = parent.querySelector('.select__control[name="type"]');
        if (langField && typeField) break;
        parent = parent.parentElement;
      }
      if (!parent) {
        console.log('Parent with lang and type fields not found for input:', input);
        return false;
      }
      console.log('Checking input:', input);
      console.log('Found langField:', langField);
      console.log('Found typeField:', typeField);
      return langField && langField.value === 'tr' && typeField && typeField.value === 'main';
    });

    if (turMainInput) {
      console.log(`Found "Тур. Название" input: ${turMainInput.value}`);
      return turMainInput.value;
    } else {
      console.log('No "Тур. Название" input found');
      return null;
    }
  }

  // Функция для установки значения в новое поле
  function setNewValue(lang, type, value) {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
    const targetInput = inputs.find(input => {
      let langField = null;
      let typeField = null;
      let parent = input.parentElement;
      while (parent) {
        langField = parent.querySelector('.select__control[name="lang"]');
        typeField = parent.querySelector('.select__control[name="type"]');
        if (langField && typeField) break;
        parent = parent.parentElement;
      }
      if (!parent) {
        console.log('Parent with lang and type fields not found for input:', input);
        return false;
      }
      return langField && langField.value === lang && typeField && typeField.value === type;
    });

    if (targetInput) {
      console.log(`Setting value "${value}" to input with lang "${lang}" and type "${type}"`);
      targetInput.value = value;
      targetInput.dispatchEvent(new Event('input'));
      console.log(`Value set to "${value}"`);
    } else {
      console.log(`No input found with lang "${lang}" and type "${type}"`);
    }
  }

  // Функция для перевода текста с помощью Google Cloud Translation API
  async function translateText(text, targetLang) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        format: 'text'
      })
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
  }

  // Получим значение из строки с "Тур. Название"
  const turMainValue = getTurMainValue();
  if (turMainValue) {
    // Переведем значение
    const enMainValue = await translateText(turMainValue, 'en'); // Анг. Название (en main)
    const enShortValue = await translateText(turMainValue, 'en'); // Анг. Короткие (en short) можно также перевести

    // Вставим значение в поля с турецким языком без изменений
    setNewValue('tr', 'short', turMainValue); // Тур. Короткие (tr short)

    // Заменим символы в переведенном значении для английского языка
    const replacedEnMainValue = replaceTurkishChars(enMainValue);
    const replacedEnShortValue = replaceTurkishChars(enShortValue);

    // Вставим значение в поля с английским языком
    setNewValue('en', 'main', replacedEnMainValue); // Анг. Название (en main)
    setNewValue('en', 'short', replacedEnShortValue); // Анг. Короткие (en short)
  }
}


function manualFillNames() {
  const formSelector = '.card-section.card-section_view_names.card-section_write.company-info__section.island.island_theme_islands.form.i-bem.card-section_js_inited.company-info__section_js_inited.card-section_edit';

  // Функция для замены символов
  function replaceTurkishChars(text) {
    const replacements = {
      "Ş": "S", "ş": "s",
      "Ç": "C", "ç": "c",
      "Ğ": "G", "ğ": "g",
      "İ": "I", "ı": "i",
      "Ö": "O", "ö": "o",
      "Ü": "U", "ü": "u"
    };

    return text.split('').map(char => replacements[char] || char).join('');
  }

  // Функция для установки значения в новое поле
  function setNewValue(lang, type, value) {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
    const targetInput = inputs.find(input => {
      let langField = null;
      let typeField = null;
      let parent = input.parentElement;
      while (parent) {
        langField = parent.querySelector('.select__control[name="lang"]');
        typeField = parent.querySelector('.select__control[name="type"]');
        if (langField && typeField) break;
        parent = parent.parentElement;
      }
      if (!parent) {
        console.log('Parent with lang and type fields not found for input:', input);
        return false;
      }
      return langField && langField.value === lang && typeField && typeField.value === type;
    });

    if (targetInput) {
      console.log(`Setting value "${value}" to input with lang "${lang}" and type "${type}"`);
      targetInput.value = value;
      targetInput.dispatchEvent(new Event('input'));
      console.log(`Value set to "${value}"`);
    } else {
      console.log(`No input found with lang "${lang}" and type "${type}"`);
    }
  }

  // Получаем выделенный текст
  const selectedText = window.getSelection().toString();
  if (!selectedText) {
    console.log('No text selected');
    return;
  }

  // Вставим значение в поля с турецким языком без изменений
  setNewValue('tr', 'main', selectedText); // Тур. Название (tr main)
  setNewValue('tr', 'short', selectedText); // Тур. Короткие (tr short)
  
  // Заменим символы в выделенном тексте для английского языка
  const replacedValue = replaceTurkishChars(selectedText);

  // Вставим значение в поля с английским языком
  setNewValue('en', 'main', replacedValue); // Анг. Название (en main)
  setNewValue('en', 'short', replacedValue); // Анг. Короткие (en short)
}

function manualFillShortNames() {
  const formSelector = '.card-section.card-section_view_names.card-section_write.company-info__section.island.island_theme_islands.form.i-bem.card-section_js_inited.company-info__section_js_inited.card-section_edit';

  // Функция для замены символов
  function replaceTurkishChars(text) {
    const replacements = {
      "Ş": "S", "ş": "s",
      "Ç": "C", "ç": "c",
      "Ğ": "G", "ğ": "g",
      "İ": "I", "ı": "i",
      "Ö": "O", "ö": "o",
      "Ü": "U", "ü": "u"
    };

    return text.split('').map(char => replacements[char] || char).join('');
  }

  // Функция для установки значения в новое поле
  function setNewValue(lang, type, value) {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

    const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
    const targetInput = inputs.find(input => {
      let langField = null;
      let typeField = null;
      let parent = input.parentElement;
      while (parent) {
        langField = parent.querySelector('.select__control[name="lang"]');
        typeField = parent.querySelector('.select__control[name="type"]');
        if (langField && typeField) break;
        parent = parent.parentElement;
      }
      if (!parent) {
        console.log('Parent with lang and type fields not found for input:', input);
        return false;
      }
      return langField && langField.value === lang && typeField && typeField.value === type;
    });

    if (targetInput) {
      console.log(`Setting value "${value}" to input with lang "${lang}" and type "${type}"`);
      targetInput.value = value;
      targetInput.dispatchEvent(new Event('input'));
      console.log(`Value set to "${value}"`);
    } else {
      console.log(`No input found with lang "${lang}" and type "${type}"`);
    }
  }

  // Получаем выделенный текст
  const selectedText = window.getSelection().toString();
  if (!selectedText) {
    console.log('No text selected');
    return;
  }

  // Вставим значение в поля с турецким языком без изменений
  setNewValue('tr', 'short', selectedText); // Тур. Короткие (tr short)
  
  // Заменим символы в выделенном тексте для английского языка
  const replacedValue = replaceTurkishChars(selectedText);

  // Вставим значение в поля с английским языком
  setNewValue('en', 'short', replacedValue); // Анг. Короткие (en short)
}