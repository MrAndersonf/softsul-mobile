export enum ECollections {
  Cultivation = 'Cultivation',
  Currency = 'Currency',
  Delivery = 'Delivery',
  Farm = 'Farm',
  Farmer = 'Farmer',
  Group = 'Group',
  Order = 'Order',
  OrderItems = 'OrderItems',
  Product = 'Product',
  Season = 'Season',
  Subgroup = 'Subgroup',
  Supplier = 'Supplier',
  Unit = 'Unit',
}

export enum EAcessProfile {
  Colaborador = 'Colaborador',
  Administrador = 'Administrador',
  Proprietário = 'Proprietário',
  Centropool = 'Centropool',
  Diretor = 'Diretor',
}

export enum EOrder {
  'asc' = 'asc',
  'desc' = 'desc',
}

export enum EAction {
  insertion = 'insertion',
  edition = 'edition',
}

export enum EShipping {
  CIF = 'CIF',
  FOB = 'FOB',
}

export enum ECompare {
  'menor que' = '<',
  'menor ou igual a' = '<=',
  'igual a' = '==',
  'maior que' = '>',
  'maior ou igual a' = '>=',
  'diferente de' = '!=',
  'contêm no array' = 'array-contains',
  'contêm no array qualquer' = 'array-contains-any',
  'em' = 'in',
  'não em' = 'not-in',
}
