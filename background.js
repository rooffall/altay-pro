chrome.runtime.onInstalled.addListener(() => {
  // Список основных меню.

  chrome.contextMenus.create({
    id: "transformText",
    title: "Редактор текста",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "coordinates",
    title: "Работа с координатами",
    contexts: ["page"]
  });


    chrome.contextMenus.create({
    id: "autoDuplicate",
    title: "Автодубль",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "completeCard",
    title: "Автозаполнение карточки",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "autoCard",
    title: "Редактирование карточки",
    contexts: ["all"]
  });


  chrome.contextMenus.create({
    id: "completeNames",
    title: "Автоназвание без перевода",
    parentId: "completeCard",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "completeNamesTranslate",
    title: "Автоназвание с переводом",
    parentId: "completeCard",
    contexts: ["page"]
  });


  //////////////////////// ПОДМЕНЮ ///////////////////////

// todo


  chrome.contextMenus.create({
    id: "removeUrls",
    title: "Очистка урлов",
    parentId: "autoCard",
    contexts: ["page"]
  });


  //////////////////////
  ////////////////////// statusPublication menu

  chrome.contextMenus.create({
    id: "changePublicationStatus",
    title: "Автостатус",
    parentId: "autoCard",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
      id: "publish",
      title: "Публиковать",
      parentId: "changePublicationStatus",
      contexts: ["all"]
  });

  chrome.contextMenus.create({
      id: "duplicate",
      title: "Дубль",
      parentId: "changePublicationStatus",
      contexts: ["all"]
  });

  chrome.contextMenus.create({
      id: "closed",
      title: "Фирма закрылась",
      parentId: "changePublicationStatus",
      contexts: ["all"]
  });

  chrome.contextMenus.create({
      id: "unchecked",
      title: "Непроверенные данные",
      parentId: "changePublicationStatus",
      contexts: ["all"]
  });

  chrome.contextMenus.create({
      id: "unknown",
      title: "Распубликовать",
      parentId: "changePublicationStatus",
      contexts: ["all"]
  });

 //////////////////////
 ////////////////////// autoDuplicate menu

  chrome.contextMenus.create({
    id:"saveAndLogNameValue",
    title: "Копирование кластера",
    parentId: "autoDuplicate",
    contexts: ["page"]
  })

  chrome.contextMenus.create({
    id:"editCard",
    title: "Заполнение дубля",
    parentId: "autoDuplicate",
    contexts: ["page"]
  })

  //////////////////////
  ////////////////////// autoFill name menu

  // Создаем подменю
  chrome.contextMenus.create({
    id: "autoFillRowNames",
    title: "Автоназвание",
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

  chrome.contextMenus.create({
    id: "addNameRow",
    title: "Создание строчек для названий",
    parentId: "autoFillRowNames",
    contexts: ["page"]
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
  } else if (info.menuItemId === "completeNames") { 
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: completeNames
    }); 
  } else if (info.menuItemId === 'completeNamesTranslate') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: completeNamesTranslate,
    });
  } else if (info.menuItemId === 'saveAndLogNameValue') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: saveAndLogNameValue,
    });
  } else if (info.menuItemId === 'editCard') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: editCard,
    });
  } else if (info.menuItemId === "removeUrls") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeUrls
    });
  } else if (info.menuItemId === 'publish') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changePublicationStatus,
      args: ['publish']
    });
  } else if (info.menuItemId === 'duplicate') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changePublicationStatus,
      args: ['duplicate']
    });
  } else if (info.menuItemId === 'closed') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changePublicationStatus,
      args: ['closed']
    });
  } else if (info.menuItemId === 'unchecked') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changePublicationStatus,
      args: ['unchecked']
    });
  } else if (info.menuItemId === 'unknown') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changePublicationStatus,
      args: ['unknown']
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


