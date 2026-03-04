import { Pin, LocationProfile } from './types';

export const PINS: Pin[] = [
  // Level 1: States (Now the entry points)
  { id: 'st-rj', name: 'Rio de Janeiro', lat: -22.9, lng: -43.2, category: 'state', level: 1 },
  { id: 'st-sp', name: 'São Paulo', lat: -23.5, lng: -46.6, category: 'state', level: 1 },
  { id: 'st-ba', name: 'Bahia', lat: -12.9, lng: -38.5, category: 'state', level: 1 },
  { id: 'st-am', name: 'Amazonas', lat: -3.1, lng: -60.0, category: 'state', level: 1 },
  { id: 'st-mg', name: 'Minas Gerais', lat: -18.5, lng: -44.5, category: 'state', level: 1 },

  // Level 2: Local Points & Cities within States
  // Rio de Janeiro
  { id: 'city-rj', name: 'Rio de Janeiro (Capital)', lat: -22.9068, lng: -43.1729, category: 'city', level: 2, stateId: 'st-rj' },
  { id: 'city-niteroi', name: 'Niterói', lat: -22.8833, lng: -43.0533, category: 'city', level: 2, stateId: 'st-rj' },
  { id: 'city-buzios', name: 'Armação dos Búzios', lat: -22.7469, lng: -41.8817, category: 'city', level: 2, stateId: 'st-rj' },
  { id: 'cristo', name: 'Christ the Redeemer', lat: -22.981, lng: -43.210, category: 'historia', level: 2, stateId: 'st-rj' },
  { id: 'pedra-do-sal', name: 'Pedra do Sal', lat: -22.898, lng: -43.185, category: 'cultura', level: 2, isReal: true, stateId: 'st-rj' },

  // São Paulo
  { id: 'city-sp', name: 'São Paulo (Capital)', lat: -23.5505, lng: -46.6333, category: 'city', level: 2, stateId: 'st-sp' },
  { id: 'city-campinas', name: 'Campinas', lat: -22.9056, lng: -47.0608, category: 'city', level: 2, stateId: 'st-sp' },
  { id: 'city-santos', name: 'Santos', lat: -23.9608, lng: -46.3339, category: 'city', level: 2, stateId: 'st-sp' },
  { id: 'masp', name: 'MASP', lat: -23.561, lng: -46.655, category: 'cultura', level: 2, isReal: true, stateId: 'st-sp' },

  // Bahia
  { id: 'city-salvador', name: 'Salvador (Capital)', lat: -12.9714, lng: -38.4514, category: 'city', level: 2, stateId: 'st-ba' },
  { id: 'city-porto-seguro', name: 'Porto Seguro', lat: -16.4497, lng: -39.0647, category: 'city', level: 2, stateId: 'st-ba' },
  { id: 'city-ilheus', name: 'Ilhéus', lat: -14.7889, lng: -39.0494, category: 'city', level: 2, stateId: 'st-ba' },
  { id: 'mercado-modelo', name: 'Mercado Modelo', lat: -13.018, lng: -38.534, category: 'gastronomia', level: 2, stateId: 'st-ba' },
  { id: 'pelourinho', name: 'Pelourinho', lat: -12.971, lng: -38.510, category: 'historia', level: 2, isReal: true, stateId: 'st-ba' },

  // Amazonas
  { id: 'city-manaus', name: 'Manaus (Capital)', lat: -3.1190, lng: -60.0217, category: 'city', level: 2, stateId: 'st-am' },
  { id: 'city-parintins', name: 'Parintins', lat: -2.6286, lng: -56.7358, category: 'city', level: 2, stateId: 'st-am' },
  { id: 'teatro-amazonas', name: 'Amazon Theatre', lat: -3.130, lng: -60.023, category: 'cultura', level: 2, stateId: 'st-am' },

  // Minas Gerais
  { id: 'city-bh', name: 'Belo Horizonte (Capital)', lat: -19.9167, lng: -43.9345, category: 'city', level: 2, stateId: 'st-mg' },
  { id: 'city-ouro-preto', name: 'Ouro Preto', lat: -20.3856, lng: -43.5035, category: 'city', level: 2, stateId: 'st-mg' },
  { id: 'city-tiradentes', name: 'Tiradentes', lat: -21.1103, lng: -44.1781, category: 'city', level: 2, stateId: 'st-mg' },
];

