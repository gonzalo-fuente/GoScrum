export const limitString = (str) => {
  if (str.length > 170) return str.slice(0, 167).concat("...");
  return str;
};

export const changeValue = (value, opt1, opt2, opt3) => {
  return value === opt1 ? opt2 : value === opt2 ? opt3 : opt1;
};
