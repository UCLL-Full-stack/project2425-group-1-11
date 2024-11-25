// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.appointment.deleteMany();
    await prisma.clinic.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.pacient.deleteMany();
    await prisma.record.deleteMany();
    await prisma.user.deleteMany();

// All the user pacients
    const userPacient1 = await prisma.user.create({
        data: {
            userName: 'furquanmobeen',
            firstName: 'Furquan',
            lastName: 'Mobeen',
            email: 'furquan.mobeen@ucll.be',
            password: 'furquan12',
            role: 'pacient'
        },
    });
    const userPacient2 = await prisma.user.create({
        data: {
            userName: 'irinalazar',
            firstName: 'Irina',
            lastName: 'Lazar',
            email: 'irina.lazar@ucll.be',
            password: 'irina8',
            role: 'pacient'
        },
    });

// All the user doctors
    const userDoctor1 = await prisma.user.create({
        data: {
            userName: 'Augustineasimhi',
            firstName: 'Augustine',
            lastName: 'Asimhi',
            email: 'Augustine.asimhi@ucll.be',
            password: 'augustine13',
            role: 'doctor'
        },
    });
    const userDoctor2 = await prisma.user.create({
        data: {
            userName: 'eddyndacasaba',
            firstName: 'Eddy',
            lastName: 'Ndacasaba',
            email: 'eddy.ndacasaba@ucll.be',
            password: 'eddy14',
            role: 'doctor'
        },
    });

// All the records
    const record1 = await prisma.record.create({
        data: {
            pacient: {},
            title: 'Record ONE',
            description: 'Description 1',
        },
    });
    const record2 = await prisma.record.create({
        data: {
            pacient: {},
            title: 'Record TWO',
            description: 'Description 2',
        },
    });

// All the clinics
    const clinic1 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: []
            },
            address: 'Geldenaaksebaan 335, 3001 Leuven',
            contactNumber: 16375700,
            rating: 7.5
        },
    });
    const clinic2 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: []
            },
            address: 'Kortestraat 7/9, 3000 Leuven',
            contactNumber: 16200752,
            rating: 8.9
        },
    });

// All the appointments
    const appointment1 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-10-10'),
            endDate: new Date('2025-11-10'),
            comment: 'Appointment 1',
            pacient: {},
            doctor: {},
        },
    });
    const appointment2 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-09-26'),
            endDate: new Date('2025-10-26'),
            comment: 'Appointment 2',
            pacient: {},
            doctor: {},
        },
    });
    const appointment3 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-12-15'),
            endDate: new Date('2026-01-15'),
            comment: 'Appointment 3',
            pacient: {},
            doctor: {},
        },
    });
    const appointment4 = await prisma.appointment.create({
        data: {
            startDate: new Date('2026-02-27'),
            endDate: new Date('2026-03-27'),
            comment: 'Appointment 4',
            pacient: {},
            doctor: {},
        },
    });
    
// All the pacients
    const pacient1 = await prisma.pacient.create({
        data: {
            user: { connect: { id: userPacient1.id } },
            records: {
                connect: [{ id: record1.id }]
            },
            appointments: {
                connect: [{ id: appointment1.id }, { id: appointment2.id}]
            },
        },
    });
    const pacient2 = await prisma.pacient.create({
        data: {
            user: { connect: { id: userPacient2.id }},
            records: {
                connect: [{ id: record2.id }]
            },
            appointments: {
                connect: [{ id: appointment3.id }, { id: appointment4.id }]
            },
        },
    });

// All the doctors
    const doctor1 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor1.id }},
            department: 'Freaky',
            clinic: { connect: { id: clinic1.id }},
            appointments: {
                connect: [{ id: appointment1.id }, { id: appointment2.id}]
            },
        },
    });
    const doctor2 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor2.id }},
            department: 'Nonchalant',
            clinic: { connect: { id: clinic2.id }},
            appointments: {
                connect: [{ id: appointment3.id }, { id: appointment4.id }]
            },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