export const PEDRA_DO_SAL_PROFILE: LocationProfile = {
  id: 'pedra-do-sal',
  name: 'Pedra do Sal',
  state: 'Rio de Janeiro',
  region: 'Southeast',
  description: 'Located in the Saúde neighborhood, Pedra do Sal is a historical and religious monument, considered the birthplace of Rio\'s samba and a central point of Little Africa.',
  metrics: [
    { label: 'Local Population', value: '12,450', description: 'Residents in the immediate surroundings' },
    { label: 'Average Income', value: 'R$ 2,840', description: 'Based on Census data' },
    { label: 'Visitors/Month', value: '45,000', description: 'Estimated tourist flow' },
    { label: 'Heritage', value: 'INEPAC', description: 'Listed since 1984' },
  ],
  media: [
    {
      id: 'v1',
      type: 'video',
      title: 'Samba Circle at Pedra do Sal - Monday',
      author: '@sambacarioca',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      thumbnail: 'https://picsum.photos/seed/samba/400/225',
      tags: ['#samba', '#rj', '#culture'],
      date: 'Oct 12, 2025'
    },
    {
      id: 'v2',
      type: 'video',
      title: 'History of Little Africa',
      author: 'Living History Channel',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/history/400/225',
      tags: ['#history', '#africa', '#rj'],
      date: 'Jan 05, 2026'
    },
    {
      id: 'a1',
      type: 'audio',
      title: 'Interview with local Drum Master',
      author: 'Roots Podcast',
      url: '#',
      tags: ['#interview', '#music'],
      date: 'Feb 20, 2026'
    },
    {
      id: 'f1',
      type: 'foto',
      title: 'View of the main staircase',
      author: '@turismorj',
      url: 'https://picsum.photos/seed/pedra1/800/600',
      thumbnail: 'https://picsum.photos/seed/pedra1/400/300',
      tags: ['#architecture', '#rj'],
    },
    {
      id: 'n1',
      type: 'noticia',
      title: 'Pedra do Sal receives new historical lighting project',
      url: 'https://g1.globo.com',
      summary: 'Rio\'s city hall inaugurated this Tuesday the new lighting system that highlights the historical features of the region...',
      date: 'Mar 01, 2026',
      tags: ['#urbanism', '#news']
    }
  ]
};

export const PELOURINHO_PROFILE: LocationProfile = {
  id: 'pelourinho',
  name: 'Pelourinho',
  state: 'Bahia',
  region: 'Northeast',
  description: 'Pelourinho, in the heart of Salvador\'s Historic Center, is a UNESCO World Heritage Site. Famous for its Portuguese colonial baroque architecture, historic churches, and vibrant cultural scene.',
  metrics: [
    { label: 'Historic Mansions', value: '800+', description: 'Preserved colonial architecture' },
    { label: 'Churches', value: '365', description: 'Local tradition: one for each day' },
    { label: 'Visitors/Year', value: '2.5M', description: 'Main destination in Bahia' },
    { label: 'Foundation', value: '1549', description: 'City of Salvador' },
  ],
  media: [
    {
      id: 'p-v1',
      type: 'video',
      title: 'Olodum at Pelourinho - Tuesday of Blessing',
      author: '@olodum_oficial',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/olodum/400/225',
      tags: ['#olodum', '#bahia', '#percussion'],
      date: 'Jan 25, 2026'
    },
    {
      id: 'p-f1',
      type: 'foto',
      title: 'Pelourinho Square at sunset',
      author: '@salvador_fotos',
      url: 'https://picsum.photos/seed/pelo1/800/600',
      thumbnail: 'https://picsum.photos/seed/pelo1/400/300',
      tags: ['#architecture', '#bahia'],
    },
    {
      id: 'p-n1',
      type: 'noticia',
      title: 'Pelourinho hosts international jazz festival',
      url: 'https://bahia.ba',
      summary: 'Salvador\'s Historic Center will host one of the country\'s largest jazz festivals next month...',
      date: 'Mar 02, 2026',
      tags: ['#jazz', '#festival', '#culture']
    }
  ]
};

