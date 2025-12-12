// 리포트 관련 타입 정의

export interface PillarKeyword {
  text: string;
}

export interface Pillar {
  name: string;
  color: string;
  keywords: PillarKeyword[];
}

export interface FaceReadingArea {
  area: string;
  description: string;
  icon?: string;
}

export interface LifePhase {
  ageRange: string;
  phase: string;
  description: string;
}

export interface AreaStrategy {
  area: "career" | "health" | "wealth" | "relationship";
  title: string;
  description: string;
  bgColor: string;
}

export interface TimeFlow {
  time: "Morning" | "Afternoon" | "Evening";
  description: string;
}

export interface BeneficialEnergy {
  title: string;
  description: string;
}

export interface RegulatingEnergy {
  title: string;
  description: string;
}

export interface TimingPrediction {
  bestTime: string;
  cautionTime: string;
}

export interface ActionGuide {
  recommend: string;
  avoid: string;
}

export interface TenGodsAndLifeStages {
  heavenlyStems: string;
  earthlyBranches: string;
  lifeStages: string;
}

export interface PillarData {
  heavenlyStem: string;
  heavenlyStem10Gods: string;
  earthlyBranch: string;
  earthlyBranch10Gods: string;
  lifeStage12: string;
}

export interface FourPillarsData {
  hour: PillarData;
  day: PillarData;
  month: PillarData;
  year: PillarData;
}

export interface EssentialSelfItem {
  label: string;
  element: string;
  description: string;
}

export interface RadialChartItem {
  label: string;
  value: number;
  icon: string;
}

export interface ElementDistributionItem {
  element: string;
  percentage: number;
  icon: string;
}

export interface LifetimeReportData {
  nickname: string;
  sourceOfInsight: string;
  basicEnergyInterpretation: string;
  pillars: Pillar[];
  faceReadingAreas: FaceReadingArea[];
  lifePhases: LifePhase[];
  areaStrategies: AreaStrategy[];
  timeFlows: TimeFlow[];
  beneficialEnergies: BeneficialEnergy[];
  regulatingEnergies: RegulatingEnergy[];
  timingPrediction: TimingPrediction;
  tenGodsAndLifeStages?: TenGodsAndLifeStages;
  fourPillarsData?: FourPillarsData;
  essentialSelfItems?: EssentialSelfItem[];
  elementDistributionItems?: ElementDistributionItem[];
  actionGuide: ActionGuide;
  backgroundImage?: string;
  faceReadingImage?: string;
}
