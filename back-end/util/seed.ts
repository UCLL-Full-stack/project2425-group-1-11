import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {

    await prisma.$executeRaw`TRUNCATE TABLE "Appointment" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Clinic" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Patient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Doctor" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Record" RESTART IDENTITY CASCADE`;
    
    // Create Users
    const userPacient1 = await prisma.user.create({
        data: {
            userName: 'furquanmobeen',
            firstName: 'Furquan',
            lastName: 'Mobeen',
            email: 'furquan.mobeen@ucll.be',
            password: await bcrypt.hash('furquan12', 10),
            role: 'patient',
        },
    });
    const userPacient2 = await prisma.user.create({
        data: {
            userName: 'irinalazar',
            firstName: 'Irina',
            lastName: 'Lazar',
            email: 'irina.lazar@ucll.be',
            password: await bcrypt.hash('irina8', 10),
            role: 'patient',
        },
    });
    const userDoctor1 = await prisma.user.create({
        data: {
            userName: 'Augustineasimhi',
            firstName: 'Augustine',
            lastName: 'Asimhi',
            email: 'Augustine.asimhi@ucll.be',
            password: await bcrypt.hash('augustine13', 10),
            role: 'doctor',
        },
    });
    const userDoctor2 = await prisma.user.create({
        data: {
            userName: 'eddyndacasaba',
            firstName: 'Eddy',
            lastName: 'Ndacasaba',
            email: 'eddy.ndacasaba@ucll.be',
            password: await bcrypt.hash('eddy14', 10),
            role: 'doctor',
        },
    });

    // Create Records
    const record1 = await prisma.record.create({
        data: {
            title: 'Title1',
            description: 'Description1',
        },
    });
    const record2 = await prisma.record.create({
        data: {
            title: 'Title2',
            description: 'Description2',
        },
    });

    // Create Patients
    const patient1 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient1.id } },
            records: { connect: {id: record1.id} }
        },
    });
    const patient2 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient2.id } },
            records: { connect: {id: record2.id}}
        },
    });

    // Create Doctors
    const doctor1 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor1.id }},
            department: 'Cardiology',
        },
    });
    const doctor2 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor2.id }},
            department: 'Neurology',
        },
    });

    // Create Clinics
    const clinic1 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: [{ id: doctor1.id }],
            },    
            address: 'Geldenaaksebaan 335, 3001 Leuven',
            contactNumber: 16375700,
            rating: 7.5,
        },
    });
    const clinic2 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: [{ id: doctor2.id }],
            },            
            address: 'Kortestraat 7/9, 3000 Leuven',
            contactNumber: 16200752,
            rating: 8.9,
        },
    });

    // Create Appointments
    const appointment1 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-10-10'),
            endDate: new Date('2025-11-10'),
            comment: 'Appointment 1',
            patient: {
                connect: { id: patient1.id }, 
            },
            doctor: {
                connect: { id: doctor1.id },
            },
        },
    });
    const appointment2 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-09-26'),
            endDate: new Date('2025-10-26'),
            comment: 'Appointment 2',
            patient: {
                connect: { id: patient1.id }, 
            },
            doctor: {
                connect: { id: doctor1.id },
            },
        },
    });
    const appointment3 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-12-15'),
            endDate: new Date('2026-01-15'),
            comment: 'Appointment 3',
            patient: {
                connect: { id: patient2.id }, 
            },
            doctor: {
                connect: { id: doctor2.id },
            },
        },
    });
    const appointment4 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-12-15'),
            endDate: new Date('2026-01-15'),
            comment: 'Appointment 4',
            patient: {
                connect: { id: patient2.id }, 
            },
            doctor: {
                connect: { id: doctor2.id },
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