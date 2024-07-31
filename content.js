chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'copyCoordinates' || message.action === 'openInGoogleMaps') {
    const bodyText = document.body.innerText;
    const latitudeMatch = bodyText.match(/Широта:\s*([\d.]+)/);
    const longitudeMatch = bodyText.match(/Долгота:\s*([\d.]+)/);

    if (latitudeMatch && longitudeMatch) {
      const latitude = latitudeMatch[1];
      const longitude = longitudeMatch[1];

      if (message.action === 'copyCoordinates') {
        const coordinates = `Широта: ${latitude}, Долгота: ${longitude}`;
        navigator.clipboard.writeText(coordinates).then(() => {
          alert(`Copied coordinates: ${