export const MASP_PROFILE: LocationProfile = {
  id: 'masp',
  name: 'MASP - Museu de Arte de São Paulo Assis Chateaubriand',
  state: 'São Paulo',
  region: 'Southeast',
  description: 'MASP is a landmark of Brazilian modern architecture, designed by Lina Bo Bardi. It is famous for its iconic "floating" structure suspended by four red pillars and houses the most important collection of European art in the Southern Hemisphere.',
  metrics: [
    { label: 'Collection Size', value: '11,000+', description: 'Artworks from antiquity to contemporary' },
    { label: 'Annual Visitors', value: '500k+', description: 'One of the most visited in Brazil' },
    { label: 'Pillar Span', value: '74 meters', description: 'Largest free span in the world at the time' },
    { label: 'Foundation', value: '1947', description: 'By Assis Chateaubriand' },
  ],
  media: [
    {
      id: 'm-v1',
      type: 'video',
      title: 'Lina Bo Bardi and the Architecture of MASP',
      author: 'Architecture Today',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/masp-arch/400/225',
      tags: ['#architecture', '#linabobardi', '#modernism'],
      date: 'Feb 10, 2026'
    },
    {
      id: 'm-f1',
      type: 'foto',
      title: 'The iconic red pillars of MASP',
      author: '@sp_city',
      url: 'https://picsum.photos/seed/masp1/800/600',
      thumbnail: 'https://picsum.photos/seed/masp1/400/300',
      tags: ['#saopaulo', '#landmark'],
    },
    {
      id: 'm-f2',
      type: 'foto',
      title: 'Art collection on glass easels',
      author: '@masp_museu',
      url: 'https://picsum.photos/seed/masp2/800/600',
      thumbnail: 'https://picsum.photos/seed/masp2/400/300',
      tags: ['#art', '#exhibition'],
    },
    {
      id: 'm-n1',
      type: 'noticia',
      title: 'MASP expansion project reaches 70% completion',
      url: 'https://folha.uol.com.br',
      summary: 'The new building, connected by an underground tunnel, will double the museum\'s exhibition capacity...',
      date: 'Mar 03, 2026',
      tags: ['#expansion', '#culture', '#sp']
    }
  ]
};

export const RIO_PROFILE: LocationProfile = {
  id: 'city-rj',
  name: 'Rio de Janeiro',
  state: 'Rio de Janeiro',
  region: 'Southeast',
  description: 'Known as the "Marvelous City", Rio is famous for its breathtaking landscapes, vibrant beaches like Copacabana and Ipanema, and the iconic Christ the Redeemer. It is the heart of Brazilian culture, samba, and bossa nova.',
  metrics: [
    { label: 'Population', value: '6.7M', description: 'Metropolitan area: 13M+' },
    { label: 'GDP', value: 'R$ 364B', description: 'Second largest in Brazil' },
    { label: 'Tourism', value: '2.3M', description: 'International arrivals per year' },
    { label: 'Foundation', value: '1565', description: 'By Estácio de Sá' },
  ],
  media: [
    {
      id: 'rj-v1',
      type: 'video',
      title: 'Rio de Janeiro from Above - 4K',
      author: 'Travel Brazil',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/rio-aerial/400/225',
      tags: ['#rio', '#landscape', '#travel'],
      date: 'Dec 15, 2025'
    },
    {
      id: 'rj-f1',
      type: 'foto',
      title: 'Sunset at Arpoador',
      author: '@carioca_pics',
      url: 'https://picsum.photos/seed/rio-sunset/800/600',
      thumbnail: 'https://picsum.photos/seed/rio-sunset/400/300',
      tags: ['#sunset', '#beach', '#ipanema'],
    }
  ]
};

export const SP_PROFILE: LocationProfile = {
  id: 'city-sp',
  name: 'São Paulo',
  state: 'São Paulo',
  region: 'Southeast',
  description: 'The largest city in South America, São Paulo is a global financial hub and a melting pot of cultures. It is renowned for its gastronomy, nightlife, and world-class museums like MASP.',
  metrics: [
    { label: 'Population', value: '12.3M', description: 'Largest city in the Southern Hemisphere' },
    { label: 'GDP', value: 'R$ 716B', description: 'Largest in Brazil' },
    { label: 'Restaurants', value: '15,000+', description: 'Gastronomic capital of the world' },
    { label: 'Foundation', value: '1554', description: 'By Jesuit priests' },
  ],
  media: [
    {
      id: 'sp-v1',
      type: 'video',
      title: 'A Night in São Paulo - City Lights',
      author: 'Urban Explore',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/sp-night/400/225',
      tags: ['#saopaulo', '#nightlife', '#city'],
      date: 'Jan 20, 2026'
    },
    {
      id: 'sp-f1',
      type: 'foto',
      title: 'Paulista Avenue on Sunday',
      author: '@sp_city_life',
      url: 'https://picsum.photos/seed/paulista/800/600',
      thumbnail: 'https://picsum.photos/seed/paulista/400/300',
      tags: ['#paulista', '#urban', '#culture'],
    }
  ]
};

