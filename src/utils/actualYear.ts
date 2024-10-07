export const actualYear = () => {
  const yearEl = document.querySelector('[year]') as HTMLElement;
  if (!yearEl) return;

  const currentYear: number = new Date().getFullYear();
  yearEl.textContent = currentYear.toString();
};
