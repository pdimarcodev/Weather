// WMO Weather interpretation codes (WW):
// https://open-meteo.com/en/docs/dwd-api

interface IIcon {
  description: string;
  icon: string;
}

export const WMOCodesMapper: Record<number, IIcon> = {
  0: {
    description: 'Sunny',
    icon: '01',
  },
  1: {
    description: 'Mainly Sunny',
    icon: '02',
  },
  2: {
    description: 'Partly Cloudy',
    icon: '02',
  },

  3: {
    description: 'Cloudy',
    icon: '03',
  },

  45: {
    description: 'Foggy',
    icon: '50',
  },

  48: {
    description: 'Rime Fog',
    icon: '50',
  },

  51: {
    description: 'Light Drizzle',
    icon: '09',
  },

  53: {
    description: 'Drizzle',
    icon: '09',
  },

  55: {
    description: 'Heavy Drizzle',
    icon: '09',
  },

  56: {
    description: 'Light Freezing Drizzle',
    icon: '09',
  },

  57: {
    description: 'Freezing Drizzle',
    icon: '09',
  },

  61: {
    description: 'Light Rain',
    icon: '10',
  },

  63: {
    description: 'Rain',
    icon: '10',
  },

  65: {
    description: 'Heavy Rain',
    icon: '10',
  },

  66: {
    description: 'Light Freezing Rain',
    icon: '10',
  },

  67: {
    description: 'Freezing Rain',
    icon: '10',
  },

  71: {
    description: 'Light Snow',
    icon: '13',
  },

  73: {
    description: 'Snow',
    icon: '13',
  },

  75: {
    description: 'Heavy Snow',
    icon: '13',
  },

  77: {
    description: 'Snow Grains',
    icon: '13',
  },

  80: {
    description: 'Light Showers',
    icon: '09',
  },

  81: {
    description: 'Showers',
    icon: '09',
  },

  82: {
    description: 'Heavy Showers',
    icon: '09',
  },

  85: {
    description: 'Light Snow Showers',
    icon: '13',
  },

  86: {
    description: 'Snow Showers',
    icon: '13',
  },

  95: {
    description: 'Thunderstorm',
    icon: '11',
  },

  96: {
    description: 'Light Thunderstorms With Hail',
    icon: '11',
  },

  99: {
    description: 'Thunderstorm With Hail',
    icon: '11',
  },
};