// Функция для смены статуса публикации и добавления комментария
function changePublicationStatus(status) {
    try {
        console.log("Начало выполнения функции changePublicationStatus");
        
        const statusElement = document.querySelector('.select.select_theme_islands.select_size_s.select_mode_radio.card-section__status.i-bem');
        if (!statusElement) throw new Error("Status element not found");
        console.log("Status element найден");

        const inputElement = statusElement.querySelector('input.select__control');
        if (!inputElement) throw new Error("Input element not found");
        console.log("Input element найден");
        
        inputElement.value = status;

        // Обновление текста кнопки
        const buttonElement = statusElement.querySelector('.button__text');
        if (buttonElement) {
            console.log("Button element найден");
            switch(status) {
                case 'publish':
                    buttonElement.textContent = 'публиковать';
                    break;
                case 'duplicate':
                    buttonElement.textContent = 'дубль';
                    break;
                case 'closed':
                    buttonElement.textContent = 'фирма закрылась';
                    break;
                case 'unchecked':
                    buttonElement.textContent = 'непроверенные данные';
                    break;
                case 'unknown':
                    buttonElement.textContent = 'распубликовать';
                    break;
            }
        } else {
            throw new Error("Button element not found");
        }

        // Изменение класса в зависимости от статуса
        const editRelationElement = document.querySelector('.card-section__edit-relation.i-bem.card-section__edit-relation_js_inited');
        if (editRelationElement) {
            console.log("Edit relation element найден");
            if (status === 'duplicate') {
                editRelationElement.classList.add('card-section__edit-relation_visible');
            } else {
                editRelationElement.classList.remove('card-section__edit-relation_visible');
            }
        } else {
            console.warn("Edit relation element not found. Skipping this step.");
        }

        // Нажатие на кнопку, если форма не в режиме редактирования
        const formElement = document.querySelector('.card-section_view_publication.card-section_write.company-info__section');
        if (formElement) {
            console.log("Form element найден");
            if (!formElement.classList.contains('card-section_edit')) {
                const editButton = formElement.querySelector('.company-info__edit-link.card-section__edit-link.link__control');
                if (editButton) {
                    console.log("Edit button найден, нажимаем кнопку");
                    editButton.click();
                } else {
                    console.error("Edit button not found внутри formElement");
                }
            } else {
                console.log("Form is already in edit mode");
            }
        } else {
            console.error("Form element not found");
        }

        // Проверка состояния кнопки комментариев и ввод текста
        const commentFormElement = document.querySelector('.card-section_view_comments.card-section_write.company-info__section');
        if (commentFormElement) {
            console.log("Comment form element найден");
            const commentEditWrapElement = commentFormElement.querySelector('.card-section__edit-wrap');
            if (commentEditWrapElement) {
                console.log("Comment edit wrap element найден");
                if (!commentEditWrapElement.classList.contains('card-section__edit-wrap_visible')) {
                    const commentEditButton = commentFormElement.querySelector('.company-info__edit-link.card-section__edit-link.link__control');
                    if (commentEditButton) {
                        console.log("Comment edit button найден, нажимаем кнопку");
                        commentEditButton.click();
                    } else {
                        throw new Error("Comment edit button not found");
                    }
                } else {
                    console.log("Comment edit wrap is already visible");
                }
            } else {
                throw new Error("Comment edit wrap element not found");
            }

            // Ввод текста в комментарий
            const commentTextarea = commentFormElement.querySelector('.textarea__control');
            if (commentTextarea) {
                console.log("Comment textarea найден");
                switch(status) {
                    case 'publish':
                        commentTextarea.value = 'Платина Турция. \nКоррекция названий и метки. \nУдалось подтвердить. Звездю!';
                        break;
                    case 'duplicate':
                        commentTextarea.value = 'Платина Турция. \nКарточка приклеена дублем и изменена под кластер.';
                        break;
                    case 'closed':
                        commentTextarea.value = 'Платина Турция. \nКоррекция названий и метки. \nОрганизация закрыта. ФЗ.';
                        break;
                    case 'unchecked':
                        commentTextarea.value = 'Платина Турция. \nКоррекция названий и метки. \nПодтвердить не удалось. НД.';
                        break;
                    case 'unknown':
                        commentTextarea.value = 'Платина Турция. \nРаспубликовываю.';
                        break;
                }
            } else {
                throw new Error("Comment textarea not found");
            }
        } else {
            console.error("Comment form element not found");
        }
    } catch (error) {
        console.error(error.message);
    }
}


// Функция для сохранения и вывода значения Name, Address, Rubric, Permalink, Coordinates
function saveAndLogNameValue() {
    let permalink = '';
    let nameValue = '';  
    let address = ''; 
    let latitude = '';
    let longitude = '';
    let rubricName = ''; 
    let rubricId = '';

    // Ищем и сохраняем значение пермалинка
    const permalinkElement = document.querySelector('.card-info__item a.link');
    if (permalinkElement) {
        permalink = permalinkElement.textContent.trim();
        console.log('Пермалинк:', permalink);
    } else {
        console.log('Пермалинк не найден');
        alert('Пермалинк не найден!');
    }

    // Находим все строки <tr>
    const rows = document.querySelectorAll('tr');
    
    rows.forEach(row => {
        const mainButton = row.querySelector('.select__control[name="type"][value="main"]');
        if (mainButton) {
            const langElement = row.querySelector('.select__control[name="lang"][value="tr"]');
            if (langElement) {
                const nameInput = row.querySelector('.input__control[name="name"]');
                if (nameInput) {
                    nameValue = nameInput.value;
                    console.log('Название:', nameValue);
                }
            }
        }
    });

    const addressRow = document.querySelector('.table__row.card-section__row.card-section__row_address.card-section__row_active-address.i-bem');
    if (addressRow) {
        const addressInput = addressRow.querySelector('input[name="main-address-input"]');
        if (addressInput) {
            address = addressInput.value;
            console.log('Адрес:', address);
        } else {
            console.log('Элемент адреса не найден или значение пустое');
            alert('Адрес не найден!');
        }
    } else {
        console.log('Строка с адресом не найдена');
        alert('Название не найдено!');
    }


    const latitudeElement = [...document.querySelectorAll('.card-section__position-item')].find(el => el.textContent.includes('Широта:'));
    if (latitudeElement) {
        latitude = latitudeElement.textContent.replace('Широта:', '').trim();
        console.log('Широта:', latitude);
    } else {
        console.log('Широта не найдена');
        alert('Широта не найдена!');
    }

    // Ищем и сохраняем координаты долготы
    const longitudeElement = [...document.querySelectorAll('.card-section__position-item')].find(el => el.textContent.includes('Долгота:'));
    if (longitudeElement) {
        longitude = longitudeElement.textContent.replace('Долгота:', '').trim();
        console.log('Долгота:', longitude);
    } else {
        console.log('Долгота не найдена');
        alert('Долгота не найдена!');
    }

    const rubricSection = document.querySelector('.card-section__section');
    if (rubricSection) {
        const rubricNameElement = rubricSection.querySelector('.card-section__entity-title.card-section__entity-title_is-main');
        if (rubricNameElement) {
            rubricName = rubricNameElement.textContent.trim();
        }

        const rubricIdElement = rubricSection.querySelector('a.link[href^="/rubrics/"]');
        if (rubricIdElement) {
            rubricId = rubricIdElement.textContent.trim();
        }

        console.log('Рубрика: ' + rubricName +' (' + rubricId + ')');
    } else {
        console.log('Рубрика не найдена');
        alert('Рубрика не найдена!');
    }

    const cardData = {
        permalink: permalink,
        name: nameValue,
        address: address,
        latitude: latitude,
        longitude: longitude,
        rubricName: rubricName,
        rubricId: rubricId
    };

    // Сохраняем данные в localStorage (как временное хранилище)
    localStorage.setItem('cardData', JSON.stringify(cardData));

    console.log("Данные сохранены в JSON-файл.");
}


