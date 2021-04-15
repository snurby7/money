import { ICoreNode, IFormattedNode } from '@snurbco/contracts';

export const getFormattedNode = (node: ICoreNode): IFormattedNode => ({
  id: node.id,
  value: node.name ?? 'not-sure-why-there-is-no-name',
});
