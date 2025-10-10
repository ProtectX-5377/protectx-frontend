export interface Alert {
  id: number;
  type: 'motion' | 'smoke' | 'battery' | 'vibration';
  message: string;
  location: string;
  date: string;
  time: string;
  severity: number;
}
