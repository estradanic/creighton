export type Appearance = "dry" | "damp" | "shiny" | "wet";
export type Consistency = "na" | "stringy" | "ropey" | "pasty" | "gummy";
export type Sensation = "dry" | "smooth" | "lubricative";
export type Color = "na" | "clear" | "cloudy-white" | "cloudy-clear" | "yellow" | "brown" | "red";
export type Stretchability = "none" | "sticky" | "tacky" | "stretchy";
export type Menstruation = "none" | "very-light" | "light" | "medium" | "heavy" | "very-heavy";
export type Coverage = "na" | "blip" | "little" | "much" | "all";

export type Observation = {
  id: string
  sensation: Sensation
  color: Color
  stretchability: Stretchability
  consistency: Consistency
  datetime: string
  notes: string
  menstruation: Menstruation
  appearance: Appearance
  yellowOverride: boolean
  coverage: Coverage
  pms: boolean
  temperature?: number
  intercourse: boolean
};

export const AppearanceHierarchy: Record<Appearance, number> = {
  dry: 0,
  damp: 1,
  wet: 1,
  shiny: 2,
};

export const AppearanceMultiplier = 2;

export const ConsistencyHierarchy: Record<Consistency, number> = {
  na: 0,
  gummy: 0,
  pasty: 0,
  ropey: 1,
  stringy: 2,
};

export const ConsistencyMultiplier = 3;

export const SensationHierarchy: Record<Sensation, number> = {
  dry: 0,
  smooth: 1,
  lubricative: 10000,
};

export const SensationMultiplier = 5;

export const ColorHierarchy: Record<Color, number> = {
  na: 0,
  "cloudy-white": 1,
  yellow: 2,
  "cloudy-clear": 3,
  clear: 4,
  brown: 4,
  red: 4,
};

export const ColorMultiplier = 10;

export const StretchabilityHierarchy: Record<Stretchability, number> = {
  none: 0,
  sticky: 1,
  tacky: 2,
  stretchy: 3,
};

export const StretchabilityMultiplier = 100;

export const MenstruationHierarchy: Record<Menstruation, number> = {
  none: 0,
  "very-light": 1,
  light: 2,
  medium: 3,
  heavy: 4,
  "very-heavy": 5,
};

export const MenstruationMultiplier = 1000;

export type Direction = "up" | "down" | "none";
