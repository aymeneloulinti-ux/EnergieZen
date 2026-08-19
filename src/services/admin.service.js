import prisma from "../config/prisma.js";

export const getDashboardStats = async () => {

    const [
        totalUsers,
        clients,
        practitioners,
        admins,

        totalServices,
        activeServices,

        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        noShowAppointments
    ] = await Promise.all([

        // --------------------
        // Users
        // --------------------

        prisma.user.count(),

        prisma.user.count({
            where: {
                role: "CLIENT"
            }
        }),

        prisma.user.count({
            where: {
                role: "PRACTITIONER"
            }
        }),

        prisma.user.count({
            where: {
                role: "ADMIN"
            }
        }),


        // --------------------
        // Services
        // --------------------

        prisma.service.count(),

        prisma.service.count({
            where: {
                active: true
            }
        }),


        // --------------------
        // Appointments
        // --------------------

        prisma.appointment.count(),

        prisma.appointment.count({
            where: {
                status: "PENDING"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "CONFIRMED"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "COMPLETED"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "CANCELLED"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "NO_SHOW"
            }
        })
    ]);


    return {

        users: {
            total: totalUsers,
            clients,
            practitioners,
            admins
        },

        services: {
            total: totalServices,
            active: activeServices
        },

        appointments: {
            total: totalAppointments,
            pending: pendingAppointments,
            confirmed: confirmedAppointments,
            completed: completedAppointments,
            cancelled: cancelledAppointments,
            noShow: noShowAppointments
        }
    };
};