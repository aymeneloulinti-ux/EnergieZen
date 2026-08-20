ALTER TABLE "Service"
ADD COLUMN "benefits" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "steps" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "faq" JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE "Service"
SET
  "benefits" = ARRAY[
    'Favoriser un état de détente profonde',
    'Relâcher les tensions accumulées',
    'Retrouver un sommeil plus paisible',
    'Prendre un temps pour soi, sans attente de performance'
  ],
  "steps" = ARRAY[
    'Accueil : dix minutes d''échange pour comprendre où vous en êtes aujourd''hui.',
    'Le soin : quarante minutes allongé·e, habillé·e, dans le silence ou avec une musique douce.',
    'Retour au calme : un temps de parole libre, une tisane, et quelques repères pour les jours suivants.'
  ],
  "faq" = '[
    {"q":"Dois-je me déshabiller ?","a":"Non. Le soin se déroule entièrement habillé·e, allongé·e sur une table confortable."},
    {"q":"Est-ce un acte médical ?","a":"Non. Il s''agit d''une pratique de bien-être et de relaxation, qui ne remplace en aucun cas un suivi médical."},
    {"q":"Combien de séances faut-il ?","a":"Une seule séance suffit souvent à faire une pause. Certaines personnes reviennent une fois par mois, à leur rythme."}
  ]'::jsonb
WHERE "slug" = 'soin-energetique';

UPDATE "Service"
SET
  "benefits" = ARRAY[
    'Apaiser une période de surcharge mentale',
    'Accompagner une transition de vie',
    'Retrouver de la clarté et de la disponibilité',
    'Se sentir soutenu·e sur un temps long'
  ],
  "steps" = ARRAY[
    'Écoute : vingt minutes pour poser ce qui pèse et définir une intention simple.',
    'Le soin : soixante minutes de travail énergétique complet, du bassin jusqu''à la nuque.',
    'Intégration : dix minutes pour revenir doucement, avec des pistes concrètes pour la semaine.'
  ],
  "faq" = '[
    {"q":"Quelle différence avec le soin d''une heure ?","a":"Le temps d''écoute est plus long et le travail couvre l''ensemble du corps, sans précipitation."},
    {"q":"Puis-je venir enceinte ?","a":"Oui, la séance est adaptée. Signalez-le simplement lors de la réservation."},
    {"q":"Faut-il prévoir quelque chose ?","a":"Une tenue confortable, et si possible pas de rendez-vous pressant juste après."}
  ]'::jsonb
WHERE "slug" = 'reequilibrage-energetique';

UPDATE "Service"
SET
  "benefits" = ARRAY[
    'Faire redescendre la pression rapidement',
    'Apprendre deux ou trois respirations simples',
    'Découvrir le cabinet en douceur',
    'S''offrir une pause réelle en milieu de semaine'
  ],
  "steps" = ARRAY[
    'Installation : cinq minutes pour vous installer et déposer votre journée.',
    'Relaxation guidée : trente-cinq minutes de respiration guidée et de relâchement progressif.',
    'Départ : cinq minutes pour reprendre pied, à votre rythme.'
  ],
  "faq" = '[
    {"q":"C''est ma première fois, est-ce adapté ?","a":"Oui, c''est la séance que je conseille le plus souvent pour une découverte."},
    {"q":"Puis-je venir sur ma pause déjeuner ?","a":"Bien sûr, des créneaux de 12h à 14h sont ouverts du mardi au vendredi."},
    {"q":"Y a-t-il un vestiaire ?","a":"Oui, un espace calme est prévu pour déposer vos affaires."}
  ]'::jsonb
WHERE "slug" = 'seance-decouverte';

UPDATE "Service"
SET
  "benefits" = ARRAY[
    'Favoriser un état de détente profonde',
    'Relâcher les tensions accumulées',
    'Retrouver un sommeil plus paisible',
    'Prendre un temps pour soi, sans attente de performance'
  ],
  "steps" = ARRAY[
    'Accueil : dix minutes d''échange pour comprendre où vous en êtes aujourd''hui.',
    'Le soin : quarante minutes allongé·e, habillé·e, dans le silence ou avec une musique douce.',
    'Retour au calme : un temps de parole libre, une tisane, et quelques repères pour les jours suivants.'
  ],
  "faq" = '[
    {"q":"Dois-je me déshabiller ?","a":"Non. Le soin se déroule entièrement habillé·e, allongé·e sur une table confortable."},
    {"q":"Est-ce un acte médical ?","a":"Non. Il s''agit d''une pratique de bien-être et de relaxation, qui ne remplace en aucun cas un suivi médical."},
    {"q":"Combien de séances faut-il ?","a":"Une seule séance suffit souvent à faire une pause. Certaines personnes reviennent une fois par mois, à leur rythme."}
  ]'::jsonb
WHERE "slug" = 'massage-energetique';