function removeUrls() {
  const urlsSection = document.querySelector('.card-section_view_urls.card-section_write.company-info__section');
  if (urlsSection) {
      const editButton = urlsSection.querySelector('.link.company-info__edit-link');
      if (editButton) {
          editButton.click();
          console.log('Кнопка редактирования URL нажата');
      } else {
          console.error('Кнопка редактирования URL не найдена');
          return;
      }

      // Проходим по всем строкам tbody
      const rows = urlsSection.querySelectorAll('tbody.autoinsert.autoinsert_view_table-row.i-bem');
      if (rows.length > 0) {
          rows.forEach((row, index) => {
              console.log(`Обрабатывается строка ${index + 1}`);
              const selectElement = row.querySelector('input.select__control');
              if (selectElement) {
                  const value = selectElement.value;
                  console.log(`Найдено value: ${value}`);
                  if (['main', 'alternative', 'social'].includes(value)) {
                      const removeButton = row.querySelector('.card-section__icon-remove.card-section__remove');
                      if (removeButton) {
                          removeButton.click();
                          console.log(`Строка с value "${value}" удалена.`);
                      } else {
                          console.error(`Кнопка удаления не найдена для value "${value}".`);
                      }
                  } else {
                      console.log(`Строка с value "${value}" пропущена.`);
                  }
              } else {
                  console.error(`Поле value не найдено в строке ${index + 1}.`);
              }
          });
      } else {
          console.error('Строки с URL не найдены.');
      }
  } else {
      console.error('Секция с URL не найдена.');
  }

  if (!cardData) {
      throw new Error("Данные из JSON не найдены");
    } 
}


