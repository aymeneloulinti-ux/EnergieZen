UPDATE "Service"
SET "imageUrl" = '/uploads/services/service-relaxation.jpg'
WHERE "slug" = 'seance-decouverte' AND "imageUrl" IS NULL;

UPDATE "Service"
SET "imageUrl" = '/uploads/services/service-energetique.jpg'
WHERE "slug" IN ('soin-energetique', 'massage-energetique') AND "imageUrl" IS NULL;

UPDATE "Service"
SET "imageUrl" = '/uploads/services/service-reequilibrage.jpg'
WHERE "slug" = 'reequilibrage-energetique' AND "imageUrl" IS NULL;
