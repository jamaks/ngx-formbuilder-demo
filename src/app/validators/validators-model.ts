import { Material, Operation, Sections } from '../model';


export function operationMaterialCountValidate(operationTypeCount: number, sections: Sections): boolean {
  if(!sections){
    return false;
  }
  if (!sections.materials && sections.materials.length < 1 ) {
    return false;
  }
  const allMaterialsCount = sections.materials.reduce((a, c) => { if (c.count) { a += c.count; } return a; }, 0);
  const allUsedMaterialCount = sections.operations.reduce((a, c) => { if (c.materialCount) { a += c.materialCount; } return a; }, 0);
  // console.log(allMaterialsCount, allUsedMaterialCount);

  return allMaterialsCount >= allUsedMaterialCount;
}