function editCard() {
    try {
        const cardData = JSON.parse(localStorage.getItem('cardData'));

        if (!cardData) {
            throw new Error("Данные из JSON не найдены");
        }

        const { name, address, rubricName, rubricId, permalink, latitude, longitude } = cardData;

        const nameSection = document.querySelector('.card-section_view_names.card-section_write.company-info__section');
        if (nameSection) {
            if (!nameSection.classList.contains('card-section_edit')) {
                const editButton = nameSection.querySelector('.link.company-info__edit-link');
                if (editButton) {
                    editButton.click();
                    console.log('Кнопка редактирования нажата');
                } else {
                    console.error('Кнопка редактирования не найдена');
                    return;
                }
            } else {
                console.log("Секция с названием уже в режиме редактирования");
            }

            const rowsWithRemoveButtons = nameSection.querySelectorAll('tr');
            rowsWithRemoveButtons.forEach(row => {
                const removeButton = row.querySelector('.card-section__icon-remove.card-section__remove .link');
                if (removeButton && removeButton.offsetParent !== null) {
                    removeButton.click();
                    console.log('Удалена одна запись');
                }
            });

            const nameButton = nameSection.querySelector('.button.button_size_s.button_theme_islands.select__button.button__control');
            if (nameButton && nameButton.textContent.trim() === "Рус.") {
                const spanElement = nameButton.querySelector('span');
                if (spanElement) {
                    spanElement.textContent = 'Тур.';
                    console.log('Заменено "Рус." на "Тур."');
                } else {
                    console.log('Не удалось найти элемент <span> внутри кнопки.');
                }
            } else {
                console.log('Элемент с "Рус." не найден или текст не соответствует');
            }

            const nameInput = nameSection.querySelector('.input__control[name="name"]');
            if (nameInput) {
                nameInput.value = name;
                console.log(`Название "${name}" вставлено в поле ввода.`);
            } else {
                console.error('Поле ввода для названия не найдено.');
            }

            const langInput = nameSection.querySelector('.select__control[name="lang"][value="ru"]');
            if (langInput) {
                langInput.value = 'tr';
                console.log('Заменено "ru" на "tr"');
            }
        } else {
            console.error('Секция с названием карточки не найдена');
        }

        const status = 'duplicate'; 
        const statusElement = document.querySelector('.select.select_theme_islands.select_size_s.select_mode_radio.card-section__status.i-bem');
        if (!statusElement) throw new Error("Status element not found");
        console.log("Status element найден");

        const inputElement = statusElement.querySelector('input.select__control');
        if (!inputElement) throw new Error("Input element not found");
        console.log("Input element найден");
        
        inputElement.value = status;

        const buttonElement = statusElement.querySelector('.button__text');
        if (buttonElement) {
            console.log("Button element найден");
            switch(status) {
                case 'duplicate':
                    buttonElement.textContent = 'дубль';
                    break;
            }
        } else {
            throw new Error("Button element not found");
        }

        const editRelationElements = document.querySelectorAll('.card-section__edit-relation');
        let editRelationElement = null;

        editRelationElements.forEach((element) => {
            const title = element.querySelector('.card-section__field-title');
            if (title && title.textContent.includes('Пермалинк')) {
                editRelationElement = element;
            }
        });

        if (editRelationElement) {
            editRelationElement.classList.add('card-section__edit-relation_visible');
            console.log("Класс 'card-section__edit-relation_visible' добавлен к блоку 'Пермалинк'");

            const addFormElement = editRelationElement.querySelector('.card-section__add-form');
            if (addFormElement) {
                console.log("Форма для добавления пермалинков найдена");

                const permalinkInput = addFormElement.querySelector('.input__control');
                if (permalinkInput) {
                    permalinkInput.value = permalink;
                    console.log(`Permalink "${permalink}" вставлен в поле ввода.`);
                } else {
                    console.error('Поле ввода для permalink не найдено');
                }
            } else {
                console.error("Форма для добавления пермалинков не найдена.");
            }
        } else {
            console.error("Не удалось найти блок с 'Пермалинк'");
        }

        const formElement = document.querySelector('.card-section_view_publication.card-section_write.company-info__section');
        if (formElement) {
            console.log("Form element найден");
            if (!formElement.classList.contains('card-section_edit')) {
                const editButton = formElement.querySelector('.company-info__edit-link.card-section__edit-link.link__control');
                if (editButton) {
                    console.log("Edit button найден, нажимаем кнопку");
                    editButton.click();
                } else {
                    console.error("Edit button not found внутри formElement");
                }
            } else {
                console.log("Form is already in edit mode");
            }
        } else {
            console.error("Form element not found");
        }

        const commentFormElement = document.querySelector('.card-section_view_comments.card-section_write.company-info__section');
        if (commentFormElement) {
            console.log("Comment form element найден");
            const commentEditWrapElement = commentFormElement.querySelector('.card-section__edit-wrap');
            if (commentEditWrapElement) {
                console.log("Comment edit wrap element найден");
                if (!commentEditWrapElement.classList.contains('card-section__edit-wrap_visible')) {
                    const commentEditButton = commentFormElement.querySelector('.company-info__edit-link.card-section__edit-link.link__control');
                    if (commentEditButton) {
                        console.log("Comment edit button найден, нажимаем кнопку");
                        commentEditButton.click();
                    } else {
                        throw new Error("Comment edit button not found");
                    }
                } else {
                    console.log("Comment edit wrap is already visible");
                }
            } else {
                throw new Error("Comment edit wrap element not found");
            }

            const commentTextarea = commentFormElement.querySelector('.textarea__control');
            if (commentTextarea) {
                console.log("Comment textarea найден");
                switch(status) {
                    case 'duplicate':
                        commentTextarea.value = 'Платина Турция. \nКарточка приклеена дублем и изменена под кластер '+ permalink + '.';
                        break;
                }
            } else {
                throw new Error("Comment textarea not found");
            }
        } else {
            console.error("Comment form element not found");
        }

        // Нажимаем кнопку "Добавить" для пермалинка
        setTimeout(() => {
            const permalinkAddButton = formElement.querySelector('.button.card-section__permalink-add-button');
            if (permalinkAddButton) {
                permalinkAddButton.focus();

                const keyDownEvent = new KeyboardEvent('keydown', {
                    key: ' ',
                    keyCode: 32,
                    bubbles: true
                });
                permalinkAddButton.dispatchEvent(keyDownEvent);

                const keyUpEvent = new KeyboardEvent('keyup', {
                    key: ' ',
                    keyCode: 32,
                    bubbles: true
                });
                permalinkAddButton.dispatchEvent(keyUpEvent);

                console.log('Кнопка "Добавить" для пермалинка нажата с использованием эмуляции пробела.');
            } else {
                console.error('Кнопка "Добавить" для пермалинка не найдена.');
            }
        }, 300);
        
        const addressSection = document.querySelector('.card-section_view_address.card-section_write.company-info__section');
        if (addressSection) {
            if (!addressSection.classList.contains('card-section_edit')) {
                const editButton = addressSection.querySelector('.link.company-info__edit-link');
                if (editButton) {
                    editButton.click();
                    console.log('Кнопка редактирования адреса нажата');
                } else {
                    console.error('Кнопка редактирования адреса не найдена');
                    return;
                }
            } else {
                console.log("Секция с адресом уже в режиме редактирования");
            }

            const addressRow = addressSection.querySelector('.table__row.card-section__row.card-section__row_address.card-section__row_active-address.i-bem');
            if (addressRow) {
                const addressInput = addressRow.querySelector('input[name="main-address-input"]');
                if (addressInput) {
                    addressInput.value = address; // Используем сохранённый адрес
                    console.log(`Адрес заменён на: "${address}"`);
                } else {
                    console.error('Поле ввода для адреса не найдено.');
                }

                // Найти элемент и заменить его значение на "tr"
                const langInput = addressRow.querySelector('.select__control[type="hidden"]');
                if (langInput) {
                    const previousValue = langInput.value;  // Сохраняем старое значение для лога
                    langInput.value = 'tr';
                    console.log(`Значение "${previousValue}" заменено на "tr".`);
                } else {
                    console.error('Элемент для замены языка не найден.');
                }

                // Замена "Рус." на "Тур."
                const langButton = addressRow.querySelector('.button.select__button.button__control');
                if (langButton) {
                    const spanElement = langButton.querySelector('span'); // Найдем элемент внутри кнопки
                    if (spanElement) {
                        const previousValue = spanElement.textContent.trim(); // Сохраняем старое значение для лога
                        spanElement.textContent = "Тур."; // Меняем текст внутри span
                        console.log(`Значение "${previousValue}" заменено на "Тур."`);
                    } else {
                        console.error('Элемент <span> внутри кнопки не найден.');
                    }
                } else {
                    console.error('Кнопка для замены текста не найдена.');
                }

                // Замена значений широты и долготы в таблице координат
                const coordinatesTable = addressSection.querySelector('.table.card-section__table.card-section__table_type_coordinates');
                if (coordinatesTable) {
                    // Замена значения широты
                    const latitudeInput = coordinatesTable.querySelector('input[name="manual-latitude"]');
                    if (latitudeInput) {
                        const previousLatitude = latitudeInput.value;  // Сохраняем старое значение для лога
                        latitudeInput.value = latitude;
                        console.log(`Значение широты "${previousLatitude}" заменено на "${latitude}".`);
                    } else {
                        console.error('Поле ввода для широты не найдено.');
                    }

                    // Замена значения долготы
                    const longitudeInput = coordinatesTable.querySelector('input[name="manual-longitude"]');
                    if (longitudeInput) {
                        const previousLongitude = longitudeInput.value;  // Сохраняем старое значение для лога
                        longitudeInput.value = longitude;
                        console.log(`Значение долготы "${previousLongitude}" заменено на "${longitude}".`);
                    } else {
                        console.error('Поле ввода для долготы не найдено.');
                    }
                } else {
                    console.error('Таблица координат не найдена.');
                }

            } else {
                console.error('Строка с адресом не найдена.');
            }
        } else {
            console.error('Секция с адресом не найдена');
        }

        // Работа с формой телефонов
        const phonesSection = document.querySelector('.card-section_view_phones.card-section_write.company-info__section');
        if (phonesSection) {
            if (!phonesSection.classList.contains('card-section_edit')) {
                const editButton = phonesSection.querySelector('.link.company-info__edit-link');
                if (editButton) {
                    editButton.click();
                    console.log('Кнопка редактирования телефонов нажата');
                } else {
                    console.error('Кнопка редактирования телефонов не найдена');
                    return;
                }
            } else {
                console.log("Секция с телефонами уже в режиме редактирования");
            }

            // Найти и нажать все кнопки удаления
            const removeButtons = phonesSection.querySelectorAll('.card-section__icon-remove.card-section__remove.i-bem');
            if (removeButtons.length > 0) {
                removeButtons.forEach((button) => {
                    button.click();
                    console.log('Кнопка удаления нажата');
                });
            } else {
                console.error('Кнопки удаления не найдены.');
            }
        } else {
            console.error('Секция с телефонами не найдена.');
        }

        // Работа с формой URL-адресов
        const urlsSection = document.querySelector('.card-section_view_urls.card-section_write.company-info__section');
        if (urlsSection) {
            if (!urlsSection.classList.contains('card-section_edit')) {
                const editButton = urlsSection.querySelector('.link.company-info__edit-link');
                if (editButton) {
                    editButton.click();
                    console.log('Кнопка редактирования URL нажата');
                } else {
                    console.error('Кнопка редактирования URL не найдена');
                    return;
                }
            } else {
                console.log("Секция с URL уже в режиме редактирования");
            }

            // Проходим по всем строкам tbody
            const rows = urlsSection.querySelectorAll('tbody.autoinsert.autoinsert_view_table-row.i-bem');
            if (rows.length > 0) {
                rows.forEach((row, index) => {
                    console.log(`Обрабатывается строка ${index + 1}`);
                    const selectElement = row.querySelector('input.select__control');
                    if (selectElement) {
                        const value = selectElement.value;
                        console.log(`Найдено value: ${value}`);
                        if (['main', 'alternative', 'social'].includes(value)) {
                            const removeButton = row.querySelector('.card-section__icon-remove.card-section__remove');
                            if (removeButton) {
                                removeButton.click();
                                console.log(`Строка с value "${value}" удалена.`);
                            } else {
                                console.error(`Кнопка удаления не найдена для value "${value}".`);
                            }
                        } else {
                            console.log(`Строка с value "${value}" пропущена.`);
                        }
                    } else {
                        console.error(`Поле value не найдено в строке ${index + 1}.`);
                    }
                });
            } else {
                console.error('Строки с URL не найдены.');
            }
        } else {
            console.error('Секция с URL не найдена.');
        }

        // Работа с формой рабочих интервалов
        const workIntervalsSection = document.querySelector('.card-section_view_work-intervals.card-section_write.company-info__section');
        if (workIntervalsSection) {
            if (!workIntervalsSection.classList.contains('card-section_edit')) {
                const editButton = workIntervalsSection.querySelector('.link.company-info__edit-link');
                if (editButton) {
                    editButton.click();
                    console.log('Кнопка редактирования рабочих интервалов нажата');
                } else {
                    console.error('Кнопка редактирования рабочих интервалов не найдена');
                    return;
                }
            } else {
                console.log("Секция с рабочими интервалами уже в режиме редактирования");
            }

            // Найти все поля input и очистить их значение
            const inputs = workIntervalsSection.querySelectorAll('.input__control.i-bem.input__control_js_inited');
            inputs.forEach((input, index) => {
                input.value = ''; // Очистить поле
                console.log(`Поле ввода ${index + 1} очищено.`);
            });
        } else {
            console.error('Секция с рабочими интервалами не найдена.');
        }

        // Работа с формой рубрик
        const rubricsSection = document.querySelector('.card-section_view_rubrics.card-section_write.company-info__section');
        if (rubricsSection) {
            if (!rubricsSection.classList.contains('card-section_edit')) {
                const editButton = rubricsSection.querySelector('.link.company-info__edit-link');
                if (editButton) {
                    editButton.click();
                    console.log('Кнопка редактирования рубрик нажата');
                } else {
                    throw new Error('Кнопка редактирования рубрик не найдена.');
                }
            } else {
                console.log("Секция с рубриками уже в режиме редактирования");
            }

            // Удаление всех рубрик
            const removeButtons = rubricsSection.querySelectorAll('.card-section__icon-remove.card-section__remove');
            if (removeButtons.length > 0) {
                removeButtons.forEach((button, index) => {
                    button.click();
                    console.log(`Кнопка удаления рубрики ${index + 1} нажата.`);
                });
            } else {
                console.error('Кнопки удаления в рубриках не найдены.');
            }

            // Находим поле ввода внутри формы
            const inputField = rubricsSection.querySelector('.input__control_js_inited.i-bem.input__control');
            if (inputField) {
                inputField.focus(); // Фокусируемся на поле ввода
                inputField.value = rubricId; // Вводим значение rubricId
                inputField.dispatchEvent(new Event('input', { bubbles: true })); // Эмулируем событие input
                console.log(`Введено значение: ${rubricId}`);

                // Теперь добавляем задержку и пытаемся найти всплывающее окно
                setTimeout(() => {
                    // Ищем элемент с текстом, который содержит rubricId
                    const option = Array.from(document.querySelectorAll('*')).find(el => 
                        el.textContent.includes(`${rubricId}:`) && el.classList.contains('menu__item')
                    );

                    if (option) {
                        option.click(); // Кликаем по найденному элементу
                        console.log(`Выбран элемент: ${rubricId}`);
                    } else {
                        console.error(`Элемент с текстом "${rubricId}" не найден.`);
                    }
                }, 500); // Задержка в 500 мс для появления элемента

            } else {
                console.error('Поле ввода для rubricId внутри формы не найдено.');
            }
        } else {
            throw new Error('Форма с рубриками не найдена.');
        }

    } catch (error) {
        console.error(error.message);
    }
}

