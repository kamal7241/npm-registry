function isHijriYear(dateString) {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0], 10);

  return year >= 1318 && year <= 1500;
}

export { isHijriYear };
