export function isValidFormat(str) {
  const regex = /^MLA\d+$/;
  return regex.test(str);
}