function completeNames() {
 // const formSelector = '.card-section.card-section_view_names.card-section_write.company-info__section.island.island_theme_islands.form.i-bem.card-section_js_inited.company-info__section_js_inited.card-section_edit';

  const formSelector = '.card-section_view_names.card-section_write.company-info__section';
  const editButtonSelector = '.link.company-info__edit-link';

  const form = document.querySelector(formSelector);
  if (!form) {
    console.log('Target form not found');
    return;
  }

  const editButton = form.querySelector(editButtonSelector);
  if (!editButton) {
    console.log('Edit button not found');
    return;
  }

  if (editButton.getAttribute('aria-expanded') !== 'true') {
    console.log('Edit button not clicked yet, clicking now');
    editButton.click();
  } else {
    console.log('Edit button already clicked');
  }


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
    const rusLangFields = langFields.filter(field => field.value === 'ru' && isVisible(field));
    console.log(`Found ${rusLangFields.length} visible language fields with value "ru" inside the target form`);

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
    const mainTypeFields = typeFields.filter(field => field.value === 'main' && isVisible(field));
    console.log(`Found ${mainTypeFields.length} visible type fields with value "main" inside the target form`);

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

  // Функция для добавления и изменения строк
  function createRows() {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.log('Target form not found');
      return;
    }

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

          // После создания строк вызываем функцию автозаполнения
          autoFillNames();
        }, 850); // Wait for 0.8 seconds to allow the new field to be added
      }, 850); // Wait for 0.8 seconds before second clickaddNameRowAndAutoFillNames
    } else {
      alert('Add button not found');
    }
  }

  // Объединяем с функцией автозаполнения
  function autoFillNames() {
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

  // Сначала создадим строки
  createRows();
}

