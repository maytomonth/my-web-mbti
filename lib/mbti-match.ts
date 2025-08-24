export type MBTICompatibility = {
  from: string; // 나의 MBTI
  to: string; // 상대의 MBTI
  score: number; // 0-100
  pros: string; // 궁합의 강점 (한국어)
  cons: string; // 자주 겪는 이슈 (한국어)
};

const MBTI_TYPES: string[] = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
];

const DEFAULT_PROS = '서로 다른 관점을 존중하며 새로운 시각을 배울 수 있습니다.';
const DEFAULT_CONS = '성격 차이로 인해 초기에는 이해가 어려울 수 있습니다.';

function keyOf(a: string, b: string): string {
  return `${a}-${b}`;
}

function hashInRange(key: string, min: number, max: number): number {
  let acc = 0;
  for (let i = 0; i < key.length; i += 1) acc += key.charCodeAt(i) * (i + 1);
  const span = max - min;
  return min + (acc % (span + 1));
}

function diffCount(a: string, b: string): number {
  let d = 0;
  for (let i = 0; i < 4; i += 1) if (a[i] !== b[i]) d += 1;
  return d;
}

// 알려진 좋은 궁합(매칭) 쌍
const SPECIAL_MATCH_PAIRS = new Set<string>([
  keyOf('INTJ', 'ENFP'),
  keyOf('ENFP', 'INTJ'),
  keyOf('INFJ', 'ENTP'),
  keyOf('ENTP', 'INFJ'),
  keyOf('INFP', 'ENTJ'),
  keyOf('ENTJ', 'INFP'),
  keyOf('INTP', 'ENFJ'),
  keyOf('ENFJ', 'INTP'),
  keyOf('ISTJ', 'ESFP'),
  keyOf('ESFP', 'ISTJ'),
  keyOf('ISFJ', 'ESTP'),
  keyOf('ESTP', 'ISFJ'),
  keyOf('ISTP', 'ESFJ'),
  keyOf('ESFJ', 'ISTP'),
  keyOf('ISFP', 'ESTJ'),
  keyOf('ESTJ', 'ISFP'),
]);

// 상극(클래싱)으로 자주 언급되는 쌍
const SPECIAL_CLASH_PAIRS = new Set<string>([
  keyOf('INTJ', 'ESFP'),
  keyOf('ESFP', 'INTJ'),
  keyOf('INFJ', 'ESTP'),
  keyOf('ESTP', 'INFJ'),
  keyOf('INTP', 'ESFJ'),
  keyOf('ESFJ', 'INTP'),
  keyOf('INFP', 'ESTJ'),
  keyOf('ESTJ', 'INFP'),
  keyOf('ENTJ', 'ISFP'),
  keyOf('ISFP', 'ENTJ'),
  keyOf('ENFJ', 'ISTP'),
  keyOf('ISTP', 'ENFJ'),
  keyOf('ENTP', 'ISFJ'),
  keyOf('ISFJ', 'ENTP'),
  keyOf('ENFP', 'ISTJ'),
  keyOf('ISTJ', 'ENFP'),
]);

