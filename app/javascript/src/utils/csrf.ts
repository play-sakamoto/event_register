export const getCSRFToken = () =>
  document.querySelector("meta[name='csrf-token']")?.getAttribute('content') ||
  ''