// async function completeNamesTranslate() {
//   const formSelector = '.card-section_view_names.card-section_write.company-info__section';

//   // Функция для замены символов
//   function replaceTurkishChars(text) {
//     const replacements = {
//       "Ş": "S", "ş": "s",
//       "Ç": "C", "ç": "c",
//       "Ğ": "G", "ğ": "g",
//       "İ": "I", "ı": "i",
//       "Ö": "O", "ö": "o",
//       "Ü": "U", "ü": "u"
//     };
//     return text.split('').map(char => replacements[char] || char).join('');
//   }

//   // Функция для получения значения из строки с "Тур. Название" (tr main)
//   function getTurMainValue() {
//     const form = document.querySelector(formSelector);
//     if (!form) {
//       console.log('Target form not found');
//       return null;
//     }

//     const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
//     const turMainInput = inputs.find(input => {
//       let langField = null;
//       let typeField = null;
//       let parent = input.parentElement;
//       while (parent) {
//         langField = parent.querySelector('.select__control[name="lang"]');
//         typeField = parent.querySelector('.select__control[name="type"]');
//         if (langField && typeField) break;
//         parent = parent.parentElement;
//       }
//       if (!parent) {
//         console.log('Parent with lang and type fields not found for input:', input);
//         return false;
//       }
//       return langField && langField.value === 'tr' && typeField && typeField.value === 'main';
//     });

