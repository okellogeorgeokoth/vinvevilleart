/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Artist = {
  _id: string;
  _type: "artist";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  fullName?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  country?: string;
  bio?: string;
};

export type Exhibition = {
  _id: string;
  _type: "exhibition";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  date?: string;
  venue?: string;
  guestsOfHonor?: Array<string>;
  presentArtists?: Array<string>;
  sponsors?: Array<string>;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
};

export type Sale = {
  _id: string;
  _type: "sale";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: string;
  discountAmount?: number;
  couponCode?: string;
  validFrom?: string;
  validUntil?: string;
  isActive?: boolean;
};

export type Order = {
  _id: string;
  _type: "order";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  orderNumber?: string;
  stripeCheckoutSessionId?: string;
  stripeCustomerId?: string;
  clerkUserId?: string;
  customerName?: string;
  email?: string;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
  paypalPayerId?: string;
  products?: Array<{
    product?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "product";
    };
    quantity?: number;
    _key: string;
  }>;
  totalPrice?: number;
  currency?: string;
  amountDiscount?: number;
  status?: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  orderDate?: string;
};

export type Product = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  price?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  stock?: number;
};

export type Category = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  description?: string;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  markDefs?: Array<{
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  _type: "image";
  _key: string;
}>;

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Artist | Exhibition | Sale | Order | Product | Category | Slug | BlockContent | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/lib/artists/getAllArtists.tsx
// Variable: ALL_ARTISTS_QUERY
// Query: *[_type == "artist"] | order(fullName asc) {      _id,      fullName,      slug {        current      },      image {        asset -> {          url        }      },      country,      bio    }
export type ALL_ARTISTS_QUERYResult = Array<{
  _id: string;
  fullName: string | null;
  slug: {
    current: string | null;
  } | null;
  image: {
    asset: {
      url: string | null;
    } | null;
  } | null;
  country: string | null;
  bio: string | null;
}>;

// Source: ./sanity/lib/artists/getArtistBySlug.ts
// Variable: ARTIST_BY_SLUG_QUERY
// Query: *[_type == "artist" && slug.current == $slug][0] {      _id,      fullName,      slug {        current      },      image {        asset -> {          url        }      },      country,      bio    }
export type ARTIST_BY_SLUG_QUERYResult = {
  _id: string;
  fullName: string | null;
  slug: {
    current: string | null;
  } | null;
  image: {
    asset: {
      url: string | null;
    } | null;
  } | null;
  country: string | null;
  bio: string | null;
} | null;

// Source: ./sanity/lib/exhibitions/getExhibitionBySlug.ts
// Variable: EXHIBITION_BY_SLUG_QUERY
// Query: *[_type == "exhibition" && slug.current == $slug][0] {      _id,      title,      slug {        current      },      date,      venue,      guestsOfHonor,      presentArtists,      sponsors,      image {        asset -> {          url        }      },      description    }
export type EXHIBITION_BY_SLUG_QUERYResult = {
  _id: string;
  title: string | null;
  slug: {
    current: string | null;
  } | null;
  date: string | null;
  venue: string | null;
  guestsOfHonor: Array<string> | null;
  presentArtists: Array<string> | null;
  sponsors: Array<string> | null;
  image: {
    asset: {
      url: string | null;
    } | null;
  } | null;
  description: string | null;
} | null;

// Source: ./sanity/lib/exhibitions/getExhibitions.ts
// Variable: EXHIBITIONS_QUERY
// Query: *[_type == "exhibition"] | order(date asc) {      _id,      title,      slug {        current      },      date,      venue,      guestsOfHonor,      presentArtists,      sponsors,      image {        asset -> {          url        }      },      description    }
export type EXHIBITIONS_QUERYResult = Array<{
  _id: string;
  title: string | null;
  slug: {
    current: string | null;
  } | null;
  date: string | null;
  venue: string | null;
  guestsOfHonor: Array<string> | null;
  presentArtists: Array<string> | null;
  sponsors: Array<string> | null;
  image: {
    asset: {
      url: string | null;
    } | null;
  } | null;
  description: string | null;
}>;

// Source: ./sanity/lib/products/getAllCategories.ts
// Variable: ALL_CATEGORIES_QUERY
// Query: *[_type == "category"] | order(name asc)
export type ALL_CATEGORIES_QUERYResult = Array<{
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  description?: string;
}>;

// Source: ./sanity/lib/products/getAllProducts.ts
// Variable: ALL_PRODUCTS_QUERY
// Query: *[_type == "product"] | order(name asc)
export type ALL_PRODUCTS_QUERYResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  price?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  stock?: number;
}>;

// Source: ./sanity/lib/products/getProductBySlug.ts
// Variable: PRODUCT_BY_ID_QUERY
// Query: *[_type == "product" && slug.current == $slug] | order(name asc) [0]
export type PRODUCT_BY_ID_QUERYResult = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  price?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  stock?: number;
} | null;

// Source: ./sanity/lib/products/getProductsByCategory.ts
// Variable: PRODUCTS_BY_CATEGORY_QUERY
// Query: *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
export type PRODUCTS_BY_CATEGORY_QUERYResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  price?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  stock?: number;
}>;

// Source: ./sanity/lib/products/searchProductsByName.ts
// Variable: PRODUCT_SEARCH_QUERY
// Query: *[_type == "product" && name match $searchParam] | order(name asc)
export type PRODUCT_SEARCH_QUERYResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  price?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  stock?: number;
}>;

// Source: ./sanity/lib/sales/getActiveSaleByCouponCode.ts
// Variable: ACTIVE_SALE_BY_COUPON_QUERY
// Query: *[_type == "sale" && isActive == true && couponCode == $couponCode] | order(validFrom desc)[0]
export type ACTIVE_SALE_BY_COUPON_QUERYResult = {
  _id: string;
  _type: "sale";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: string;
  discountAmount?: number;
  couponCode?: string;
  validFrom?: string;
  validUntil?: string;
  isActive?: boolean;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "\n    *[_type == \"artist\"] | order(fullName asc) {\n      _id,\n      fullName,\n      slug {\n        current\n      },\n      image {\n        asset -> {\n          url\n        }\n      },\n      country,\n      bio\n    }\n  ": ALL_ARTISTS_QUERYResult;
    "\n    *[_type == \"artist\" && slug.current == $slug][0] {\n      _id,\n      fullName,\n      slug {\n        current\n      },\n      image {\n        asset -> {\n          url\n        }\n      },\n      country,\n      bio\n    }\n  ": ARTIST_BY_SLUG_QUERYResult;
    "\n    *[_type == \"exhibition\" && slug.current == $slug][0] {\n      _id,\n      title,\n      slug {\n        current\n      },\n      date,\n      venue,\n      guestsOfHonor,\n      presentArtists,\n      sponsors,\n      image {\n        asset -> {\n          url\n        }\n      },\n      description\n    }\n  ": EXHIBITION_BY_SLUG_QUERYResult;
    "\n    *[_type == \"exhibition\"] | order(date asc) {\n      _id,\n      title,\n      slug {\n        current\n      },\n      date,\n      venue,\n      guestsOfHonor,\n      presentArtists,\n      sponsors,\n      image {\n        asset -> {\n          url\n        }\n      },\n      description\n    }\n  ": EXHIBITIONS_QUERYResult;
    "\n        *[_type == \"category\"] | order(name asc) ": ALL_CATEGORIES_QUERYResult;
    "\n        *[_type == \"product\"] | order(name asc) ": ALL_PRODUCTS_QUERYResult;
    "\n        *[_type == \"product\" && slug.current == $slug] | order(name asc) [0]\n    ": PRODUCT_BY_ID_QUERYResult;
    "\n    *[_type == \"product\" && references(*[_type == \"category\" && slug.current == $categorySlug]._id)] | order(name asc)\n  ": PRODUCTS_BY_CATEGORY_QUERYResult;
    "\n        *[_type == \"product\" && name match $searchParam] | order(name asc)\n    ": PRODUCT_SEARCH_QUERYResult;
    "\n        *[_type == \"sale\" && isActive == true && couponCode == $couponCode] | order(validFrom desc)[0]\n    ": ACTIVE_SALE_BY_COUPON_QUERYResult;
  }
}
