export const accessibility = () => {
  const allSections = document.querySelectorAll('section') as NodeListOf<HTMLElement>;

  allSections.forEach((section) => {
    section.setAttribute('tabindex', '0');
  });
};
