
export const resetObject = (obj) => {
  const rs = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Array) rs[key] = [];
    else rs[key] = "";
  });
  return rs;
};