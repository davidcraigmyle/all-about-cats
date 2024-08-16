export interface CatImage {
    id: string;
    url: string;
    favoriteId?: string;
    voteScore?: number;
  }
  
  export interface Vote {
    id: string;
    image_id: string;
    value: number;
  }
  
  export interface Favorite {
    id: string;
    image_id: string;
  }
  