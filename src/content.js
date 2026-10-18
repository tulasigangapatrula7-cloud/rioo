/*
 * ============================================================
 *  EVERYTHING PERSONAL LIVES HERE — edit the text freely.
 * ============================================================
 *  Media files live in the /public folder:
 *    public/images/rio-photo.jpg      -> Rio's photo (Mystery reveal)
 *    public/videos/junnie-video.mp4   -> Junnie's video
 *    public/audio/birthday-music.mp3  -> background music
 *  To swap a file, replace it (same name) or change the path below.
 */
const BASE = import.meta.env.BASE_URL;

export const ASSETS = {
  photo: `${BASE}images/rio-photo.jpg`,
  video: `${BASE}videos/junnie-video.mp4`,
  music: `${BASE}audio/birthday-music.mp3`,
};

// ---------- Screen 2 ----------
export const PIN = '2308';
export const PIN_WRONG_MESSAGES = [
  'Oops! Wrong PIN, pagal 😜',
  "Nice try! Even Junnie's ATM is judging you 🏧😂",
  'Think harder, Rio! That is not it 🙈',
  'The ATM says: "Are you really Rio?" 🤨',
];

// ---------- Screen 3 : Open When ----------
export const ENVELOPES = [
  {
    id: 'sad',
    title: "When you're sad",
    messages: [
      "You don't have to be okay all the time, Rio. I'm here for you. 🫂",
      'If the world feels heavy, come to your pagal Junnie. ❤️',
      'Your tears matter to me just as much as your smiles. 🥹',
    ],
  },
  {
    id: 'miss',
    title: 'When you miss me',
    messages: [
      "Missing me is normal, Rio. I'm unforgettable. 💅😂",
      "Distance can't change the place you have in my heart. ❤️",
      'Imagine me beside you, annoying you as usual. 😭💗',
    ],
  },
  {
    id: 'angry',
    title: "When you're angry with me",
    messages: [
      "Okay, be angry, but don't forget that I love you, idiot. 😭❤️",
      "I'm sorry if I hurt you; your feelings matter to me. 🫂",
      "Fight with me, shout at me, but let's never stop caring. 💗",
    ],
  },
  {
    id: 'laugh',
    title: 'When you need to laugh',
    messages: [
      "Congratulations! You've officially chosen the weirdest friend ever. 🤡",
      'Your free entertainment subscription called Junnie never expires. 😂',
      "Smile, idiot! Looking serious doesn't suit your dramatic personality. 😭",
    ],
  },
  {
    id: 'sleep',
    title: "When you can't sleep",
    messages: [
      'Stop overthinking, Rio; tomorrow is another chance. 🌙',
      'Close your eyes and imagine me telling you to SLEEP already! 😤😂',
      'I hope your dreams are as beautiful as the happiness you bring me. ❤️',
    ],
  },
];

// ---------- Screen 4 : Mystery introduction ----------
export const MYSTERY = {
  title: 'WHO IS SHE?',
  lines: [
    "She's a little bit crazy, a little bit dramatic…",
    'Someone who makes ordinary moments feel special.',
    'A girl who became someone’s comfort person, favourite human, and a very important part of her life.',
    "She's unforgettable, irreplaceable, and honestly… one of a kind.",
  ],
  button: 'REVEAL HER IDENTITY ✨',
  nonOtherThan: 'NONE OTHER THAN…',
  reveal: 'RIOOOOOO!! 😭👑💗',
  caption: "THE MAIN CHARACTER. THE ICON. JUNNIE'S GIRL. 🎀❤️",
};

// ---------- Screen 5 : hidden clue ----------
export const CLUE = {
  prompt: 'Something is hidden here… can you find it? 👀',
  found: 'YOU FOUND IT! 💗',
  hint: 'Tiny hint: look for something pink and glowing 💗',
};

// ---------- Screen 6 : award ----------
export const AWARD = {
  title: '🏆 OFFICIAL BESTEST FRIEND AWARD',
  presentedTo: 'Presented to: RIO 💗',
  forBeing: 'For being:',
  reasons: [
    "Junnie's favorite person to annoy.",
    'Partner in unnecessary nonsense.',
    'Someone Junnie can count on.',
    "Most importantly, Junnie's BESTEST FRIEND.",
  ],
  button: 'ACCEPT MY AWARD 🏆',
};

// ---------- Screen 7 : celebration ----------
export const CELEBRATION = {
  title: '🎉 CONGRATULATIONS, RIO! 🎉',
  subtitle: '🏆 Bestest Friend Award — OFFICIALLY ACCEPTED! ❤️',
};

