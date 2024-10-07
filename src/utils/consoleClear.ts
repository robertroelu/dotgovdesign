export const consoleClear = () => {
  console.log = function () {};
};