import { animateCloseModal, animateOpenModal } from './animations';
import type { ModalInstance } from './types';

const animationDuration = 200;

function open(instance: ModalInstance) {
  const { componentElement, index, instanceElement } = instance;
  componentElement.setAttribute('global-modal-active', `${index}`);
  animateOpenModal(componentElement, instanceElement, animationDuration);
}

function close(componentElement: HTMLElement) {
  animateCloseModal(componentElement, animationDuration);
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
    const triggers: HTMLElement[] = Array.from(document.querySelectorAll(`a[href="#${id}"]`));
    if (!triggers.length || !id) return;

    const instance: ModalInstance = {
      componentElement,
      instanceElement,
      index,
      id,
      triggers,
    };

    triggers.forEach((trigger) => {
      trigger.setAttribute('href', '#');
      trigger.addEventListener('click', () => open(instance));
    });
  });

  componentElement.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute('global-modal-element') !== 'close') return;

    close(componentElement);
  });

  //Closing on button with a tag
  closeButtons.forEach((elButton) => {
    const href = elButton.querySelector('a') as HTMLElement;
    href?.addEventListener('click', () => {
      close(componentElement);
    });
  });
};