// ---------- Screen 8 : contract ----------
export const CONTRACT = {
  title: 'OFFICIAL FRIENDSHIP AGREEMENT',
  number: 'J&R — FOREVER',
  partyA: 'Party A: Junnie 💗',
  partyB: 'Party B: Rio 💗',
  opening:
    'This agreement is entered into with love, nonsense, and absolutely no option to unsubscribe.',
  articles: [
    {
      no: '01',
      title: 'FRIENDSHIP NEVER EXPIRES',
      body: 'This friendship cannot be cancelled, deleted, or terminated just because life gets busy. Lifetime membership, no renewal fee.',
    },
    {
      no: '02',
      title: 'TOP SECRET',
      body: 'Secrets, embarrassing stories, and private conversations remain confidential. Screenshots classified.',
    },
    {
      no: '03',
      title: 'FIGHTS ARE TEMPORARY',
      body: 'Misunderstandings can happen, and both people may need space. Agree to communicate honestly, apologize when needed, and not treat a small fight as proof that the friendship means nothing.',
    },
    {
      no: '04',
      title: 'LIFETIME ANNOYANCE LICENSE',
      body: 'Teasing, irritating, silly jokes, and random nonsense are included. Complaints may be filed, but the subscription remains active.',
    },
    {
      no: '05',
      title: 'EMOTIONAL SUPPORT UNIT',
      body: 'Listen, care, celebrate wins, and support each other without judgment. Nobody has to pretend to be okay.',
    },
    {
      no: '06',
      title: 'BIRTHDAY OBLIGATION',
      body: 'Remember and celebrate birthdays. Forgetting may lead to dramatic complaints, joking emotional blackmail, and reminders every five minutes.',
    },
    {
      no: '07',
      title: 'EXPIRY DATE',
      body: '“THIS CONTRACT NEVER EXPIRES.”',
      emphasis: true,
    },
  ],
  junnieSignature: 'Junnie',
  signedTitle: 'CONTRACT OFFICIALLY SIGNED! 💌',
  signedSubtitle: 'OUR FRIENDSHIP IS FOREVER! ❤️',
};

