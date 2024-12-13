interface AxisConfig {
    maxSpeed: number;
    acceleration: number;
    softLimitPos: number;
    softLimitNeg: number;
  }
  
  interface Axis {
    id: number;
    name: string;
    enabled: boolean;
    error: boolean;
    currentPosition: number;
    speed: number;
    maxSpeed: number;
    acceleration: number;
    softLimitPos: number;
    softLimitNeg: number;
    positiveLimit: boolean;
    negativeLimit: boolean;
    unit: string;
  }