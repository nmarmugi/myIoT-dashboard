export interface ISensor {
  id: string
  name: string
  location: string
  threshold: number
  lastValue?: number
  isClicked?: boolean
  status?: boolean
}

export type TSortStatus = {
  id: boolean;
  name: boolean;
  location: boolean;
  lastValue: boolean;
  status: boolean;
};
