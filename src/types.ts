export type TPrayer = {
  prayer: { time: string; title: string; ago: string };
  classes: string;
  current: boolean;
  index: number;
};

export type TPrayerList = {
  prayers: Array<any>;
  currentPrayer?: number;
};

export type TProgress = {
  bar: number;
};

export type TNavBar = {
  changeCity: (city: number) => void;
  city: number;
};

export type TLocation = {
  location: string;
  tarix: string;
  hijri: string;
  dd: number;
  changeDd: (dd: number) => void;
};

export type TClock = {
  time: string;
};

export type TClockState = {
  time: string;
};
