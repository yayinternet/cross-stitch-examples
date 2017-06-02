
const urlPathString = window.location.pathname;
const parts = urlPathString.split('/');
if (parts.length > 2) {
  const id = parts[2];
  new EditView(id);
}