// ---------- Screen 9 : Junnie's actual letter ----------
export const LETTER = {
  greeting: '💌 To My Girl, My Rio 🧿❤️',
  paragraphs: [
    'Heyyy Riooo! 🎀❤️',
    'Asalu neeku ee letter raasthunte ekkada start cheyyalo kooda ardham kaavatledhu. Endhukante nuvvu naaku just oka best friend kaadhu… naa life lo chaala important things ki reason ayina person vi. 🥹🫶🏻',
    'Sometimes nenu alochistha, manam iddharam intha close ela ayyam ani. 😂💗 Mana friendship lo oka weird thing entante, ippati varaku manam asalu godavapadaledhu! Like seriously, idhi ela possible, madam? 😂 Konni friendships lo godavalu common antaaru, kaani mana madhya alantivi em lekunda intha comfortable ga undatam naaku chaala special ga anipisthundhi. 🧿❤️ Mana bond ilage eppatiki undali ani manaspoorthiga korukuntunna.',
    'And Rio, oka thing neeku cheppali. Nenu nee maatalu entha vintaano, nee opinions ki entha value isthaano neeku teluso ledho naaku thelidhu. Sometimes nuvvu cheppina oka small thing kooda nenu serious ga theesukunta, endhukante nuvvu naaku important. Nee maatalaki, nee opinions ki naa life lo oka special place undhi. 🫂❤️',
    'Kaani veetanniti kanna important thing entante… naa life lo konni biggest things naaku parichayam chesindhi nuvve. ❤️',
    'Nuvvu naaku introduce chesina konni things, nuvvu naaku chupinchina experiences, nuvvu naaku theliyajesina vishayaalu… ivanni naa life meedha entha impact chesaayo cheppalenu. Maybe neeku avi chinna things la anipinchavachu, kaani naaku maatram avi chaala meaningful. Nuvvu naa life lo oka part ayinandhuku maatrame kaadhu, naa life ni oka certain way lo change chesinandhuku kooda nenu neeku chaala thankful ga untaanu. 💗',
    "I genuinely feel that you're one of the people who changed my life for the better. 🫂✨",
    'Andhuku nenu neeku enni saarlu thank you cheppina thakkuve anipisthundhi. Nuvvu naaku parichayam chesina things ki, naa life lo nuvvu theesukochina changes ki… nenu eppatiki nee meedha runapadi untaanu anipisthundhi. ❤️ Maybe nenu prathisaari cheppakapovachu, kaani naa heart lo aa gratitude eppatiki untundhi.',
    'Andhuke, thank you for being a part of my life, Rio. Thank you for introducing me to things that became so important to me. And most importantly, thank you for being YOU. 🥹💗',
    'Naa life lo chaala mandi ravachu, kottha people parichayam avvachu. Kaani nuvvu naaku ichina place, mana friendship naaku ichina happiness maatram evaritho compare cheyyalenu. Nuvvu naa life lo just oka person kaadhu, naa story lo oka important part vi. 🎀💌',
    'And please, mana friendship ki eppudu dosti tagalakudadhu. 🧿❤️ Manalni chusi evaraina “veellu eppatiki ilage undali” ani anukune antha beautiful ga mana bond undali. Manam enni years ayina ilage maatladukovali, navvukovali, okariki okaram important ga undali. Life ekkadiki theesukellina, mana friendship ki unna value maatram thaggakudadhu.',
    'Nenu future lo em chesthano, ekkadiki velthano naaku thelidhu. Nuvvu kooda nee life lo chaala things achieve chesthav. Kaani aa journey lo mana friendship kooda oka beautiful part ga undalani korukuntunna. Nee happiness ni choodali, nee achievements ni celebrate cheyyali, nee life lo jarige beautiful moments lo nenu kooda undali. ❤️🫶🏻',
    'And madam, nuvvu naa bestie kabatti konchem extra torture, extra love, extra pagalpanam free ga vasthayi. 😂 Refunds levu, cancellation option ledhu. Once you\'re my girl, you\'re stuck with me! 😭🎀',
    'Mana friendship eppatiki ilage undali, Rio. No nazar, no distance, no life changes that make us forget how special this bond is. 🧿🫂❤️',
    'I love you sooo much, my girl. And honestly, nuvvu naa friend maatrame kaadhu… naa family lo oka part vi. Nijanga cheppalante, amma, nanna, akka tarvatha naa life lo antha important place neeke undhi. Naa life lo ye decision theesukunna, ye vishayam jarigina, intlo vaallaki cheppakamundhe neetho share chesukune moments chaala unnayi. Inka cheppalante, konni vishayaalu intlo vaallakanna neeke ekkuva thelusu. 😭❤️',
    'Adhi entha special feeling oo neeku theluso ledho naaku thelidhu. Kaani naa life lo ninnu antha trust chesthunnaanu, antha important ga feel avuthunnaanu ante, nuvvu naaku entha close oo ardham cheskovachu. 🥹🫂',
    "You became a part of my life, but somewhere along the way, you became a part of the person I'm becoming too. 💌✨",
    'Forever grateful for you.',
    'Forever your girl.',
    'Forever your bestie. 🎀❤️🧿',
  ],
  telugu: '',
  closing: '',
  signature: '— Junnie 💗',
};

// ---------- Screen 10 : fake ending ----------
export const FAKE_ENDING = {
  line: "That's all. ❤️ Happy Birthday, Rio.",
  warning: '⚠️ WAIT. DO NOT CLICK THIS BUTTON.',
  button: "DON'T CLICK 🚫",
};

// ---------- Screen 11 : secret interactive reveal ----------
// Keep this customizable: change the texts, or add a photo by placing a file in
// public/images/ and setting image: `${BASE}images/secret.jpg`.
export const SECRET = {
  prompt: 'There is a secret hiding in the glow… tap it ✨',
  tapsNeeded: 5,
  eyebrow: 'SECRET UNLOCKED',
  title: '🔓 One more surprise!',
  message: 'Junnie made something special just for you. Ready to watch it? 🎬',
  image: null, // e.g. `${BASE}images/secret.jpg`
};

// ---------- Screen 12 : video ----------
export const VIDEO = {
  heading: 'A LITTLE SOMETHING FROM JUNNIE 💗',
};

// ---------- Screen 13 : final wish ----------
export const FINAL = {
  title: 'HAPPY BIRTHDAY, RIOOOO! 🎂💗',
  wish: [
    'Thank you for being the person I can tell everything to, and for every bit of nonsense in between.',
    'I hope this year gives you all the happiness you deserve and everything you wish for.',
    "I'm always one call away, ready to annoy you. Love you, idiot. 💗",
  ],
  signature: '— Junnie',
  watchAgain: 'WATCH AGAIN 🔄',
};
