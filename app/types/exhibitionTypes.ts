// types/exhibitionTypes.ts

export interface Exhibition {
    _id: string;
    slug: { current: string | null } | null;
    image: { asset: { url: string | null } | null } | null;
    title: string | null;
    date: string | null;
    venue: string | null;
    guestsOfHonor: string[] | null;
    sponsors: string[] | null;
    presentArtists: string[] | null;
    description: string | null;
  }
  
  export interface ExhibitionPageProps {
    params: { slug: string };
  }
  