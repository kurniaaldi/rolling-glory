export interface ProductAttributes {
  id: number;
  name: string;
  points: number;
  stock: number;
  images: string[];
  isNew: number;
  rating: number;
  numOfReviews: number;
  isWishlist: number;
  slug: string;
  description: string;
}

export interface Product {
  id: string;
  type: string;
  attributes: ProductAttributes;
}

export interface ApiResponse {
  meta: {
    totalItems: number;
    currentPage: number;
    itemPerPage: number;
    totalPages: number;
  };
  data: Product[];
  links: {
    self: string;
    next: string;
    last: string;
  };
}