//     if (turMainInput) {
//       console.log(`Found "Тур. Название" input: ${turMainInput.value}`);
//       return turMainInput.value;
//     } else {
//       console.log('No "Тур. Название" input found');
//       return null;
//     }
//   }

//   // Функция для установки значения в новое поле
//   function setNewValue(lang, type, value) {
//     const form = document.querySelector(formSelector);
//     if (!form) {
//       console.log('Target form not found');
//       return;
//     }

//     const inputs = Array.from(form.querySelectorAll('.input__control[name="name"]'));
//     const targetInput = inputs.find(input => {
//       let langField = null;
//       let typeField = null;
//       let parent = input.parentElement;
//       while (parent) {
//         langField = parent.querySelector('.select__control[name="lang"]');
//         typeField = parent.querySelector('.select__control[name="type"]');
//         if (langField && typeField) break;
//         parent = parent.parentElement;
//       }
//       if (!parent) {
//         console.log('Parent with lang and type fields not found for input:', input);
//         return false;
//       }
//       return langField && langField.value === lang && typeField && typeField.value === type;
//     });

//     if (targetInput) {
//       console.log(`Setting value "${value}" to input with lang "${lang}" and type "${type}"`);
//       targetInput.value = value;
//       targetInput.dispatchEvent(new Event('input'));
//       console.log(`Value set to "${value}"`);
//     } else {
//       console.log(`No input found with lang "${lang}" and type "${type}"`);
//     }
//   }

//   // Функция для перевода текста с помощью Google Cloud Translation API
//   async function translateText(text, targetLang) {
//     const response = await fetch(chrome.runtime.getURL('config.json'));
//     const config = await response.json();
//     const API_KEY = config.googleCloudApiKey;

//     const translateResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         q: text,
//         target: targetLang,
//         format: 'text'
//       })
//     });

//     const data = await translateResponse.json();
//     return data.data.translations[0].translatedText;
//   }

//   // Функция для изменения текста "Рус." на целевой текст внутри указанной формы
//   function changeLastRusTextTo(targetText) {
//     const form = document.querySelector(formSelector);
//     if (!form) {
//       console.log('Target form not found');
//       return;
//     }

//     const buttons = Array.from(form.querySelectorAll('.button__text'));
//     const rusButtons = buttons.filter(button => button.innerText.trim() === 'Рус.');
//     console.log(`Found ${rusButtons.length} buttons with text "Рус." inside the target form`);

//     if (rusButtons.length > 0) {
//       const lastRusButton = rusButtons[rusButtons.length - 1];
//       console.log(`Changing button text "${lastRusButton.innerText}" to "${targetText}"`);
//       lastRusButton.innerText = targetText;
//       console.log(`Last button text changed to "${targetText}"`);
//     } else {
//       console.log('No button with text "Рус." found to change');
//     }
//   }

//   // Функция для изменения значения языка "ru" на целевое значение внутри указанной формы
//   function changeLastRusFieldTo(langValue) {
//     const form = document.querySelector(formSelector);
//     if (!form) {
//       console.log('Target form not found');
//       return;
//     }

