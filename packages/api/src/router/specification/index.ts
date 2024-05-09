import { createTRPCRouter } from '../../trpc';
import { specificationTemplateRouter } from './deprecated - template';
import { specificationOptionRouter } from './specificationOption';
import { specificationGroupRouter } from './specificationGroup';

export const specificationsRouter = createTRPCRouter({
  template: specificationTemplateRouter,
  option: specificationOptionRouter,
  group: specificationGroupRouter,
});

export type SpecificationsRouter = typeof specificationsRouter;
