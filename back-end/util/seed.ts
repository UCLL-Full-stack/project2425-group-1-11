import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Delete existing records to avoid unique constraint violations
    await prisma.appointment.deleteMany();
    await prisma.clinic.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.user.deleteMany();

    // Create Users (patient)
    const userPatient1 = await prisma.user.create({
        data: {
            userName: 'furquanmobeen',
            firstName: 'Furquan',
            lastName: 'Mobeen',
            email: 'furquan.mobeen@ucll.be',
            password: 'furquan12',
            role: 'patient',
        },
    });
    const userPatient2 = await prisma.user.create({
        data: {
            userName: 'irinalazar',
            firstName: 'Irina',
            lastName: 'Lazar',
            email: 'irina.lazar@ucll.be',
            password: 'irina8',
            role: 'patient',
        },
    });

    // Create Users (doctor)
    const userDoctor1 = await prisma.user.create({
        data: {
            userName: 'Augustineasimhi',
            firstName: 'Augustine',
            lastName: 'Asimhi',
            email: 'Augustine.asimhi@ucll.be',
            password: 'augustine13',
            role: 'doctor',
        },
    });
    const userDoctor2 = await prisma.user.create({
        data: {
            userName: 'eddyndacasaba',
            firstName: 'Eddy',
            lastName: 'Ndacasaba',
            email: 'eddy.ndacasaba@ucll.be',
            password: 'eddy14',
            role: 'doctor',
        },
    });

    // Create Patients
    const patient1 = await prisma.patient.create({
        data: {
            userId: userPatient1.id,
        },
    });
    const patient2 = await prisma.patient.create({
        data: {
            userId: userPatient2.id,
        },
    });

    // Create Records
    const record1 = await prisma.record.create({
        data: {
            patientId: patient1.id,
            title: 'Record 1',
            description: 'Description record 1',
        },
    });
    const record2 = await prisma.record.create({
        data: {
            patientId: patient2.id,
            title: 'Record 2',
            description: 'Description record 2',
        },
    });

    // Create Clinics
    const clinic1 = await prisma.clinic.create({
        data: {
            address: 'Geldenaaksebaan 335, 3001 Leuven',
            contactNumber: 16375700,
            rating: 7.5,
        },
    });
    const clinic2 = await prisma.clinic.create({
        data: {
            address: 'Kortestraat 7/9, 3000 Leuven',
            contactNumber: 16200752,
            rating: 8.9,
        },
    });

    // Create Doctors
    const doctor1 = await prisma.doctor.create({
        data: {
            userId: userDoctor1.id,
            clinicId: clinic1.id,
            department: 'Freaky',
        },
    });
    const doctor2 = await prisma.doctor.create({
        data: {
            userId: userDoctor2.id,
            clinicId: clinic2.id,
            department: 'Nonchalant',
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
                connect: { id: patient2.id },
            },
            doctor: {
                connect: { id: doctor2.id },
            },
        },
    });
    const appointment3 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-12-15'),
            endDate: new Date('2026-01-15'),
            comment: 'Appointment 3',
            patient: {
                connect: { id: patient1.id },
            },
            doctor: {
                connect: { id: doctor1.id },
            },
        },
    });
    const appointment4 = await prisma.appointment.create({
        data: {
            startDate: new Date('2026-02-27'),
            endDate: new Date('2026-03-27'),
            comment: 'Appointment 4',
            patient: {
                connect: { id: patient2.id },
            },
            doctor: {
                connect: { id: doctor2.id },
            },
        },
    });

    // console.log({ appointment1, appointment2, appointment3, appointment4 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });