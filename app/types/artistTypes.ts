// types/artistTypes.ts
export interface Artist {
    _id: string;
    slug: { current: string | null } | null;
    image: { asset: { url: string | null } | null } | null;
    fullName: string | null;
    country: string | null;
    bio: string | null;
  }
  
  export interface ArtistPageProps {
    params: {
      slug: string;
    };
  }
  