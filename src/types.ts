type ConditionByLevel = {
  R: string;
  S: string;
  G: string;
  P: string;
};
type Attraction = {
  id: number;
  list: [string];
  has_copayment: boolean;
  copayment: number;
  levels: string;
};

export type Supplier = {
  id: number;
  name: string;
  info: string;
  conditions: ConditionByLevel;
  rules: string;
  gallery: string;
  district: string;
  phone: string;
  address: string;
  url: string;
  lat: number;
  lng: number;
  tags: [string];
  attraction_objects: [Attraction];
  created_at: string;
  updated_at: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
  week: string;
  last_changed_at: string;
  sh_message: string;
  sh_url: string;
};

// enum CardLevel {
//   r,
//   s,
//   g,
//   p,
// }

export type Dictionary = {
  key: string;
  value: string;
};

// type DictionaryCollection {
//   level: [Dictionary]
//   city: [Dictionary]
//   tag: [Dictionary]
//   activity: [Dictionary]
// }

// type CityZoom {
//   city: string
//   zoom: Int
// }

// type CityLocation {
//   city: string
//   lat: Float
//   lng: Float
// }

// type ZoomCollection {
//   city: [CityZoom]
// }

// type LocationCollection {
//   city: [CityLocation]
// }

export type Point = {
  lat: number;
  lng: number;
};

// type FilterCollection {
//   level: [CardLevel]
//   city: [string]
//   tag: [string]
//   activity: [string]
//   zoom: Int
//   location: Point
// }

// type SupplierCollectionWithFilters {
//   filters: FilterCollection
//   suppliers: [Supplier!]!
//   dictionary: DictionaryCollection
// }

// input MapFilters {
//   language: string
//   city: string
//   subscription: string
//   country: string
// }

// input InputPoint {
//   lat: Float
//   lng: Float
// }

type DefaultFilters = {
  subscription: string;
  city: string;
};

export type FilterLocalizedCollection = {
  subscription: [Dictionary];
  city: [Dictionary];
  tag: [Dictionary];
  activity: [Dictionary];
  zoom: number;
  location: Point;
  defaults: DefaultFilters;
};

export type Marker = {
  lat: number;
  lng: number;
  suppliers: [Supplier];
};

// type Query {
//   filters(name: string, activities: [string], city: string, level: CardLevel, tags: [string]): FilterCollection
//   suppliers_with_filters(name: string, activities: [string], city: string, level: CardLevel, tags: [string]): SupplierCollectionWithFilters
//   suppliers(name: string, activities: string, city: string, district: string, cards: string, tags: string): [Supplier!]!
//   supplier(id: ID): Supplier

//   map_filters(general: MapFilters): FilterLocalizedCollection
//   map_markers(general: MapFilters, leftTopPoint: InputPoint, centerPoint: InputPoint): [Marker]
//   map_search_suppliers(general: MapFilters, search: string): [Supplier]
// }
