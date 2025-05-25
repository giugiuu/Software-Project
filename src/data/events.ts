export interface Event {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  description: string;
  imageUrl: string;
  tickets: {
    regular: { price: number; available: number };
    fanPit: { price: number; available: number };
    vip: { price: number; available: number };
  };
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Night Concert',
    artist: 'Mohamed Hamaki',
    date: 'July 15, 2025',
    time: '8:00 PM',
    venue: 'Cairo International Stadium',
    city: 'Cairo',
    description: `Experience the magic of Mohamed Hamaki live in concert at Cairo International Stadium. 
    Known for his powerful vocals and energetic performances, Hamaki will perform his greatest hits 
    along with new songs from his latest album. This will be a night to remember for music fans of all ages.`,
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    tickets: {
      regular: { price: 80, available: 2000 },
      fanPit: { price: 100, available: 500 },
      vip: { price: 120, available: 100 }
    }
  },
  {
    id: '2',
    title: 'Desert Rhythms Festival',
    artist: 'Amr Diab',
    date: 'August 5, 2025',
    time: '7:30 PM',
    venue: 'Pyramids of Giza',
    city: 'Giza',
    description: `Join us for an unforgettable evening with the legendary Amr Diab against the backdrop 
    of the magnificent Pyramids of Giza. The king of Mediterranean music will bring his timeless classics 
    and contemporary hits to this historic venue. Witness this spectacular fusion of modern music and 
    ancient history under the stars.`,
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    tickets: {
      regular: { price: 80, available: 3000 },
      fanPit: { price: 100, available: 1000 },
      vip: { price: 120, available: 250 }
    }
  },
  {
    id: '3',
    title: 'Alexandrian Nights',
    artist: 'Sherine Abdel Wahab',
    date: 'September 10, 2025',
    time: '9:00 PM',
    venue: 'Bibliotheca Alexandrina',
    city: 'Alexandria',
    description: `Sherine Abdel Wahab brings her powerful voice and emotional performances to the 
    beautiful Bibliotheca Alexandrina. Known for her expressive vocals and heartfelt lyrics, 
    Sherine will perform a special selection of songs spanning her illustrious career in this 
    intimate setting by the Mediterranean Sea.`,
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
    tickets: {
      regular: { price: 80, available: 1500 },
      fanPit: { price: 100, available: 400 },
      vip: { price: 120, available: 150 }
    }
  },
  {
    id: '4',
    title: 'Nile River Concert',
    artist: 'Tamer Hosny',
    date: 'October 20, 2025',
    time: '8:30 PM',
    venue: 'Luxor Temple',
    city: 'Luxor',
    description: `Tamer Hosny, one of Egypt's most beloved pop stars, performs live at the historic 
    Luxor Temple. Experience an enchanting evening of music and entertainment as Tamer brings his 
    chart-topping hits to this ancient venue. The concert will feature special effects and 
    surprise guests, making it a must-attend event for music enthusiasts.`,
    imageUrl: 'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg',
    tickets: {
      regular: { price: 80, available: 2000 },
      fanPit: { price: 100, available: 500 },
      vip: { price: 120, available: 200 }
    }
  }
];

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};