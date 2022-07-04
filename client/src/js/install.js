const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  //save the event so it can be used later
  window.deferredPrompt = event;

  //toggle to remove the hidden class from the button
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  //show prompt in browser
  promptEvent.prompt();

  //since the prompt can only be used once, reset the deferred prompt variable
  window.deferredPrompt = null;

  //toggle to add the hidden class from the button
  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  //clear prompt after the app is installed
  window.deferredPrompt = null;
});