//     const langFields = Array.from(form.querySelectorAll('.select__control[name="lang"]'));
//     const rusLangFields = langFields.filter(field => field.value === 'ru' && isVisible(field));
//     console.log(`Found ${rusLangFields.length} visible language fields with value "ru" inside the target form`);

//     if (rusLangFields.length > 0) {
//       const lastRusLangField = rusLangFields[rusLangFields.length - 1];
//       console.log(`Changing language field value "${lastRusLangField.value}" to "${langValue}"`);
//       lastRusLangField.value = langValue;
//       lastRusLangField.dispatchEvent(new Event('change'));
//       console.log(`Last language field changed to "${langValue}"`);
//     } else {
//       console.log('No visible "ru" language field found to change');
//     }
//   }

//   // Функция для изменения значения типа "main" на "short" внутри указанной формы
//   function changeLastTypeFieldToShort() {
//     const form = document.querySelector(formSelector);
//     if (!form) {
//       console.log('Target form not found');
//       return;
//     }

//     const typeFields = Array.from(form.querySelectorAll('.select__control[name="type"]'));
//     const mainTypeFields = typeFields.filter(field => field.value === 'main' && isVisible(field));
//     console.log(`Found ${mainTypeFields.length} visible type fields with value "main" inside the target form`);

//     if (mainTypeFields.length > 0) {
//       const lastMainTypeField = mainTypeFields[mainTypeFields.length - 1];
//       console.log(`Changing type field value "${lastMainTypeField.value}" to "short"`);
//       lastMainTypeField.value = 'short';
//       lastMainTypeField.dispatchEvent(new Event('change'));
//       console.log(`Last type field changed to "short"`);
//     } else {
//       console.log('No visible "main" type field found to change');
//     }
//   }

//   // Функция для изменения текста "Названия" на "Короткие" внутри указанной формы
//   function changeLastNameTextToShort() {
//     const form = document.querySelector(formSelector);
//     if (!form) {
//       console.log('Target form not found');
//       return;
//     }

//     const nameButtons = Array.from(form.querySelectorAll('.button__text'));
//     const nameFields = nameButtons.filter(button => button.innerText.trim() === 'Названия');
//     console.log(`Found ${nameFields.length} buttons with text "Названия" inside the target form`);

//     if (nameFields.length > 0) {
//       const lastNameField = nameFields[nameFields.length - 1];
//       console.log(`Changing name field text "${lastNameField.innerText}" to "Короткие"`);
//       lastNameField.innerText = 'Короткие';
//       console.log(`Last name field text changed to "Короткие"`);
//     } else {
//       console.log('No button with text "Названия" found to change');
//     }
//   }

//   // Проверка, виден ли элемент
//   function isVisible(element) {
//     return !(element.style.display === 'none' || element.style.visibility === 'hidden');
//   }

//   // Выполнение действий с формой
//   const form = document.querySelector(formSelector);
//   if (!form) {
//     console.log('Target form not found');
//     return;
//   }

//   const addButton = form.querySelector('.card-section__icon-add.card-section__add');
//   if (addButton) {
//     console.log('First click on add button');
//     addButton.click();
//     await new Promise(resolve => setTimeout(resolve, 850)); // Wait for 0.8 seconds

//     // Шаг 1: Меняем последнюю строку "Рус." на "Анг.", "ru" на "en"
//     changeLastRusTextTo('Анг.');
//     changeLastRusFieldTo('en');

//     console.log('Second click on add button');
//     addButton.click();
//     await new Promise(resolve => setTimeout(resolve, 850)); // Wait for 0.8 seconds

//     // Шаг 2: Меняем "Рус." на "Тур.", "ru" на "tr" и "main" на "short"
//     changeLastRusTextTo('Тур.');
//     changeLastRusFieldTo('tr');
//     changeLastTypeFieldToShort();
//     changeLastNameTextToShort();

//     console.log('Third click on add button');
//     addButton.click();
//     await new Promise(resolve => setTimeout(resolve, 850)); // Wait for 0.8 seconds

//     // Шаг 3: Меняем "Рус." на "Анг." и "ru" на "en" и "main" на "short"
//     changeLastRusTextTo('Анг.');
//     changeLastRusFieldTo('en');
//     changeLastTypeFieldToShort();
//     changeLastNameTextToShort();

//     // Получим значение из строки с "Тур. Название"
//     const turMainValue = getTurMainValue();
//     if (turMainValue) {
//       // Переведем значение
//       const enMainValue = await translateText(turMainValue, 'en'); // Анг. Название (en main)
//       const enShortValue = await translateText(turMainValue, 'en'); // Анг. Короткие (en short)

//       // Вставим значение в поля с турецким языком без изменений
//       setNewValue('tr', 'short', turMainValue); // Тур. Короткие (tr short)

//       // Заменим символы в переведенном значении для английского языка
//       const replacedEnMainValue = replaceTurkishChars(enMainValue);
//       const replacedEnShortValue = replaceTurkishChars(enShortValue);

//       // Вставим значение в поля с английским языком
//       setNewValue('en', 'main', replacedEnMainValue); // Анг. Название (en main)
//       setNewValue('en', 'short', replacedEnShortValue); // Анг. Короткие (en short)
//     }
//   } else {
//     alert('Add button not found');
//   }
// }
