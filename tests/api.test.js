import test, { before, after } from "node:test";
import assert from "node:assert/strict";

const BASE_URL = "http://localhost:8080/api";

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