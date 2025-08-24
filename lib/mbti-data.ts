export interface MBTIType {
  type: string;
  title: string;
  description: string;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface Question {
  id: number;
  text: string;
  category: 'E/I' | 'S/N' | 'T/F' | 'J/P';
  dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  image: string;
}

export const mbtiTypes: Record<string, MBTIType> = {
  INTJ: {
    type: 'INTJ',
    title: 'The Architect',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    keywords: ['Strategic', 'Independent', 'Decisive', 'Determined', 'Visionary'],
    strengths: ['Strategic thinking', 'Independence', 'Determination', 'Vision'],
    weaknesses: ['Overly critical', 'Impatient', 'Arrogant', 'Judgmental'],
  },
  INTP: {
    type: 'INTP',
    title: 'The Thinker',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    keywords: ['Analytical', 'Creative', 'Logical', 'Curious', 'Independent'],
    strengths: ['Analytical skills', 'Creativity', 'Open-mindedness', 'Objectivity'],
    weaknesses: ['Insensitive', 'Absent-minded', 'Condescending', 'Loathe rules'],
  },
  ENTJ: {
    type: 'ENTJ',
    title: 'The Commander',
    description: 'Bold, imaginative and strong-willed leaders, always finding a way.',
    keywords: ['Leadership', 'Confident', 'Strategic', 'Charismatic', 'Efficient'],
    strengths: ['Natural leadership', 'Strategic thinking', 'Charisma', 'Efficiency'],
    weaknesses: ['Impatient', 'Arrogant', 'Poor handling of emotions', 'Cold'],
  },
  ENTP: {
    type: 'ENTP',
    title: 'The Debater',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    keywords: ['Innovative', 'Enthusiastic', 'Charismatic', 'Knowledgeable', 'Quick'],
    strengths: ['Innovation', 'Enthusiasm', 'Charisma', 'Knowledge', 'Quick thinking'],
    weaknesses: ['Argumentative', 'Insensitive', 'Intolerant', 'Difficulty focusing'],
  },
  INFJ: {
    type: 'INFJ',
    title: 'The Advocate',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    keywords: ['Idealistic', 'Organized', 'Insightful', 'Inspiring', 'Determined'],
    strengths: ['Idealism', 'Organization', 'Insight', 'Inspiration', 'Determination'],
    weaknesses: ['Sensitive', 'Extremely private', 'Perfectionist', 'Burnout prone'],
  },
  INFP: {
    type: 'INFP',
    title: 'The Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    keywords: ['Creative', 'Idealistic', 'Loyal', 'Values-driven', 'Curious'],
    strengths: ['Creativity', 'Idealism', 'Loyalty', 'Values-driven', 'Curiosity'],
    weaknesses: ['Too idealistic', 'Too altruistic', 'Impractical', 'Dislike dealing with data'],
  },
  ENFJ: {
    type: 'ENFJ',
    title: 'The Protagonist',
    description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    keywords: ['Charismatic', 'Inspiring', 'Natural leader', 'Passionate', 'Altruistic'],
    strengths: ['Charisma', 'Inspiration', 'Natural leadership', 'Passion', 'Altruism'],
    weaknesses: ['Overly idealistic', 'Too selfless', 'Too sensitive', 'Fluctuating self-esteem'],
  },
  ENFP: {
    type: 'ENFP',
    title: 'The Campaigner',
    description:
      'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    keywords: ['Enthusiastic', 'Creative', 'Sociable', 'Energetic', 'Independent'],
    strengths: ['Enthusiasm', 'Creativity', 'Sociability', 'Energy', 'Independence'],
    weaknesses: ['Poor practical skills', 'Difficulty focusing', 'Overthinking', 'Stress easily'],
  },
  ISTJ: {
    type: 'ISTJ',
    title: 'The Logistician',
    description: 'Practical and fact-minded, reliable and responsible.',
    keywords: ['Reliable', 'Practical', 'Fact-minded', 'Responsible', 'Organized'],
    strengths: ['Reliability', 'Practicality', 'Fact-minded', 'Responsibility', 'Organization'],
    weaknesses: ['Stubborn', 'Insensitive', 'Always by the book', 'Judgmental'],
  },
  ISFJ: {
    type: 'ISFJ',
    title: 'The Protector',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    keywords: ['Supportive', 'Reliable', 'Patient', 'Imaginative', 'Observant'],
    strengths: ['Support', 'Reliability', 'Patience', 'Imagination', 'Observation'],
    weaknesses: ['Humble', 'Shy', 'Take things personally', 'Repress feelings'],
  },
  ESTJ: {
    type: 'ESTJ',
    title: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things or people.',
    keywords: ['Organized', 'Practical', 'Logical', 'Assertive', 'Hardworking'],
    strengths: ['Organization', 'Practicality', 'Logic', 'Assertiveness', 'Hard work'],
    weaknesses: [
      'Inflexible',
      'Uncomfortable with unconventional situations',
      'Judgmental',
      'Too focused on social status',
    ],
  },
  ESFJ: {
    type: 'ESFJ',
    title: 'The Consul',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
    keywords: ['Caring', 'Social', 'Popular', 'Helpful', 'Loyal'],
    strengths: ['Care', 'Sociability', 'Popularity', 'Helpfulness', 'Loyalty'],
    weaknesses: [
      'Worried about social status',
      'Inflexible',
      'Vulnerable to criticism',
      'Too selfless',
    ],
  },
  ISTP: {
    type: 'ISTP',
    title: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
    keywords: ['Practical', 'Experimental', 'Spontaneous', 'Rational', 'Prioritize efficiency'],
    strengths: ['Practicality', 'Experimentation', 'Spontaneity', 'Rationality', 'Efficiency'],
    weaknesses: ['Stubborn', 'Insensitive', 'Private', 'Easily bored'],
  },
  ISFP: {
    type: 'ISFP',
    title: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore new possibilities.',
    keywords: ['Flexible', 'Charming', 'Artistic', 'Curious', 'Passionate'],
    strengths: ['Flexibility', 'Charm', 'Artistry', 'Curiosity', 'Passion'],
    weaknesses: ['Fiercely independent', 'Unpredictable', 'Easily stressed', 'Overly competitive'],
  },
  ESTP: {
    type: 'ESTP',
    title: 'The Entrepreneur',
    description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    keywords: ['Energetic', 'Perceptive', 'Spontaneous', 'Rational', 'Practical'],
    strengths: ['Energy', 'Perception', 'Spontaneity', 'Rationality', 'Practicality'],
    weaknesses: ['Impatient', 'Risk-prone', 'Unstructured', 'May miss the bigger picture'],
  },
  ESFP: {
    type: 'ESFP',
    title: 'The Entertainer',
    description:
      'Spontaneous, energetic and enthusiastic people – life is never boring around them.',
    keywords: ['Spontaneous', 'Energetic', 'Enthusiastic', 'People-focused', 'Practical'],
    strengths: ['Spontaneity', 'Energy', 'Enthusiasm', 'People focus', 'Practicality'],
    weaknesses: ['Sensitive', 'Conflict-averse', 'Poor long-term planning', 'Unfocused'],
  },
};

export const questions: Question[] = [
  // Extraversion vs Introversion
  {
    id: 1,
    text: 'questions.q1',
    category: 'E/I',
    dimension: 'E',
    image: '/images/questions/1.png',
  },
  {
    id: 2,
    text: 'questions.q2',
    category: 'E/I',
    dimension: 'E',
    image: '/images/questions/2.png',
  },
  {
    id: 3,
    text: 'questions.q3',
    category: 'E/I',
    dimension: 'E',
    image: '/images/questions/3.png',
  },
  {
    id: 4,
    text: 'questions.q4',
    category: 'E/I',
    dimension: 'I',
    image: '/images/questions/4.png',
  },
  {
    id: 5,
    text: 'questions.q5',
    category: 'E/I',
    dimension: 'I',
    image: '/images/questions/5.png',
  },

  // Sensing vs Intuition
  {
    id: 6,
    text: 'questions.q6',
    category: 'S/N',
    dimension: 'S',
    image: '/images/questions/6.png',
  },
  {
    id: 7,
    text: 'questions.q7',
    category: 'S/N',
    dimension: 'S',
    image: '/images/questions/7.png',
  },
  {
    id: 8,
    text: 'questions.q8',
    category: 'S/N',
    dimension: 'S',
    image: '/images/questions/8.png',
  },
  {
    id: 9,
    text: 'questions.q9',
    category: 'S/N',
    dimension: 'N',
    image: '/images/questions/9.png',
  },
  {
    id: 10,
    text: 'questions.q10',
    category: 'S/N',
    dimension: 'N',
    image: '/images/questions/10.png',
  },

  // Thinking vs Feeling
  {
    id: 11,
    text: 'questions.q11',
    category: 'T/F',
    dimension: 'T',
    image: '/images/questions/11.png',
  },
  {
    id: 12,
    text: 'questions.q12',
    category: 'T/F',
    dimension: 'T',
    image: '/images/questions/12.png',
  },
  {
    id: 13,
    text: 'questions.q13',
    category: 'T/F',
    dimension: 'T',
    image: '/images/questions/13.png',
  },
  {
    id: 14,
    text: 'questions.q14',
    category: 'T/F',
    dimension: 'F',
    image: '/images/questions/14.png',
  },
  {
    id: 15,
    text: 'questions.q15',
    category: 'T/F',
    dimension: 'F',
    image: '/images/questions/15.png',
  },

  // Judging vs Perceiving
  {
    id: 16,
    text: 'questions.q16',
    category: 'J/P',
    dimension: 'J',
    image: '/images/questions/16.png',
  },
  {
    id: 17,
    text: 'questions.q17',
    category: 'J/P',
    dimension: 'J',
    image: '/images/questions/17.png',
  },
  {
    id: 18,
    text: 'questions.q18',
    category: 'J/P',
    dimension: 'J',
    image: '/images/questions/18.png',
  },
  {
    id: 19,
    text: 'questions.q19',
    category: 'J/P',
    dimension: 'P',
    image: '/images/questions/19.png',
  },
  {
    id: 20,
    text: 'questions.q20',
    category: 'J/P',
    dimension: 'P',
    image: '/images/questions/20.png',
  },
];

export function calculateMBTIType(answers: number[]): string {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach((answer, index) => {
    const question = questions[index];
    if (question) {
      // Higher scores (4 = Strongly Agree) add to the dimension
      // Lower scores (1 = Strongly Disagree) subtract from it
      const weight = answer - 2.5; // Convert 1-4 scale to -1.5 to 1.5
      scores[question.dimension] += weight;
    }
  });

  const type =
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  return type;
}

export const compatibilityMatrix: Record<string, Record<string, number>> = {
  INTJ: {
    ENFP: 95,
    ENTP: 90,
    INFJ: 85,
    INFP: 80,
    ENTJ: 75,
    INTP: 70,
    ENFJ: 65,
    ISFP: 60,
    ESTP: 55,
    ESFP: 50,
    ISTJ: 45,
    ISFJ: 40,
    ESTJ: 35,
    ESFJ: 30,
    ISTP: 25,
    ESFP: 20,
  },
  INTP: {
    ENFJ: 95,
    ENTJ: 90,
    INFJ: 85,
    ENFP: 80,
    INTJ: 75,
    ENTP: 70,
    INFP: 65,
    ISFJ: 60,
    ESTJ: 55,
    ESFJ: 50,
    ISTP: 45,
    ISFP: 40,
    ESTP: 35,
    ESFP: 30,
    ISTJ: 25,
    ESFP: 20,
  },
  ENTJ: {
    INFP: 95,
    INTP: 90,
    ENFP: 85,
    INTJ: 80,
    ENTP: 75,
    INFJ: 70,
    ENFJ: 65,
    ISTP: 60,
    ISFP: 55,
    ESTP: 50,
    ESFP: 45,
    ISTJ: 40,
    ISFJ: 35,
    ESTJ: 30,
    ESFJ: 25,
    ESFP: 20,
  },
  ENTP: {
    INFJ: 95,
    INTJ: 90,
    ENFJ: 85,
    INFP: 80,
    ENTJ: 75,
    INTP: 70,
    ENFP: 65,
    ISFJ: 60,
    ISTJ: 55,
    ESTJ: 50,
    ESFJ: 45,
    ISTP: 40,
    ISFP: 35,
    ESTP: 30,
    ESFP: 25,
    ESFP: 20,
  },
  INFJ: {
    ENTP: 95,
    ENFP: 90,
    INTP: 85,
    INTJ: 80,
    ENFJ: 75,
    INFP: 70,
    ENTJ: 65,
    ESTP: 60,
    ESFP: 55,
    ISTP: 50,
    ISFP: 45,
    ESTJ: 40,
    ESFJ: 35,
    ISTJ: 30,
    ISFJ: 25,
    ESFP: 20,
  },
  INFP: {
    ENFJ: 95,
    ENTJ: 90,
    ENFP: 85,
    INTJ: 80,
    INFJ: 75,
    ENTP: 70,
    INTP: 65,
    ESFJ: 60,
    ESTJ: 55,
    ISFJ: 50,
    ISTJ: 45,
    ESTP: 40,
    ESFP: 35,
    ISTP: 30,
    ISFP: 25,
    ESFP: 20,
  },
  ENFJ: {
    INFP: 95,
    INTP: 90,
    ENFP: 85,
    ISFP: 80,
    INFJ: 75,
    ENTP: 70,
    INTJ: 65,
    ESFP: 60,
    ESTP: 55,
    ENFJ: 50,
    ENTJ: 45,
    ISTJ: 40,
    ISFJ: 35,
    ESTJ: 30,
    ESFJ: 25,
    ISTP: 20,
  },
  ENFP: {
    INTJ: 95,
    INFJ: 90,
    ENFJ: 85,
    INFP: 80,
    ENTP: 75,
    ENTJ: 70,
    INTP: 65,
    ISFJ: 60,
    ISTJ: 55,
    ESTJ: 50,
    ESFJ: 45,
    ISTP: 40,
    ISFP: 35,
    ESTP: 30,
    ESFP: 25,
    ESFP: 20,
  },
  ISTJ: {
    ESFP: 95,
    ESTP: 90,
    ENFP: 85,
    ESFJ: 80,
    ISFP: 75,
    ESTJ: 70,
    ISFJ: 65,
    ENTP: 60,
    ENFJ: 55,
    INFP: 50,
    INFJ: 45,
    INTJ: 40,
    INTP: 35,
    ENTJ: 30,
    ISTP: 25,
    ESFP: 20,
  },
  ISFJ: {
    ESTP: 95,
    ESFP: 90,
    ENTP: 85,
    ENFP: 80,
    ISTJ: 75,
    ESTJ: 70,
    ESFJ: 65,
    ENFJ: 60,
    INFP: 55,
    INFJ: 50,
    INTJ: 45,
    INTP: 40,
    ENTJ: 35,
    ISTP: 30,
    ISFP: 25,
    ESFP: 20,
  },
  ESTJ: {
    ISFP: 95,
    ISTP: 90,
    ESFP: 85,
    ISFJ: 80,
    ISTJ: 75,
    ESFJ: 70,
    ESTP: 65,
    ENFP: 60,
    ENTP: 55,
    INFP: 50,
    ENFJ: 45,
    INFJ: 40,
    INTJ: 35,
    INTP: 30,
    ENTJ: 25,
    ESFP: 20,
  },
  ESFJ: {
    ISFP: 95,
    ISTP: 90,
    INFP: 85,
    ISTJ: 80,
    ISFJ: 75,
    ESTJ: 70,
    ESFP: 65,
    ENFP: 60,
    ENFJ: 55,
    INFJ: 50,
    ENTP: 45,
    INTJ: 40,
    INTP: 35,
    ENTJ: 30,
    ESTP: 25,
    ESFP: 20,
  },
  ISTP: {
    ESFJ: 95,
    ESTJ: 90,
    ENFJ: 85,
    ESFP: 80,
    ESTP: 75,
    ISFP: 70,
    ENTP: 65,
    ENFP: 60,
    INFJ: 55,
    INFP: 50,
    ISTJ: 45,
    ISFJ: 40,
    INTJ: 35,
    INTP: 30,
    ENTJ: 25,
    ESFP: 20,
  },
  ISFP: {
    ENFJ: 95,
    ESFJ: 90,
    ESTJ: 85,
    ENTJ: 80,
    ISTJ: 75,
    ISTP: 70,
    ESFP: 65,
    ESTP: 60,
    ENFP: 55,
    ENTP: 50,
    INFJ: 45,
    INFP: 40,
    INTJ: 35,
    INTP: 30,
    ISFJ: 25,
    ESFP: 20,
  },
  ESTP: {
    ISFJ: 95,
    ISTJ: 90,
    ESFJ: 85,
    ISTP: 80,
    ESFP: 75,
    ESTJ: 70,
    ENFJ: 65,
    INFJ: 60,
    ENFP: 55,
    ENTP: 50,
    INFP: 45,
    INTJ: 40,
    INTP: 35,
    ENTJ: 30,
    ISFP: 25,
    ESFP: 20,
  },
  ESFP: {
    ISTJ: 95,
    ISFJ: 90,
    ISTP: 85,
    ESTP: 80,
    ESTJ: 75,
    ESFJ: 70,
    ISFP: 65,
    ENFJ: 60,
    INFJ: 55,
    ENFP: 50,
    ENTP: 45,
    INFP: 40,
    INTJ: 35,
    INTP: 30,
    ENTJ: 25,
    ESFP: 20,
  },
};

export function getCompatibilityScore(type1: string, type2: string): number {
  return compatibilityMatrix[type1]?.[type2] || 50;
}

export function getTopMatches(type: string): Array<{ type: string; score: number }> {
  const scores = compatibilityMatrix[type] || {};
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([matchType, score]) => ({ type: matchType, score }));
}

export function getCompatibilityAnalysis(type1: string, type2: string) {
  const score = getCompatibilityScore(type1, type2);
  const mbti1 = mbtiTypes[type1];
  const mbti2 = mbtiTypes[type2];

  let pros: string[] = [];
  let cons: string[] = [];

  if (score >= 80) {
    pros = [
      'Excellent communication and understanding',
      'Complementary strengths that balance each other',
      'Strong potential for long-term compatibility',
      'Natural chemistry and mutual respect',
    ];
    cons = [
      'May be too similar in some areas',
      'Could lack challenge for growth',
      'Might avoid necessary conflicts',
    ];
  } else if (score >= 60) {
    pros = [
      'Good foundation for understanding',
      'Some complementary traits',
      'Potential for growth together',
    ];
    cons = [
      'May require more effort to understand each other',
      'Some fundamental differences to work through',
      'Communication styles may clash occasionally',
    ];
  } else {
    pros = [
      'Opportunity to learn from differences',
      'Can challenge each other to grow',
      'Unique perspectives to share',
    ];
    cons = [
      'Significant differences in approach',
      'May struggle with communication',
      'Requires patience and understanding',
      'Fundamental value differences possible',
    ];
  }

  return { pros, cons };
}
