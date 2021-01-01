export const generateCorrelationId = () => {
  let correlationId = []

  let randomStrings =
    humanReadableWordList1[Math.floor(Math.random() * humanReadableWordList1.length)] +
    '-' +
    humanReadableWordList2[Math.floor(Math.random() * humanReadableWordList2.length)]
  correlationId.push(randomStrings)

  let randomNumber = (Math.random() * 10000).toString().substr(0, 4)
  correlationId.push(randomNumber)

  let secondRandomNumber = (Math.random() * 1000000).toString().substr(0, 6)
  correlationId.push(secondRandomNumber)

  return correlationId.join('-')
}

const humanReadableWordList1 = [
  'admiring',
  'adoring',
  'affectionate',
  'agitated',
  'amazing',
  'angry',
  'blissful',
  'boring',
  'clever',
  'cocky',
  'compassionate',
  'competent',
  'condescending',
  'confident',
  'cranky',
  'dazzling',
  'determined',
  'distracted',
  'dreamy',
  'eager',
  'ecstatic',
  'elastic',
  'elated',
  'elegant',
  'eloquent',
  'epic',
  'fervent',
  'festive',
  'flamboyant',
  'focused',
  'friendly',
  'frosty',
  'gallant',
  'gifted',
  'goofy',
  'gracious',
  'happy',
  'heuristic',
  'hungry',
  'infallible',
  'inspiring',
  'jovial',
  'keen',
  'kind',
  'laughing',
  'loving',
  'lucid',
  'modest',
  'musing',
  'mystifying',
  'naughty',
  'nervous',
  'nostalgic',
  'objective',
  'optimistic',
  'peaceful',
  'pedantic',
  'pensive',
  'practical',
  'quirky',
  'quizzical',
  'relaxed',
  'reverent',
  'romantic',
  'sad',
  'serene',
  'sharp',
  'silly',
  'sleepy',
  'stoic',
  'stupefied',
  'suspicious',
  'trusting',
  'unruffled',
  'upbeat',
  'vibrant',
  'vigilant',
  'wizardly',
  'wonderful',
  'xenodochial',
  'zen',
]

const humanReadableWordList2 = [
  'agnesi',
  'allen',
  'almeida',
  'archimedes',
  'aryabhata',
  'austin',
  'banach',
  'bardeen',
  'bartik',
  'bassi',
  'benz',
  'bhabha',
  'bhaskara',
  'blackwell',
  'borg',
  'boyd',
  'brattain',
  'brown',
  'carson',
  'chandrasekhar',
  'chaplygin',
  'chatterjee',
  'chebyshev',
  'clarke',
  'colden',
  'cray',
  'curie',
  'darwin',
  'davinci',
  'dijkstra',
  'dubinsky',
  'easley',
  'edison',
  'engelbart',
  'euclid',
  'euler',
  'fermat',
  'fermi',
  'feynman',
  'franklin',
  'galileo',
  'gates',
  'gates',
  'goldstine',
  'goldwasser',
  'golick',
  'goodall',
  'haibt',
  'hermann',
  'heyrovsky',
  'hodgkin',
  'hoover',
  'hugle',
  'hypatia',
  'jackson',
  'jang',
  'jepsen',
  'johnson',
  'joliot',
  'jones',
  'kalam',
  'kapitsa',
  'kare',
  'keldysh',
  'keller',
  'kepler',
  'kilby',
  'knuth',
  'kowalevski',
  'laland',
  'lamarr',
  'lamport',
  'lichterman',
  'liskov',
  'lumiere',
  'mccarthy',
  'mcclintock',
  'mclean',
  'mendeleev',
  'mestorf',
  'minsky',
  'mirzakhani',
  'morse',
  'murdock',
  'neumann',
  'newton',
  'nobel',
  'northcutt',
  'noyce',
  'panini',
  'pare',
  'pasteur',
  'payne',
  'perlman',
  'pike',
  'poincare',
  'poitras',
  'ptolemy',
  'raman',
  'ramanujan',
  'ride',
  'ritchie',
  'roentgen',
  'shannon',
  'shockley',
  'shtern',
  'snyder',
  'spence',
  'stallman',
  'stonebraker',
  'swartz',
  'swirles',
  'tesla',
  'thompson',
  'turing',
  'varahamihira',
  'vaughan',
  'villani',
  'visvesvaraya',
  'volhard',
  'wiles',
  'williams',
  'wright',
  'yalow',
  'yonath',
  'zhukovsky',
]