export const SALVADOR_PROFILE: LocationProfile = {
  id: 'city-salvador',
  name: 'Salvador',
  state: 'Bahia',
  region: 'Northeast',
  description: 'The first capital of Brazil, Salvador is famous for its Afro-Brazilian culture, colonial architecture, and the largest street carnival in the world. Its historic center, Pelourinho, is a UNESCO World Heritage site.',
  metrics: [
    { label: 'Population', value: '2.9M', description: 'Third largest in Brazil' },
    { label: 'Coastline', value: '50km', description: 'Stunning urban beaches' },
    { label: 'Churches', value: '372', description: 'Rich religious heritage' },
    { label: 'Foundation', value: '1549', description: 'First capital of Brazil' },
  ],
  media: [
    {
      id: 'ssa-v1',
      type: 'video',
      title: 'The Magic of Salvador - Bahia',
      author: 'Roots of Brazil',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/salvador-magic/400/225',
      tags: ['#salvador', '#bahia', '#culture'],
      date: 'Feb 05, 2026'
    },
    {
      id: 'ssa-f1',
      type: 'foto',
      title: 'Lacerda Elevator at Night',
      author: '@bahia_sunset',
      url: 'https://picsum.photos/seed/lacerda/800/600',
      thumbnail: 'https://picsum.photos/seed/lacerda/400/300',
      tags: ['#landmark', '#night', '#salvador'],
    }
  ]
};

export const MANAUS_PROFILE: LocationProfile = {
  id: 'city-manaus',
  name: 'Manaus',
  state: 'Amazonas',
  region: 'North',
  description: 'Located in the heart of the Amazon rainforest, Manaus is the gateway to the world\'s largest tropical forest. It is famous for the Amazon Theatre and the "Meeting of Waters" where the Negro and Solimões rivers join.',
  metrics: [
    { label: 'Population', value: '2.2M', description: 'Largest city in the North' },
    { label: 'Forest Area', value: '98%', description: 'Surrounded by pristine rainforest' },
    { label: 'Free Zone', value: 'PIM', description: 'Major industrial hub' },
    { label: 'Foundation', value: '1669', description: 'Fort of São José do Rio Negro' },
  ],
  media: [
    {
      id: 'mao-v1',
      type: 'video',
      title: 'Manaus: Gateway to the Amazon',
      author: 'Eco Travel',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/manaus-amazon/400/225',
      tags: ['#manaus', '#amazon', '#nature'],
      date: 'Mar 01, 2026'
    },
    {
      id: 'mao-f1',
      type: 'foto',
      title: 'Amazon Theatre Detail',
      author: '@amazon_pics',
      url: 'https://picsum.photos/seed/teatro-am/800/600',
      thumbnail: 'https://picsum.photos/seed/teatro-am/400/300',
      tags: ['#architecture', '#history', '#manaus'],
    }
  ]
};

export const BH_PROFILE: LocationProfile = {
  id: 'city-bh',
  name: 'Belo Horizonte',
  state: 'Minas Gerais',
  region: 'Southeast',
  description: 'Surrounded by mountains, Belo Horizonte is known for its modern architecture, especially the Pampulha complex, and its status as the "bar capital" of Brazil. It is a center of innovation and traditional Mineiro culture.',
  metrics: [
    { label: 'Population', value: '2.5M', description: 'Metropolitan area: 6M+' },
    { label: 'Bars/Capita', value: 'Highest', description: 'The bar capital of Brazil' },
    { label: 'Heritage', value: 'Pampulha', description: 'UNESCO World Heritage site' },
    { label: 'Foundation', value: '1897', description: 'First planned modern city' },
  ],
  media: [
    {
      id: 'bh-v1',
      type: 'video',
      title: 'Belo Horizonte: Mountains and Modernism',
      author: 'Minas Culture',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/bh-mountains/400/225',
      tags: ['#bh', '#minas', '#travel'],
      date: 'Mar 10, 2026'
    },
    {
      id: 'bh-f1',
      type: 'foto',
      title: 'Church of Saint Francis of Assisi',
      author: '@bh_clicks',
      url: 'https://picsum.photos/seed/pampulha/800/600',
      thumbnail: 'https://picsum.photos/seed/pampulha/400/300',
      tags: ['#niemeyer', '#pampulha', '#bh'],
    }
  ]
};
