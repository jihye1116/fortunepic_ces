import { LifetimeReportData } from "@/types/report";

export const dummyReportData: LifetimeReportData = {
  nickname: "Nickname",
  sourceOfInsight: "Four Pillars of Destiny",
  basicEnergyInterpretation: "Basic Energy Interpretation",
  pillars: [
    {
      name: "Year Pillar",
      color: "#5B72B7",
      keywords: [
        { text: "Clear Standard" },
        { text: "Solid Vitality" },
        { text: "Active Responsiveness" },
        { text: "Self-Paced" },
        { text: "Direct Nature" },
      ],
    },
    {
      name: "Day Pillar",
      color: "#2C925E",
      keywords: [
        { text: "Stable Equilibrium" },
        { text: "Inclusive Absorption" },
        { text: "Active Responsiveness" },
        { text: "Internal Accumulation" },
        { text: "Step-by-Step Completion" },
      ],
    },
    {
      name: "Month Pillar",
      color: "#F6E24A",
      keywords: [
        { text: "Goal-Oriented Expansion" },
        { text: "Precise Calibration" },
        { text: "Growth and Refinement Balance" },
        { text: "Emphasis on Fine Detail" },
        { text: "Direct Nature" },
      ],
    },
    {
      name: "Hour Pillar",
      color: "#F16C6E",
      keywords: [
        { text: "Stable Equilibrium" },
        { text: "Inclusive Absorption" },
        { text: "Active Responsiveness" },
        { text: "Internal Accumulation" },
        { text: "Step-by-Step Completion" },
      ],
    },
  ],
  faceReadingAreas: [
    {
      area: "Forehead",
      description:
        "Your thought energy is stable and works to organize structures without excessive ambition",
    },
    {
      area: "Eyes",
      description:
        "You are quick to judge internally but observe situations carefully, conserving energy by not showing your hand externally.",
    },
    {
      area: "Area between the Eyebrows",
      description:
        "Slight tension reacts quickly to minor pressure, showing a structure where mental fatigue tends to accumulate first.",
    },
    {
      area: "Cheekbones",
      description:
        "Slight tension reacts quickly to minor pressure, showing a structure where mental fatigue tends to accumulate first.",
    },
    {
      area: "Nose",
      description:
        "Your energy gathers centrally, favoring stable, security-seeking decisions, which results in limited outward expansion.",
    },
    {
      area: "Cheeks",
      description:
        "While your overall energy is smooth and harmonious, adapting to external demands subtly consumes your inner resources.",
    },
    {
      area: "Mouth",
      description:
        "A pattern of restrained emotional expression is in place; you habitually review your words and actions before execution.",
    },
    {
      area: "Chin",
      description:
        "The tendency is strong to maintain and preserve the current structure rather than expanding the foundation, leading to a slow pace of change.",
    },
  ],
  lifePhases: [
    {
      ageRange: "Ages 15–34",
      phase: "Youth Period",
      description:
        "This period unfolds as a structured journey of growth: initially focusing on stable environmental adaptation and skill groundwork, followed by a dramatic phase of skill manifestation and maximizing output expansion.\n\nIt is characterized by a balanced, step-by-step ascent, where you organize your internal resources before leaping into the external world.\n\nStrong energy for rapidly absorbing new environments, learning, and firmly establishing inner structure and stable life patterns. This stage is about defining your direction and establishing self-management skills within school, relationships, and daily life.\n\nThe Energy of Producing Results fully activates, strengthening the flow where accumulated capabilities translate into concrete achievements. This is when your momentum peaks, activity scope rapidly widens, and impact grows. It is the time for initial achievements and the first meaningful outcomes to be revealed externally.",
    },
    {
      ageRange: "Ages 35–64",
      phase: "Middle Age",
      description:
        "Middle age is a dynamic process of change, re-establishing foundations, and then restructuring your structure through competition and adjustment. The flow is: Change → Establishment → Reorganization.\n\nDriven by the Energy that Triggers Change combined with the Energy Demanding Readjustment. Existing methods become unsustainable, requiring a shift in direction across life's structure. Focus on seeking new methods, reducing unnecessary expansion, and restructuring your activities.\n\nCentered on the Energy of Establishing Self-Foundation, overlaid with the Energy Demanding Responsibility. Your role and identity are redefined. The challenge is to secure personal initiative while creating a stable structure within responsibility and norms.\n\nTransitioning to the Energy of Organizing Expanded Roles and Clarifying Responsibility, coupled with the Energy of Concluding Activities. Resources, relationships, and work spheres are reorganized, setting the stage for the next life phase. The focus shifts from competition and expansion to coordination and refined settlement.",
    },
    {
      ageRange: "Ages 65+",
      phase: "Later Life",
      description:
        "Later life emphasizes inner stability, refining life's balance, organizing responsibilities, and moving toward a dignified conclusion. The flow is: Reorganization → Moderation → Recovery → Stability.\n\nFocused on the Energy of Internal Consolidation and Accumulation. The emphasis is on re-evaluating accumulated experience and relationships rather than new external expansion. Interests naturally shift from external activities to the inner world, simplifying life's structure.\n\nGoverned by the Energy of Redistribution and Moderation. This is a crucial transition where you release unnecessary elements (relationships, lifestyle) and set a new balance. Emotional stability is enhanced, allowing for a calm and comfortable process of simplification.\n\nThe flow is reinforced by the Energy of Financial Stability and Recovery and the Energy of Arranging Roles and Relationships. The process of maintaining life's order and concluding responsibilities unfolds naturally. The overall energy settles gently and mildly, emphasizing stability, protection, and recovery.",
    },
  ],
  areaStrategies: [
    {
      area: "career",
      title: "Career",
      description:
        "The core of your career success lies in structuring achievements and utilizing teams or partnerships to expand your scale. This structure is most natural and effective because the energy of producing results and the energy of collaboration and expansion operate strongly throughout your entire chart.",
      bgColor: "#D4A574",
    },
    {
      area: "health",
      title: "Health",
      description:
        "The key to good health fortune is reducing physical exertion and maintaining a regular rhythm. A structure heavily influenced by Output and Co-Worker energies often leads to high activity levels and strong drive, but this results in rapid energy consumption and a high possibility of overwork, stress, and digestive issues.",
      bgColor: "#5BA5A5",
    },
    {
      area: "wealth",
      title: "Wealth",
      description:
        "The key to good wealth fortune is reducing physical exertion and maintaining a regular rhythm. A structure heavily influenced by Output and Co-Worker energies often leads to high activity levels and strong drive, but this results in rapid energy consumption.",
      bgColor: "#C4A050",
    },
    {
      area: "relationship",
      title: "Relationship",
      description:
        "The key to good relationship fortune is reducing physical exertion and maintaining a regular rhythm. A structure heavily influenced by Output and Co-Worker energies often leads to high activity levels and strong drive, but this results in rapid energy consumption and emotional fatigue.",
      bgColor: "#A57E8D",
    },
  ],
  timeFlows: [
    {
      time: "Morning",
      description:
        "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다.",
    },
    {
      time: "Afternoon",
      description:
        "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다.",
    },
    {
      time: "Evening",
      description:
        "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다.",
    },
  ],
  beneficialEnergies: [
    {
      title: "Water (水)",
      description:
        "Water (水) facilitates flow, and Wood (木) promotes growth. When you consciously incorporate these two energies into your life, your structure stabilizes in a lighter and more expansive form.\n\nWater (水) softens the flow of thought, relationships, and work, resolving stagnant structures. Therefore, actions that increase flow and information exchange—such as travel, learning, conversation, writing, and research—are essential for good fortune.",
    },
    {
      title: "Wood (木)",
      description:
        "Wood (木) governs growth and direction, aiding new attempts and long-term planning. Actions that expand the future—such as creation, planning, strategy development, studying for certifications, and meeting new people—activate the Wood (木) energy.",
    },
  ],
  regulatingEnergies: [
    {
      title: "Earth (土)",
      description:
        "The energy that requires regulation is Earth (土). This is not because you have too much Earth, but because your structure is easily overloaded due to repeated stimulation of the Earth energy. Excessive Earth (土) energy can manifest as phenomena like responsibility, attachment, overwork, or isolation. To mitigate this, you need to avoid the bearing everything alone approach and instead engage in actions that lightly divide and flow work, emotions, and relationships.",
    },
  ],
  timingPrediction: {
    bestTime:
      "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다.",
    cautionTime:
      "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다.",
  },
  tenGodsAndLifeStages: {
    heavenlyStems:
      "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
    earthlyBranches:
      "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
    lifeStages:
      "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
  },
  fourPillarsData: {
    hour: {
      heavenlyStem: "임수",
      heavenlyStem10Gods: "임수",
      earthlyBranch: "임수",
      earthlyBranch10Gods: "임수",
      lifeStage12: "임수",
    },
    day: {
      heavenlyStem: "기토",
      heavenlyStem10Gods: "기토",
      earthlyBranch: "기토",
      earthlyBranch10Gods: "기토",
      lifeStage12: "기토",
    },
    month: {
      heavenlyStem: "갑목",
      heavenlyStem10Gods: "갑목",
      earthlyBranch: "갑목",
      earthlyBranch10Gods: "갑목",
      lifeStage12: "갑목",
    },
    year: {
      heavenlyStem: "경금",
      heavenlyStem10Gods: "경금",
      earthlyBranch: "경금",
      earthlyBranch10Gods: "경금",
      lifeStage12: "경금",
    },
  },
  essentialSelfItems: [
    {
      label: "Daystem",
      element: "Earth",
      description:
        "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
    },
    {
      label: "Useful God",
      element: "Water",
      description:
        "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
    },
  ],
  elementDistributionItems: [
    {
      element: "Fire",
      percentage: 20,
      icon: "/src/assets/icons/elements/fire.svg",
    },
    {
      element: "Earth",
      percentage: 20,
      icon: "/src/assets/icons/elements/earth.svg",
    },
    {
      element: "Wood",
      percentage: 20,
      icon: "/src/assets/icons/elements/wood.svg",
    },
    {
      element: "Metal",
      percentage: 20,
      icon: "/src/assets/icons/elements/metal.svg",
    },
    {
      element: "Water",
      percentage: 20,
      icon: "/src/assets/icons/elements/water.svg",
    },
  ],
  actionGuide: {
    recommend:
      "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
    avoid:
      "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
  },
};
