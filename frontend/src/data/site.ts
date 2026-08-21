import heroImg from "@/assets/hero-practitioner.jpg";

export const images = { heroImg };

export type StudioSettings = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
};

export const studio: StudioSettings = {
  name: "Maison Lumen",
  tagline: "Cabinet de soins énergétiques",
  address: "Rue du Page 42, 1050 Ixelles, Bruxelles",
  phone: "+32 478 21 44 09",
  email: "bonjour@maisonlumen.be",
};

const studioStorageKey = "energiezen-studio-settings";

export const getStudioSettings = (): StudioSettings => {
  if (typeof window === "undefined") return studio;

  try {
    const stored = window.localStorage.getItem(studioStorageKey);
    return stored ? { ...studio, ...JSON.parse(stored) } : studio;
  } catch {
    return studio;
  }
};

export const saveStudioSettings = (settings: StudioSettings) => {
  window.localStorage.setItem(studioStorageKey, JSON.stringify(settings));
  window.dispatchEvent(new Event("studio-settings-changed"));
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  duration: number;
  price: number;
  image?: string;
  description: string;
  benefits: string[];
  expect: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "soin-energetique",
    name: "Soin énergétique",
    short:
      "Un temps de reprise de contact avec soi, par apposition des mains et respiration guidée.",
    duration: 60,
    price: 75,
    description:
      "Le soin énergétique est un moment de détente profonde. Allongé·e, habillé·e, vous êtes accompagné·e par un travail doux d'apposition des mains et une respiration guidée. Rien n'est forcé : le soin suit votre rythme, dans un cadre calme et bienveillant.",
    benefits: [
      "Favoriser un état de détente profonde",
      "Relâcher les tensions accumulées",
      "Retrouver un sommeil plus paisible",
      "Prendre un temps pour soi, sans attente de performance",
    ],
    expect: [
      {
        title: "Accueil",
        text: "Dix minutes d'échange pour comprendre où vous en êtes aujourd'hui.",
      },
      {
        title: "Le soin",
        text: "Quarante minutes allongé·e, habillé·e, dans le silence ou avec une musique douce.",
      },
      {
        title: "Retour au calme",
        text: "Un temps de parole libre, une tisane, et quelques repères pour les jours suivants.",
      },
    ],
    faq: [
      {
        q: "Dois-je me déshabiller ?",
        a: "Non. Le soin se déroule entièrement habillé·e, allongé·e sur une table confortable.",
      },
      {
        q: "Est-ce un acte médical ?",
        a: "Non. Il s'agit d'une pratique de bien-être et de relaxation, qui ne remplace en aucun cas un suivi médical.",
      },
      {
        q: "Combien de séances faut-il ?",
        a: "Une seule séance suffit souvent à faire une pause. Certaines personnes reviennent une fois par mois, à leur rythme.",
      },
    ],
  },
  {
    slug: "reequilibrage-energetique",
    name: "Rééquilibrage énergétique",
    short:
      "Une séance plus longue pour les périodes de fatigue, de transition ou de surcharge mentale.",
    duration: 90,
    price: 110,
    description:
      "Pensée pour les périodes chargées, cette séance longue associe un temps d'écoute approfondi, un travail énergétique complet et des respirations pour reposer le mental. Idéale lors d'un changement de vie, d'une fatigue persistante ou d'une charge mentale importante.",
    benefits: [
      "Apaiser une période de surcharge mentale",
      "Accompagner une transition de vie",
      "Retrouver de la clarté et de la disponibilité",
      "Se sentir soutenu·e sur un temps long",
    ],
    expect: [
      {
        title: "Écoute",
        text: "Vingt minutes pour poser ce qui pèse et définir une intention simple.",
      },
      {
        title: "Le soin",
        text: "Soixante minutes de travail énergétique complet, du bassin jusqu'à la nuque.",
      },
      {
        title: "Intégration",
        text: "Dix minutes pour revenir doucement, avec des pistes concrètes pour la semaine.",
      },
    ],
    faq: [
      {
        q: "Quelle différence avec le soin d'une heure ?",
        a: "Le temps d'écoute est plus long et le travail couvre l'ensemble du corps, sans précipitation.",
      },
      {
        q: "Puis-je venir enceinte ?",
        a: "Oui, la séance est adaptée. Signalez-le simplement lors de la réservation.",
      },
      {
        q: "Faut-il prévoir quelque chose ?",
        a: "Une tenue confortable, et si possible pas de rendez-vous pressant juste après.",
      },
    ],
  },
  {
    slug: "seance-de-relaxation",
    name: "Séance de relaxation",
    short: "Une parenthèse courte, parfaite entre deux journées denses ou en première visite.",
    duration: 45,
    price: 55,
    description:
      "Une séance courte et accessible, centrée sur la respiration et le relâchement musculaire. C'est souvent la première porte d'entrée pour découvrir le cabinet, sans engagement ni préparation particulière.",
    benefits: [
      "Faire redescendre la pression rapidement",
      "Apprendre deux ou trois respirations simples",
      "Découvrir le cabinet en douceur",
      "S'offrir une pause réelle en milieu de semaine",
    ],
    expect: [
      { title: "Installation", text: "Cinq minutes pour vous installer et déposer votre journée." },
      {
        title: "Relaxation guidée",
        text: "Trente-cinq minutes de respiration guidée et de relâchement progressif.",
      },
      { title: "Départ", text: "Cinq minutes pour reprendre pied, à votre rythme." },
    ],
    faq: [
      {
        q: "C'est ma première fois, est-ce adapté ?",
        a: "Oui, c'est la séance que je conseille le plus souvent pour une découverte.",
      },
      {
        q: "Puis-je venir sur ma pause déjeuner ?",
        a: "Bien sûr, des créneaux de 12h à 14h sont ouverts du mardi au vendredi.",
      },
      {
        q: "Y a-t-il un vestiaire ?",
        a: "Oui, un espace calme est prévu pour déposer vos affaires.",
      },
    ],
  },
  {
    slug: "accompagnement-personnalise",
    name: "Accompagnement personnalisé",
    short: "Un cycle de quatre séances construit avec vous, sur plusieurs semaines.",
    duration: 60,
    price: 260,
    description:
      "Un cycle de quatre séances réparties sur deux à trois mois, avec un fil conducteur défini ensemble lors du premier rendez-vous. Entre les séances, vous recevez quelques repères simples à intégrer dans votre quotidien.",
    benefits: [
      "Installer un rythme régulier de prise de soin",
      "Suivre une progression sur plusieurs semaines",
      "Bénéficier d'un tarif préférentiel",
      "Être accompagné·e entre les séances",
    ],
    expect: [
      {
        title: "Séance 1",
        text: "Bilan de départ et définition d'un cap simple, sans objectif de performance.",
      },
      { title: "Séances 2 et 3", text: "Travail de fond, espacé de trois à quatre semaines." },
      { title: "Séance 4", text: "Bilan, ajustements et autonomie pour la suite." },
    ],
    faq: [
      {
        q: "Le cycle est-il à payer en une fois ?",
        a: "Vous pouvez régler l'ensemble à la réservation ou séance par séance, comme cela vous convient.",
      },
      {
        q: "Puis-je décaler une séance ?",
        a: "Oui, jusqu'à 24 h avant, directement depuis votre espace client.",
      },
      {
        q: "Les séances sont-elles toujours identiques ?",
        a: "Non, chaque séance s'adapte à ce que vous traversez au moment du rendez-vous.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export type Practitioner = {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
};

export const practitioners: Practitioner[] = [
  {
    id: "camille",
    name: "Camille Vasseur",
    role: "Fondatrice · Praticienne en soins énergétiques",
    initials: "CV",
    bio: "Douze ans de pratique, une approche calme et très concrète.",
  },
  {
    id: "noor",
    name: "Noor Benali",
    role: "Praticienne en relaxation",
    initials: "NB",
    bio: "Spécialisée dans les séances courtes et la respiration guidée.",
  },
];

export const testimonials = [
  {
    name: "Élise D.",
    city: "Ixelles",
    text: "Je suis arrivée épuisée par une période de travail intense. Camille ne promet rien, elle accueille. Je suis repartie avec la sensation d'avoir enfin posé mes valises.",
  },
  {
    name: "Thomas L.",
    city: "Uccle",
    text: "J'étais sceptique. Ce qui m'a convaincu, c'est la simplicité : un lieu calme, une écoute réelle, aucune mise en scène. J'y retourne une fois par mois.",
  },
  {
    name: "Farida M.",
    city: "Saint-Gilles",
    text: "La séance de 90 minutes m'a accompagnée pendant un déménagement compliqué. J'ai retrouvé un sommeil correct au bout de deux rendez-vous.",
  },
];

export const steps = [
  {
    n: "01",
    title: "On échange",
    text: "À votre arrivée, dix minutes de discussion pour comprendre ce qui vous amène, sans questionnaire interminable.",
  },
  {
    n: "02",
    title: "Le soin",
    text: "Allongé·e et habillé·e, vous vous laissez porter. Lumière douce, musique discrète, aucune obligation de parler.",
  },
  {
    n: "03",
    title: "Le retour",
    text: "Une tisane, quelques mots, et deux ou trois repères simples à emporter avec vous pour les jours suivants.",
  },
];

export type Appointment = {
  id: string;
  client: string;
  email: string;
  phone: string;
  serviceSlug: string;
  practitionerId: string;
  date: string;
  time: string;
  status: "confirmé" | "en attente" | "terminé" | "annulé";
  payment: "payé" | "à régler" | "remboursé";
};

export const appointments: Appointment[] = [
  {
    id: "MLN-4821",
    client: "Élise Dumont",
    email: "elise.dumont@gmail.com",
    phone: "+32 471 22 18 04",
    serviceSlug: "soin-energetique",
    practitionerId: "camille",
    date: "2026-08-12",
    time: "09:30",
    status: "confirmé",
    payment: "payé",
  },
  {
    id: "MLN-4822",
    client: "Thomas Leroy",
    email: "t.leroy@outlook.be",
    phone: "+32 486 55 12 77",
    serviceSlug: "seance-de-relaxation",
    practitionerId: "noor",
    date: "2026-08-12",
    time: "11:00",
    status: "confirmé",
    payment: "payé",
  },
  {
    id: "MLN-4823",
    client: "Farida Mansouri",
    email: "farida.m@proton.me",
    phone: "+32 495 78 30 21",
    serviceSlug: "reequilibrage-energetique",
    practitionerId: "camille",
    date: "2026-08-12",
    time: "14:00",
    status: "en attente",
    payment: "à régler",
  },
  {
    id: "MLN-4824",
    client: "Julien Pirard",
    email: "julien.pirard@gmail.com",
    phone: "+32 472 09 41 66",
    serviceSlug: "soin-energetique",
    practitionerId: "camille",
    date: "2026-08-12",
    time: "16:30",
    status: "confirmé",
    payment: "payé",
  },
  {
    id: "MLN-4825",
    client: "Sophie Delvaux",
    email: "sophie.delvaux@skynet.be",
    phone: "+32 470 33 90 12",
    serviceSlug: "accompagnement-personnalise",
    practitionerId: "camille",
    date: "2026-08-13",
    time: "10:00",
    status: "confirmé",
    payment: "payé",
  },
  {
    id: "MLN-4826",
    client: "Marc Hendrickx",
    email: "m.hendrickx@gmail.com",
    phone: "+32 477 61 25 88",
    serviceSlug: "seance-de-relaxation",
    practitionerId: "noor",
    date: "2026-08-13",
    time: "12:30",
    status: "confirmé",
    payment: "à régler",
  },
  {
    id: "MLN-4827",
    client: "Anaïs Colin",
    email: "anais.colin@gmail.com",
    phone: "+32 493 14 07 52",
    serviceSlug: "reequilibrage-energetique",
    practitionerId: "camille",
    date: "2026-08-14",
    time: "09:00",
    status: "confirmé",
    payment: "payé",
  },
  {
    id: "MLN-4810",
    client: "Élise Dumont",
    email: "elise.dumont@gmail.com",
    phone: "+32 471 22 18 04",
    serviceSlug: "seance-de-relaxation",
    practitionerId: "noor",
    date: "2026-07-15",
    time: "13:00",
    status: "terminé",
    payment: "payé",
  },
  {
    id: "MLN-4794",
    client: "Élise Dumont",
    email: "elise.dumont@gmail.com",
    phone: "+32 471 22 18 04",
    serviceSlug: "soin-energetique",
    practitionerId: "camille",
    date: "2026-06-18",
    time: "18:00",
    status: "terminé",
    payment: "payé",
  },
  {
    id: "MLN-4771",
    client: "Élise Dumont",
    email: "elise.dumont@gmail.com",
    phone: "+32 471 22 18 04",
    serviceSlug: "soin-energetique",
    practitionerId: "camille",
    date: "2026-05-20",
    time: "17:30",
    status: "terminé",
    payment: "payé",
  },
];

export const clients = [
  {
    name: "Élise Dumont",
    email: "elise.dumont@gmail.com",
    phone: "+32 471 22 18 04",
    visits: 9,
    last: "18 juin 2026",
    spent: 620,
  },
  {
    name: "Thomas Leroy",
    email: "t.leroy@outlook.be",
    phone: "+32 486 55 12 77",
    visits: 5,
    last: "30 juillet 2026",
    spent: 285,
  },
  {
    name: "Farida Mansouri",
    email: "farida.m@proton.me",
    phone: "+32 495 78 30 21",
    visits: 3,
    last: "22 juillet 2026",
    spent: 240,
  },
  {
    name: "Julien Pirard",
    email: "julien.pirard@gmail.com",
    phone: "+32 472 09 41 66",
    visits: 2,
    last: "2 août 2026",
    spent: 150,
  },
  {
    name: "Sophie Delvaux",
    email: "sophie.delvaux@skynet.be",
    phone: "+32 470 33 90 12",
    visits: 12,
    last: "5 août 2026",
    spent: 980,
  },
  {
    name: "Marc Hendrickx",
    email: "m.hendrickx@gmail.com",
    phone: "+32 477 61 25 88",
    visits: 1,
    last: "—",
    spent: 0,
  },
];

export const timeSlots = [
  { time: "09:00", state: "available" },
  { time: "09:30", state: "unavailable" },
  { time: "10:00", state: "available" },
  { time: "10:30", state: "available" },
  { time: "11:00", state: "booked" },
  { time: "11:30", state: "available" },
  { time: "12:00", state: "unavailable" },
  { time: "14:00", state: "available" },
  { time: "14:30", state: "booked" },
  { time: "15:00", state: "available" },
  { time: "15:30", state: "available" },
  { time: "16:00", state: "available" },
  { time: "16:30", state: "booked" },
  { time: "17:00", state: "available" },
  { time: "17:30", state: "available" },
  { time: "18:00", state: "unavailable" },
] as const;

export const formatPrice = (n: number) => `${n} €`;
export const formatDateFr = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
