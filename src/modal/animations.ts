import { gsap } from 'gsap';

import { getScrollbarWidth } from './getscrollwidth';

const scrollbarWidth = getScrollbarWidth();

export function animateOpenModal(
  componentEl: HTMLElement,
  instanceEl: HTMLElement,
  duration: number
) {
  const dur = duration / 1000;

  const tl = gsap.timeline();
  tl.to('body', { overflow: 'hidden', paddingRight: scrollbarWidth, duration: 0 });
  tl.to(instanceEl, { paddingRight: scrollbarWidth, duration: 0 });
  // tl.to('body', { overflow: 'hidden', duration: 0 });
  // tl.to(instanceEl, { duration: 0 });

  tl.fromTo(componentEl, { opacity: 0 }, { opacity: 1, duration: dur }, 'anim');
}

export function animateCloseModal(componentEl: HTMLElement, duration: number) {
  const dur = duration / 1000;

  const tl = gsap.timeline();
  tl.to('body', { overflow: '', paddingRight: '', duration: 0 }, 'anim');
  tl.fromTo(componentEl, { opacity: 1 }, { opacity: 0, duration: dur }, 'anim');
}
