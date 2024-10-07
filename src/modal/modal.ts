import { animateCloseModal, animateOpenModal } from './animations';
import type { ModalInstance } from './types';
import { createFocusTrap, type FocusTarget, type FocusTrap } from 'focus-trap';

const animationDuration = 200;

let interval: any;
let focusTrap: FocusTrap;

function open(instance: ModalInstance, trigger: HTMLElement, focusTrap: FocusTrap) {
  const { componentElement, index, instanceElement } = instance;
  componentElement.setAttribute('global-modal-active', `${index}`);

  // Link value for button
  const linkValue = trigger.getAttribute('open-modal-link') as string;
  const linkButton = componentElement.querySelector('[open-modal-button]') as HTMLElement;
  linkButton.setAttribute('href', linkValue);

  // Counter for modal
  const counterEl = componentElement.querySelector('[open-modal-time]');
  if (!counterEl) return;

  // Interval for modal
  let time = 3;
  counterEl.textContent = time.toString();
  interval = setInterval(() => {
    if (time === 0) {
      linkButton.click();
      clearInterval(interval);
      close(componentElement, focusTrap);
    }
    time--;
    counterEl.textContent = time.toString();
  }, 1000);

  focusTrap.activate();

  animateOpenModal(componentElement, instanceElement, animationDuration);

  // Accessibility
}

function close(componentElement: HTMLElement, focusTrap: FocusTrap) {
  animateCloseModal(componentElement, animationDuration);
  clearInterval(interval);
  focusTrap.deactivate();
  setTimeout(() => {
    componentElement.setAttribute('global-modal-active', '');
  }, animationDuration);
}

export const modal = () => {
  // global component element
  const componentElement = document.querySelector('[global-modal-active]') as HTMLElement;
  if (!componentElement) return;

  // close btns within global component
  const closeButtons = componentElement.querySelectorAll('[global-modal-element="close"]');
  if (!closeButtons) return;

  // get instances
  const instanceElements: HTMLElement[] = Array.from(
    document.querySelectorAll('[global-modal-instance]')
  );
  if (!instanceElements.length) return;

  // set up instances
  instanceElements.map((instanceElement) => {
    const id: string = instanceElement.getAttribute('id') || '';
    const index: number = Number(instanceElement.getAttribute('global-modal-instance'));
    // const triggers: HTMLElement[] = Array.from(document.querySelectorAll(`a[href="#${id}"]`));
    const triggers: HTMLElement[] = Array.from(document.querySelectorAll(`[open-modal="true"]`));
    if (!triggers.length || !id) return;

    const instance: ModalInstance = {
      componentElement,
      instanceElement,
      index,
      id,
      triggers,
    };

    // Initialize the focus trap
    focusTrap = createFocusTrap(componentElement, {
      onActivate: () => {
        componentElement.setAttribute('aria-hidden', 'false');
      },
      onDeactivate: () => {
        componentElement.setAttribute('aria-hidden', 'true');
      },
      escapeDeactivates: true, // Escape key will close the modal
    });

    triggers.forEach((trigger) => {
      const linkValue = trigger.getAttribute('href') as string;
      trigger.setAttribute('open-modal-link', linkValue);
      trigger.setAttribute('href', '#');
      trigger.addEventListener('click', () => open(instance, trigger, focusTrap));
    });
  });

  componentElement.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute('global-modal-element') !== 'close') return;

    close(componentElement, focusTrap);
  });

  //Closing on button with a tag
  closeButtons.forEach((elButton) => {
    const href = elButton.querySelector('a') as HTMLElement;
    href?.addEventListener('click', () => {
      close(componentElement, focusTrap);
    });
  });
};