// 특정 쌍에 대한 오버라이드(점수/문구)
const OVERRIDES = new Map<string, Pick<MBTICompatibility, 'score' | 'pros' | 'cons'>>([
  [
    keyOf('INFP', 'ENTJ'),
    {
      score: 88,
      pros: '가치 중심성과 실행력이 결합되어 장기 목표를 현실로 옮기기 좋습니다.',
      cons: '직설적인 피드백과 감정적 배려 사이에서 갈등이 생길 수 있습니다.',
    },
  ],
  [
    keyOf('INFP', 'ESTJ'),
    {
      score: 62,
      pros: '체계와 책임감이 이상을 구체적인 계획으로 전환하는 데 도움을 줍니다.',
      cons: '규칙 중심과 유연성 선호가 충돌해 스트레스를 줄 수 있습니다.',
    },
  ],
  [
    keyOf('INTJ', 'ENFP'),
    {
      score: 91,
      pros: '전략적 비전과 열정적인 아이디어가 시너지를 만들어 혁신을 촉진합니다.',
      cons: '계획중심과 즉흥성의 균형을 맞추지 못하면 피로감이 쌓일 수 있습니다.',
    },
  ],
  [
    keyOf('INTP', 'ENFJ'),
    {
      score: 89,
      pros: '아이디어를 사람 중심으로 연결해 실제 영향력 있는 결과를 만들기 쉽습니다.',
      cons: '논리 우선 vs 감정 배려 관점 차이가 의사소통을 어렵게 할 수 있습니다.',
    },
  ],
  [
    keyOf('ENFP', 'ISTJ'),
    {
      score: 74,
      pros: '창의성과 현실감각이 만나 아이디어의 실행력이 높아집니다.',
      cons: '자율성 선호와 규칙/절차 선호의 마찰이 발생할 수 있습니다.',
    },
  ],
  [
    keyOf('ENTP', 'INFJ'),
    {
      score: 92,
      pros: '확장적인 사고와 깊이 있는 통찰이 결합되어 장기적 성장에 유리합니다.',
      cons: '지속적인 논쟁 스타일은 정서적 소진을 유발할 수 있습니다.',
    },
  ],
  [
    keyOf('ESFJ', 'ISTP'),
    {
      score: 70,
      pros: '관계 관리와 실용적 문제 해결이 조화를 이룹니다.',
      cons: '표현 방식의 차이로 감정적 거리감이 생길 수 있습니다.',
    },
  ],
  [
    keyOf('ESTP', 'ISFJ'),
    {
      score: 73,
      pros: '빠른 실행력과 세심한 배려가 팀/관계에 안정적 추진력을 제공합니다.',
      cons: '속도감과 신중함의 차이가 일정/우선순위 갈등을 만들 수 있습니다.',
    },
  ],
  [
    keyOf('ESFP', 'INTJ'),
    {
      score: 60,
      pros: '활기와 전략이 균형을 이루어 즐거우면서도 목표 지향적인 관계가 됩니다.',
      cons: '즉흥성 vs 장기계획의 차이가 반복적인 갈등 요인이 될 수 있습니다.',
    },
  ],
  [
    keyOf('ISTJ', 'ESFP'),
    {
      score: 78,
      pros: '안정성과 활력이 결합해 일상과 모험이 균형을 갖습니다.',
      cons: '계획 준수와 순간의 즐거움 사이에서 합의가 필요합니다.',
    },
  ],
  [
    keyOf('ENFJ', 'INTP'),
    {
      score: 86,
      pros: '비전을 구조화하고 아이디어를 실행으로 연결하는 데 강합니다.',
      cons: '결정 속도와 기준(사람/논리) 차이로 조율 비용이 들 수 있습니다.',
    },
  ],
  [
    keyOf('ISFP', 'ESTJ'),
    {
      score: 72,
      pros: '섬세함과 구조가 결합해 신뢰감 있는 협업 기반을 만듭니다.',
      cons: '개인 공간/감수성과 성과 압박 간의 균형이 과제로 남을 수 있습니다.',
    },
  ],
]);

function categorizePair(from: string, to: string): 'match' | 'clash' | 'average' {
  const k = keyOf(from, to);
  if (SPECIAL_MATCH_PAIRS.has(k)) return 'match';
  if (SPECIAL_CLASH_PAIRS.has(k)) return 'clash';
  // 동일 타입은 안정적 매칭으로 간주
  if (from === to) return 'match';
  // 차이 개수 기반 기본 분류
  const d = diffCount(from, to);
  if (d >= 3) return 'match';
  if (d === 2) return 'average';
  return 'average';
}

function defaultScoreFor(from: string, to: string): number {
  const category = categorizePair(from, to);
  const k = keyOf(from, to);
  if (category === 'match') return hashInRange(k, 70, 88); // 60–90 권장 범위 중 상향 기본값
  if (category === 'clash') return hashInRange(k, 30, 40);
  return hashInRange(k, 45, 58); // 평균 40–60
}

export const mbtiCompatibility: MBTICompatibility[] = (() => {
  const rows: MBTICompatibility[] = [];
  for (const from of MBTI_TYPES) {
    for (const to of MBTI_TYPES) {
      const k = keyOf(from, to);
      const override = OVERRIDES.get(k);
      const score = override?.score ?? defaultScoreFor(from, to);
      const pros = override?.pros ?? DEFAULT_PROS;
      const cons = override?.cons ?? DEFAULT_CONS;
      rows.push({ from, to, score, pros, cons });
    }
  }
  return rows;
})();
