import "dotenv/config";
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import prisma from "../src/config/prisma.js";

const BASE_URL = "http://localhost:3000/api";

const credentials = {
    client: {
        email: "test@energiezen.be",
        password: "NouveauMotDePasse123!"
    },

    practitioner: {
        email: "maman@energiezen.be",
        password: "ChangeMoi123!"
    },

    admin: {
        email: "admin@energiezen.be",
        password: "Admin123!"
    }
};

const tokens = {};
const fixtures = {
    service: null,
    practitioner: null
};

const temporaryTestEmailPrefixes = [
    "other-",
    "busy-"
];

after(async () => {
    try {
        const temporaryUsers = await prisma.user.findMany({
            where: {
                OR: temporaryTestEmailPrefixes.map((prefix) => ({
                    email: {
                        startsWith: prefix
                    }
                }))
            },
            select: {
                id: true
            }
        });

        const temporaryUserIds = temporaryUsers.map((user) => user.id);

        if (temporaryUserIds.length > 0) {
            await prisma.appointment.deleteMany({
                where: {
                    clientId: {
                        in: temporaryUserIds
                    }
                }
            });

            await prisma.user.deleteMany({
                where: {
                    id: {
                        in: temporaryUserIds
                    }
                }
            });
        }
    } finally {
        await prisma.$disconnect();
    }
});

let uniqueDateOffset = 12;

const getNextTestDate = async () => {
    for (let offset = uniqueDateOffset; offset <= uniqueDateOffset + 30; offset += 1) {
        const date = getLocalDate(offset);
        const response = await request(
            `/availability/slots?practitionerId=${fixtures.practitioner.id}&serviceId=${fixtures.service.id}&date=${date}`
        );

        if (response.status === 200 && response.data.some((slot) => slot.state === "available")) {
            uniqueDateOffset = offset + 1;
            return date;
        }
    }

    uniqueDateOffset += 1;
    return getLocalDate(uniqueDateOffset);
};


// ============================================================
// HTTP HELPER
// ============================================================

