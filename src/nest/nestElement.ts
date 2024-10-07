// import { loadElement } from '$utils/loadElement';
// import { queryElements } from '$utils/queryElements';

import { loadElement } from './loadElement';
import { queryElements } from './queryElement';

export const nestedElement = () => {
  const instances: HTMLElement[] = queryElements('[nested-collection-element="target"]');
  if (!instances.length) return;

  instances.forEach((instance) => {
    const nestTarget = instance;

    const attributeValues = [
      'nested-collection-item-slug',
      'nested-collection-slug',
      'nested-collection-id',
    ].map((attribute) => nestTarget.getAttribute(attribute));

    const [collectionItemSlug, collectionSlug, collectionId] = attributeValues;
    if (!collectionItemSlug || !collectionSlug || !collectionId) return;

    loadElement(nestTarget, collectionSlug, collectionItemSlug, collectionId);
  });
};
