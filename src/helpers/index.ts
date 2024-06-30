// WMO Weather interpretation codes (WW):
// https://open-meteo.com/en/docs/dwd-api

import { IIcon } from '../interfaces';

export const WMOCodesMapper: Record<number, IIcon> = {
  0: {
    description: 'Clear',
    icon: '01',
  },
  1: {
    description: 'Mainly Clear',
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

export const dateTimeFormatter = (ISODate?: string) => {
  if (!ISODate) return '';

  const date = new Date(ISODate);

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
    timeStyle: 'short',
    hour12: true,
  })
    .format(date)
    .replace('at', ' -')
    .replace('am', 'AM')
    .replace('pm', 'PM');
};

const DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

export const getCardinalWindDirection = (degrees?: number): string => {
  if (degrees === undefined) return '';

  const i = Math.round((degrees + 11.25) / 22.5) % 16;
  return DIRECTIONS[i];
};
