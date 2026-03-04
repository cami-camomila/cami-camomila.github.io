
export type Category = 'cultura' | 'natureza' | 'gastronomia' | 'historia' | 'city' | 'state';

export interface MediaItem {
  id: string;
  type: 'video' | 'audio' | 'foto' | 'noticia';
  title: string;
  author?: string;
  url: string;
  thumbnail?: string;
  date?: string;
  tags: string[];
  summary?: string;
}

export interface Metric {
  label: string;
  value: string;
  description?: string;
}

export interface LocationProfile {
  id: string;
  name: string;
  state: string;
  region: string;
  description: string;
  metrics: Metric[];
  media: MediaItem[];
}

export interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: Category;
  level: 1 | 2; // 1: State, 2: Point
  isReal?: boolean;
  stateId?: string;
}
