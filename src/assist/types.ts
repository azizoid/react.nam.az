export type TLocation = {
  location: string;
  tarix: string;
  hijri: string;
  dd: number;
  changeDd: (dd: number) => (void);
};


export type TNavBar = {
  changeCity: (city: number) => void;
  city: number;
};

export type TPrayerContainer = {
  prayer: TPrayer;
  classes: string;
  current: boolean;
  index: number;
};

export type TPrayerList = {
  prayers: TPrayer[];
  currentPrayer?: number;
};

//-------

export type TPrayer = {
  id: number;
  title: string;
  time: string;
  rakat: number;
  ago: string;
}

export type TProgress = {
  bar: number;
};

export type TClock = object;

export type TClockState = {
  time: string;
};
