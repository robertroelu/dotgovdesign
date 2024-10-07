//Finsweet attributes
// import { linkblockedit } from '@finsweet/attributes-linkblockedit/';
// import { } from '@finsweet/attributes-cmssort/'
// import { } from '@finsweet/attributes-cmsfilter/'
import { scrolldisable } from '@finsweet/attributes-scrolldisable';
// import { } from '@finsweet/attributes-cmsload/'
// import { } from '@finsweet/attributes-socialshare/'

//Modal
import { modal } from '$modal/modal';
import { accessibility } from '$utils/accessibility';

//Nest
// import { nestedElement } from './nest/nestElement';

//Utils
// import { swipers } from '$utils/swipers';
// import { consoleClear } from '$utils/consoleClear';
// import { actualYear } from '$utils/actualYear';
// import { typer } from '$utils/typer';

window.Webflow ||= [];
window.Webflow.push(() => {
  // consoleClear();
  // actualYear();
  // nestedElement();
  // linkblockedit();
  scrolldisable();
  modal();
  accessibility();
  // swipers();
  // typer();
});