const request = async (
    path,
    {
        method = "GET",
        token,
        body
    } = {}
) => {

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${BASE_URL}${path}`,
        {
            method,
            headers,
            body: body
                ? JSON.stringify(body)
                : undefined
        }
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        // Pas de JSON
    }

    return {
        status: response.status,
        data
    };
};

const getLocalDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);

    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Brussels"
    }).format(date);
};

const findNextAvailableSlot = async () => {
    for (let offset = 10; offset <= 90; offset++) {
        const date = getLocalDate(offset);
        const response = await request(
            `/availability/slots?practitionerId=${fixtures.practitioner.id}&serviceId=${fixtures.service.id}&date=${date}`
        );

        if (response.status === 200 && response.data.some((slot) => slot.state === "available")) {
            return response.data.find((slot) => slot.state === "available");
        }
    }

    return null;
};


// ============================================================
// AUTH
// ============================================================

test("HEALTH - API et base de données disponibles", async () => {

    const response = await request(
        "/health"
    );

    assert.equal(response.status, 200);
    assert.equal(response.data?.status, "ok");
    assert.equal(response.data?.database, "connected");
    assert.equal(typeof response.data?.users, "number");
});

test("AUTH - Login client", async () => {

    const response = await request(
        "/auth/login",
        {
            method: "POST",
            body: credentials.client
        }
    );

    assert.equal(response.status, 200);
    assert.ok(response.data?.token);

    tokens.client = response.data.token;
});


test("AUTH - Login practitioner", async () => {

    const response = await request(
        "/auth/login",
        {
            method: "POST",
            body: credentials.practitioner
        }
    );

    assert.equal(response.status, 200);
    assert.ok(response.data?.token);

    tokens.practitioner = response.data.token;
});


test("AUTH - Login admin", async () => {

    const response = await request(
        "/auth/login",
        {
            method: "POST",
            body: credentials.admin
        }
    );

    assert.equal(response.status, 200);
    assert.ok(response.data?.token);

    tokens.admin = response.data.token;
});


test("AUTH - Identifiants invalides", async () => {

    const response = await request(
        "/auth/login",
        {
            method: "POST",
            body: {
                email: credentials.client.email,
                password: "mot-de-passe-invalide"
            }
        }
    );

    assert.equal(response.status, 401);
});


test("AUTH - En-tête Bearer mal formé", async () => {

    const response = await request(
        "/users/me",
        {
            token: "Basic token-invalide"
        }
    );

    assert.equal(response.status, 401);
});


// ============================================================
// USERS
// ============================================================

test("USERS - Get my profile", async () => {

    const response = await request(
        "/users/me",
        {
            token: tokens.client
        }
    );

    assert.equal(response.status, 200);

    assert.ok(response.data?.id);
    assert.ok(response.data?.email);

    // Sécurité
    assert.equal(
        response.data.password,
        undefined
    );
});


test("USERS - Client ne peut pas accéder aux utilisateurs", async () => {

    const response = await request(
        "/users",
        {
            token: tokens.client
        }
    );

    assert.equal(response.status, 403);
});


test("USERS - Admin peut accéder aux utilisateurs", async () => {

    const response = await request(
        "/users",
        {
            token: tokens.admin
        }
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));

    for (const user of response.data) {
        assert.equal(user.password, undefined);
    }
});


test("USERS - Changement de mot de passe sans données", async () => {

    const response = await request(
        "/users/me/password",
        {
            method: "PATCH",
            token: tokens.client,
            body: {}
        }
    );

    assert.equal(response.status, 400);
});


test("USERS - Nouveau mot de passe trop court", async () => {

    const response = await request(
        "/users/me/password",
        {
            method: "PATCH",
            token: tokens.client,
            body: {
                currentPassword: credentials.client.password,
                newPassword: "court"
            }
        }
    );

    assert.equal(response.status, 400);
});


// ============================================================
// SERVICES
// ============================================================

test("SERVICES - Liste publique", async () => {

    const response = await request(
        "/services"
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));

    assert.ok(response.data.length > 0);
    fixtures.service = response.data[0];
});


test("SERVICES - Recherche par slug", async () => {

    const response = await request(
        `/services/slug/${fixtures.service.slug}`
    );

    assert.equal(response.status, 200);
    assert.equal(response.data?.id, fixtures.service.id);
    assert.equal(response.data?.slug, fixtures.service.slug);
});


test("SERVICES - Service inexistant", async () => {

    const response = await request(
        "/services/00000000-0000-0000-0000-000000000000"
    );

    assert.equal(response.status, 404);
});


test("SERVICES - Client interdit de créer un service", async () => {

    const response = await request(
        "/services",
        {
            method: "POST",
            token: tokens.client,
            body: {
                name: "Service interdit",
                slug: "service-interdit",
                duration: 30,
                price: 20
            }
        }
    );

    assert.equal(response.status, 403);
});


test("SERVICES - Durée invalide refusée", async () => {

    const response = await request(
        "/services",
        {
            method: "POST",
            token: tokens.admin,
            body: {
                name: "Service invalide",
                slug: `service-invalide-${Date.now()}`,
                duration: 0,
                price: 20
            }
        }
    );

    assert.equal(response.status, 400);
});


// ============================================================
// PRACTITIONERS
// ============================================================

test("PRACTITIONERS - Liste publique", async () => {

    const response = await request(
        "/practitioners"
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));

    assert.ok(response.data.length > 0);
    fixtures.practitioner = response.data[0];
});


test("PRACTITIONERS - Aucun password exposé", async () => {

    const response = await request(
        "/practitioners"
    );

    assert.equal(response.status, 200);

    for (const practitioner of response.data) {

        assert.equal(
            practitioner.user?.password,
            undefined
        );
    }
});


// ============================================================
// AVAILABILITY
// ============================================================

test("AVAILABILITY - Paramètres manquants", async () => {

        const response = await request(
            "/availability/slots"
        );

        assert.equal(response.status, 400);
});


test("AVAILABILITY - Créneaux publics", async () => {

        const response = await request(
            `/availability/slots?practitionerId=${fixtures.practitioner.id}&serviceId=${fixtures.service.id}&date=2026-08-20`
        );

        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.data));

        for (const slot of response.data) {
            assert.ok(slot.startAt);
            assert.ok(slot.endAt);
            assert.match(slot.time, /^\d{2}:\d{2}$/);
        }
});


test("AVAILABILITY - Horaires hebdomadaires du praticien", async () => {

        const response = await request(
            "/availability/weekly",
            {
                token: tokens.practitioner
            }
        );

        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.data));
});


test("AVAILABILITY - Le client ne peut pas gérer les horaires", async () => {

        const response = await request(
            "/availability/weekly",
            {
                token: tokens.client
            }
        );

        assert.equal(response.status, 403);
});


test("AVAILABILITY - Exceptions du praticien", async () => {

        const response = await request(
            "/availability/exceptions",
            {
                token: tokens.practitioner
            }
        );

        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.data));
});


    test("AVAILABILITY - Horaires hebdomadaires invalides", async () => {

        const response = await request(
            "/availability/weekly",
            {
                method: "PUT",
                token: tokens.practitioner,
                body: {
                    availabilities: [
                        {
                            dayOfWeek: "MONDAY",
                            startTime: "14:00",
                            endTime: "16:00"
                        },
                        {
                            dayOfWeek: "MONDAY",
                            startTime: "15:00",
                            endTime: "17:00"
                        }
                    ]
                }
            }
        );

        assert.equal(response.status, 400);
    });


    test("AVAILABILITY - Exception sans type refusée", async () => {

        const response = await request(
            "/availability/exceptions",
            {
                method: "POST",
                token: tokens.practitioner,
                body: {
                    date: getLocalDate(60)
                }
            }
        );

        assert.equal(response.status, 400);
    });


test("AVAILABILITY - Date passée → aucun créneau available", async () => {
    const response = await request(
        `/availability/slots?practitionerId=${fixtures.practitioner.id}&serviceId=${fixtures.service.id}&date=2026-08-20`
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));
    
    const availableSlots = response.data.filter((slot) => slot.state === "available");
    assert.equal(availableSlots.length, 0, "Aucun créneau ne doit être available pour une date passée");
});


test("AVAILABILITY - Date future → créneaux disponibles", async () => {
    const futureDate = getLocalDate(7);
    const response = await request(
        `/availability/slots?practitionerId=${fixtures.practitioner.id}&serviceId=${fixtures.service.id}&date=${futureDate}`
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));
    
    const availableSlots = response.data.filter((slot) => slot.state === "available");
    assert.ok(availableSlots.length > 0, "Une date future doit avoir des créneaux available");
});


// ============================================================
// APPOINTMENTS
// ============================================================

test("APPOINTMENTS - Liste des rendez-vous du client", async () => {

        const response = await request(
            "/appointments/my",
            {
                token: tokens.client
            }
        );

        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.data));
});


test("APPOINTMENTS - Liste des rendez-vous du praticien", async () => {

        const response = await request(
            "/appointments/practitioner",
            {
                token: tokens.practitioner
            }
        );

        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.data));
});


test("APPOINTMENTS - Le client ne peut pas accéder à la liste praticien", async () => {

        const response = await request(
            "/appointments/practitioner",
            {
                token: tokens.client
            }
        );

        assert.equal(response.status, 403);
});


test("APPOINTMENTS - Création sans date refusée", async () => {

        const response = await request(
            "/appointments",
            {
                method: "POST",
                token: tokens.client,
                body: {
                    practitionerId: fixtures.practitioner.id,
                    serviceId: fixtures.service.id
                }
            }
        );

        assert.equal(response.status, 400);
});


test("APPOINTMENTS - Création avec date passée → rejetée", async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateISO = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Brussels"
    }).format(pastDate) + "T10:00:00Z";

    const response = await request(
        "/appointments",
        {
            method: "POST",
            token: tokens.client,
            body: {
                practitionerId: fixtures.practitioner.id,
                serviceId: fixtures.service.id,
                startAt: pastDateISO
            }
        }
    );

    assert.equal(response.status, 400, "Création avec date passée doit être rejetée");
});


    test("APPOINTMENTS - Réservation puis annulation par le client", async () => {

        const slot = await findNextAvailableSlot();

        assert.ok(slot, "Aucun créneau disponible pour le test");

        const creation = await request(
            "/appointments",
            {
                method: "POST",
                token: tokens.client,
                body: {
                    practitionerId: fixtures.practitioner.id,
                    serviceId: fixtures.service.id,
                    startAt: slot.startAt
                }
            }
        );

        assert.equal(creation.status, 201);
        assert.equal(creation.data?.status, "PENDING");
        assert.ok(creation.data?.id);

        const appointmentId = creation.data.id;

        const details = await request(
            `/appointments/${appointmentId}`,
            {
                token: tokens.client
            }
        );

        assert.equal(details.status, 200);
        assert.equal(details.data?.id, appointmentId);

        const cancellation = await request(
            `/appointments/${appointmentId}/cancel`,
            {
                method: "PATCH",
                token: tokens.client,
                body: {
                    cancellationReason: "Test d’intégration"
                }
            }
        );

        assert.equal(cancellation.status, 200);
        assert.equal(cancellation.data?.status, "CANCELLED");
    });


test("APPOINTMENTS - Annulation rejetée si rendez-vous déjà annulé", async () => {
    const slot = await findNextAvailableSlot();
    assert.ok(slot, "Aucun créneau disponible pour le test");

    const creation = await request(
        "/appointments",
        {
            method: "POST",
            token: tokens.client,
            body: {
                practitionerId: fixtures.practitioner.id,
                serviceId: fixtures.service.id,
                startAt: slot.startAt
            }
        }
    );

    assert.equal(creation.status, 201);

    const cancelFirst = await request(
        `/appointments/${creation.data.id}/cancel`,
        {
            method: "PATCH",
            token: tokens.client,
            body: { cancellationReason: "Test annulation" }
        }
    );

    assert.equal(cancelFirst.status, 200);

    const cancelAgain = await request(
        `/appointments/${creation.data.id}/cancel`,
        {
            method: "PATCH",
            token: tokens.client,
            body: { cancellationReason: "Test double annulation" }
        }
    );

    assert.equal(cancelAgain.status, 400);
    assert.equal(cancelAgain.data?.error, "Ce rendez-vous ne peut pas être annulé");
});


test("APPOINTMENTS - Client ne peut pas déplacer un rendez-vous d'un autre client", async () => {
    const freshUser = {
        email: `other-${Date.now()}@energiezen.be`,
        password: "NouveauMotDePasse123!",
        firstName: "Autre",
        lastName: "Client",
        phone: "+32470000000"
    };

    const register = await request(
        "/auth/register",
        {
            method: "POST",
            body: freshUser
        }
    );

    assert.equal(register.status, 201);
    const otherToken = register.data.token;

    const slot = await findNextAvailableSlot();
    assert.ok(slot, "Aucun créneau disponible pour le test");

    const creation = await request(
        "/appointments",
        {
            method: "POST",
            token: otherToken,
            body: {
                practitionerId: fixtures.practitioner.id,
                serviceId: fixtures.service.id,
                startAt: slot.startAt
            }
        }
    );

    assert.equal(creation.status, 201);

    const moved = await request(
        `/appointments/${creation.data.id}`,
        {
            method: "PATCH",
            token: tokens.client,
            body: {
                startAt: slot.startAt
            }
        }
    );

    assert.equal(moved.status, 404);
});


test("APPOINTMENTS - Déplacement d'un rendez-vous vers un créneau libre", async () => {
    const slot = await findNextAvailableSlot();
    assert.ok(slot, "Aucun créneau disponible pour le test");

    const creation = await request(
        "/appointments",
        {
            method: "POST",
            token: tokens.client,
            body: {
                practitionerId: fixtures.practitioner.id,
                serviceId: fixtures.service.id,
                startAt: slot.startAt
            }
        }
    );

    assert.equal(creation.status, 201);
    const appointmentId = creation.data.id;

    const nextDate = await getNextTestDate();
    const availability = await request(
        `/availability/slots?practitionerId=${fixtures.practitioner.id}&serviceId=${fixtures.service.id}&date=${nextDate}`
    );

    assert.equal(availability.status, 200);
    const availableSlot = availability.data.find((entry) => entry.state === "available");
    assert.ok(availableSlot, "Aucun créneau disponible pour le déplacement");

    const moved = await request(
        `/appointments/${appointmentId}`,
        {
            method: "PATCH",
            token: tokens.client,
            body: {
                startAt: availableSlot.startAt
            }
        }
    );

    assert.equal(moved.status, 200);
    assert.equal(moved.data?.id, appointmentId);
    assert.equal(moved.data?.startAt, availableSlot.startAt);

    const list = await request(
        "/appointments/my",
        {
            token: tokens.client
        }
    );

    assert.equal(list.status, 200);
    const updated = list.data.find((appointment) => appointment.id === appointmentId);
    assert.ok(updated);
    assert.equal(updated.startAt, availableSlot.startAt);
});


test("APPOINTMENTS - Déplacement vers un créneau déjà réservé est refusé", async () => {
    const slot = await findNextAvailableSlot();
    assert.ok(slot, "Aucun créneau disponible pour le test");

    const creation = await request(
        "/appointments",
        {
            method: "POST",
            token: tokens.client,
            body: {
                practitionerId: fixtures.practitioner.id,
                serviceId: fixtures.service.id,
                startAt: slot.startAt
            }
        }
    );

    assert.equal(creation.status, 201);

    const otherClient = {
        email: `busy-${Date.now()}@energiezen.be`,
        password: "NouveauMotDePasse123!",
        firstName: "Autre",
        lastName: "Rdv",
        phone: "+32470000001"
    };

    const otherRegister = await request(
        "/auth/register",
        {
            method: "POST",
            body: otherClient
        }
    );

    assert.equal(otherRegister.status, 201);

    const otherSlot = await findNextAvailableSlot();
    assert.ok(otherSlot, "Aucun créneau disponible pour le test");

    const taken = await request(
        "/appointments",
        {
            method: "POST",
            token: otherRegister.data.token,
            body: {
                practitionerId: fixtures.practitioner.id,
                serviceId: fixtures.service.id,
                startAt: otherSlot.startAt
            }
        }
    );

    assert.equal(taken.status, 201);

    const moved = await request(
        `/appointments/${creation.data.id}`,
        {
            method: "PATCH",
            token: tokens.client,
            body: {
                startAt: otherSlot.startAt
            }
        }
    );

    assert.equal(moved.status, 409);
});


// ============================================================
// ADMIN
// ============================================================

test("ADMIN - Dashboard accessible", async () => {

    const response = await request(
        "/admin/dashboard",
        {
            token: tokens.admin
        }
    );

    assert.equal(response.status, 200);

    assert.ok(response.data?.users);
    assert.ok(response.data?.services);
    assert.ok(response.data?.appointments);
});


test("ADMIN - Client interdit du dashboard", async () => {

    const response = await request(
        "/admin/dashboard",
        {
            token: tokens.client
        }
    );

    assert.equal(response.status, 403);
});

test("ADMIN - Liste des clients accessible", async () => {

    const response = await request(
        "/admin/clients",
        {
            token: tokens.admin
        }
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));
    assert.ok(response.data.every((user) => user.role === "CLIENT"));
    assert.ok(response.data.every((user) => user.active !== undefined));
});

test("ADMIN - Liste des praticiens accessible", async () => {

    const response = await request(
        "/admin/practitioners",
        {
            token: tokens.admin
        }
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));
    assert.ok(response.data.every((practitioner) => practitioner.user?.role === "PRACTITIONER"));
    assert.ok(response.data.every((practitioner) => Array.isArray(practitioner.services)));
});

test("ADMIN - Client interdit des listes administrateur", async () => {

    const clientsResponse = await request(
        "/admin/clients",
        {
            token: tokens.client
        }
    );

    const practitionersResponse = await request(
        "/admin/practitioners",
        {
            token: tokens.client
        }
    );

    assert.equal(clientsResponse.status, 403);
    assert.equal(practitionersResponse.status, 403);
});

test("ADMIN - Liste globale des rendez-vous accessible", async () => {

    const response = await request(
        "/admin/appointments",
        {
            token: tokens.admin
        }
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));
    assert.ok(response.data.every((appointment) => appointment.client));
    assert.ok(response.data.every((appointment) => appointment.practitioner));
    assert.ok(response.data.every((appointment) => appointment.service));
});

test("ADMIN - Filtre des rendez-vous par statut", async () => {

    const response = await request(
        "/admin/appointments?status=PENDING",
        {
            token: tokens.admin
        }
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.data));
    assert.ok(response.data.every((appointment) => appointment.status === "PENDING"));
});

test("ADMIN - Client interdit de la liste globale des rendez-vous", async () => {

    const response = await request(
        "/admin/appointments",
        {
            token: tokens.client
        }
    );

    assert.equal(response.status, 403);
});


// ============================================================
// AUTHENTICATION
// ============================================================

test("AUTH - Route protégée sans token", async () => {

    const response = await request(
        "/users/me"
    );

    assert.equal(response.status, 401);
});


test("AUTH - Token invalide", async () => {

    const response = await request(
        "/users/me",
        {
            token: "token-invalide"
        }
    );

    assert.equal(response.status, 401);
});