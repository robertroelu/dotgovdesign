import { getCollectionElements } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

export const loadElement = async (
  nestTarget: HTMLElement,
  collectionSlug: string,
  collectionItemSlug: string,
  collectionId: string
) => {
  // source of the page that has the collection
  const pageSource = `${collectionSlug}/${collectionItemSlug}`;

  // fetching the page and getting the text
  const pageData = await fetch(pageSource);
  const pageText = await pageData.text();

  // using dom parser to generate a document using page text
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageText, 'text/html');

  // selector for our collection
  const selector = `#${collectionId}`;

  // fetching all the items in the collection wrapper using the getCollectionElements util
  const wrapper = (await getCollectionElements(selector, 'wrapper', doc)) as HTMLElement;

  nestTarget.append(wrapper);

  gsap.fromTo(
    nestTarget,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.5,
      ease: 'linear',
    }
  );
};
