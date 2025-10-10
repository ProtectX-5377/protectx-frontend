export interface AlertResource {
  id: number;
  type: 'motion' | 'smoke' | 'battery' | 'vibration';
  message: string;
  location: string;
  date: string;
  time: string;
  severity: number;
}

export interface AlertResponse {
  data?: AlertResource[];
}
