document.getElementById('uppercase').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: transformSelectionToUppercase
    });
  });
});

document.getElementById('lowercase').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: transformSelectionToLowercase
    });
  });
});

document.getElementById('capitalize').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: transformSelectionToCapitalize
    });
  });
});

document.getElementById('titlecase').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: transformSelectionToTitleCase
    });
  });
});

document.getElementById('copy-coordinates').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: copyCoordinates
    });
  });
});

document.getElementById('open-google-maps').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: openInGoogleMaps
    });
  });
});

document.getElementById('add-language-row').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: addLanguageRow
    });
  });
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
  const addButton = document.querySelector('.card-section__icon-add.card-section__add');
  if (addButton) {
    addButton.click();
    setTimeout(() => {
      const languageFields = document.querySelectorAll('.table__cell select');
      if (languageFields.length > 0) {
        const newLanguageField = languageFields[languageFields.length - 1];
        newLanguageField.value = 'en';
        newLanguageField.dispatchEvent(new Event('change'));
      } else {
        alert('Language selection field not found');
      }
    }, 1000); // Wait for 1 second to allow the new field to be added
  } else {
    alert('Add button not found');
  }
}
