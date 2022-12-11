export type Appearance = "dry" | "damp" | "shiny" | "wet";
export type Consistency = "na" | "stringy" | "pasty" | "gummy";
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
};

export const CoverageHierarchy: Record<Coverage, number> = {
  na: 0,
  blip: 1,
  little: 2,
  much: 3,
  all: 4,
};

export const AppearanceHierarchy: Record<Appearance, number> = {
  dry: 0,
  damp: 1,
  wet: 2,
  shiny: 3,
};

export const ConsistencyHierarchy: Record<Consistency, number> = {
  na: 0,
  gummy: 1,
  pasty: 1,
  stringy: 5,
};

export const SensationHierarchy: Record<Sensation, number> = {
  dry: 0,
  smooth: 1,
  lubricative: 30,
};

export const ColorHierarchy: Record<Color, number> = {
  na: 0,
  yellow: 1,
  "cloudy-white": 2,
  "cloudy-clear": 3,
  clear: 20,
  brown: 21,
  red: 22,
};

export const StretchabilityHierarchy: Record<Stretchability, number> = {
  none: 0,
  sticky: 10,
  tacky: 20,
  stretchy: 30,
};

export const MenstruationHierarchy: Record<Menstruation, number> = {
  none: 0,
  "very-light": 100,
  light: 150,
  medium: 200,
  heavy: 250,
  "very-heavy": 300,
};
