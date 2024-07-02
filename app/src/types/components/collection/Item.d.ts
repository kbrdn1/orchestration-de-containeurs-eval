type Collection = {
  id: number;
  name: string;
  sluggy_name: string;
  brand_id: number;
  created_at: string;
  updated_at: string;
};

type JewelCategory = {
  id: number;
  name: string;
  sluggy_name: string;
  jewels_count: number | null;
  sub_categories_count: number | null;
  created_at: string;
  custom_attributes_count?: number | null; // Added custom_attributes_count
};

type JewelSubCategory = {
  id: number;
  name: string;
  sluggy_name: string;
  category_id: number;
  created_at: string;
  jewels_count: number | null;
};

type Jewel = {
  category: JewelCategory;
  sub_category: JewelSubCategory;
  length: number | null;
};

type Brand = {
  id: number;
  name: string;
  sluggy_name: string;
  products_count: number | null;
  collections_count: number | null;
  url: string;
  is_active: number;
  order: number;
  created_at: string;
  updated_at: string;
  ai_prompt: any;
};

type Material = {
  id: number;
  name: string;
  products_count: number | null;
  created_at: string;
};

type Stone = {
  id: number;
  name: string;
  slug: string;
  products_count: number | null;
  created_at: string;
};

type Image = {
  id: number;
  url: string;
  thumbnail_url: string;
  number: number;
  created_at: string;
  updated_at: string;
};

type CustomAttributesValues = {
  embout?: string;
  plaquage?: string;
  "nom-court"?: string;
  modele?: string;
};

type ItemType = {
  id: string;
  ref: string;
  sluggy_ref: string;
  name: string;
  collection: Collection;
  official_vendor_url: string | null;
  short_description: string;
  long_description: string | null;
  product_to_complete: boolean;
  gender: string;
  price: number | null;
  weight: number | null;
  caratage: number | null;
  jewel: Jewel;
  watch: any;
  type: "watch" | "jewel";
  brand: Brand;
  materials: Material[];
  stones: Stone[];
  custom_attributes_values: CustomAttributesValues;
  web_images: Image[];
  appli_images: Image[];
  created_at: string;
  updated_at: string;
};

export { Material, Stone };

export default ItemType;
