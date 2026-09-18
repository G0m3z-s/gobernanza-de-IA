import { AuditChecklistItem } from '../types';
import { getISO42001AdaptedCatalog, getISO42001AdaptedControls } from '../data/normativeCatalogAdapter';


export const buildAuditChecklistItemId = (organizationId: string, auditId: string, itemType: string, normativeId: string): string => {
  return `${organizationId}_${auditId}_${itemType}_${normativeId}`;
};

export function buildAuditItemsFromNormativeSelection(
  auditId: string,
  organizationId: string,
  userId: string,
  selectedRequirementIds: string[],
  selectedControlIds: string[]
): Partial<AuditChecklistItem>[] {
  const items: Partial<AuditChecklistItem>[] = [];
  
  const requirements = getISO42001AdaptedCatalog();
  const controls = getISO42001AdaptedControls();

  let sequence = 1;

  // Add requirements
  for (const reqId of selectedRequirementIds) {
    const req = requirements.find(r => r.id === reqId);
    if (req) {
      items.push({
        organizationId,
        auditId,
        standardId: 'ISO42001-2023',
        itemType: 'requirement',
        normativeId: req.id,
        id: buildAuditChecklistItemId(organizationId, auditId, 'requirement', req.id),
        code: req.clause,
        title: req.title,
        sequence: sequence++,
        status: 'NOT_STARTED',
        result: 'NOT_EVALUATED',
        createdBy: userId,
      });
    }
  }

  // Add controls
  for (const ctrlId of selectedControlIds) {
    const ctrl = controls.find(c => c.id === ctrlId);
    if (ctrl) {
      items.push({
        organizationId,
        auditId,
        standardId: 'ISO42001-2023',
        itemType: 'control',
        normativeId: ctrl.id,
        id: buildAuditChecklistItemId(organizationId, auditId, 'control', ctrl.id),
        code: ctrl.code,
        title: ctrl.title,
        sequence: sequence++,
        status: 'NOT_STARTED',
        result: 'NOT_EVALUATED',
        createdBy: userId,
      });
    }
  }

  return items;
}
