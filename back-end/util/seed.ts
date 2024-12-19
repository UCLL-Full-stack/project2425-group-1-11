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
    const userPacient3 = await prisma.user.create({
        data: {
            userName: 'HamzahTheFantastic',
            firstName: 'Hamzah',
            lastName: 'The Fantastic',
            email: 'hamzah.thefantastic@ucll.be',
            password: await bcrypt.hash('hamzah22', 10),
            role: 'patient',
        },
    });
    const userPacient4 = await prisma.user.create({
        data: {
            userName: 'ThatMartinKid',
            firstName: 'Martin',
            lastName: 'That Kid',
            email: 'martin.thatkid@ucll.be',
            password: await bcrypt.hash('martin25', 10),
            role: 'patient',
        },
    });
    const userPacient5 = await prisma.user.create({
        data: {
            userName: 'jasmineandrose',
            firstName: 'Jasmine',
            lastName: 'Rose',
            email: 'jasmine.rose@ucll.be',
            password: await bcrypt.hash('eddyandcj2', 10),
            role: 'patient',
        },
    });
    const userPacient6 = await prisma.user.create({
        data: {
            userName: 'dwaynejohnson',
            firstName: 'Dwayne',
            lastName: 'Johnson',
            email: 'dwayne.johnson@ucll.be',
            password: await bcrypt.hash('dwayne52', 10),
            role: 'patient',
        },
    });
    const userPacient7 = await prisma.user.create({
        data: {
            userName: 'tupacshakur',
            firstName: 'Tupac',
            lastName: 'Shakur',
            email: 'tupac.shakur@ucll.be',
            password: await bcrypt.hash('tupac2', 10),
            role: 'patient',
        },
    });
    const userPacient8 = await prisma.user.create({
        data: {
            userName: 'huaktuah',
            firstName: 'Haliey',
            lastName: 'Welch',
            email: 'haliey.welch@ucll.be',
            password: await bcrypt.hash('haliey22', 10),
            role: 'patient',
        },
    });
    const userPacient9 = await prisma.user.create({
        data: {
            userName: 'glamourblondeglamour',
            firstName: 'Artem',
            lastName: 'Shilovets',
            email: 'irina.lazar@ucll.be',
            password: await bcrypt.hash('artem21', 10),
            role: 'patient',
        },
    });
    const userPacient10 = await prisma.user.create({
        data: {
            userName: 'jidonarmaniadams',
            firstName: 'Jidon',
            lastName: 'Armani Adams',
            email: 'jidon.armaniadams@ucll.be',
            password: await bcrypt.hash('jidon10', 10),
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
    const userDoctor3 = await prisma.user.create({
        data: {
            userName: 'yonghoonkim',
            firstName: 'Yong-Hoon',
            lastName: 'Kim',
            email: 'yonghoon.kim@ucll.be',
            password: await bcrypt.hash('kim10', 10),
            role: 'doctor',
        },
    });
    const userDoctor4 = await prisma.user.create({
        data: {
            userName: 'philmcgraw',
            firstName: 'Phil',
            lastName: 'McGraw',
            email: 'phil.mcgraw@ucll.be',
            password: await bcrypt.hash('phil50', 10),
            role: 'doctor',
        },
    });
    const userDoctor5 = await prisma.user.create({
        data: {
            userName: 'gordonramsay',
            firstName: 'Gordon',
            lastName: 'Ramsay',
            email: 'gordon.ramsay@ucll.be',
            password: await bcrypt.hash('gordon66', 10),
            role: 'doctor',
        },
    });
    const userDoctor6 = await prisma.user.create({
        data: {
            userName: 'diddy',
            firstName: 'Sean',
            lastName: 'John Combs',
            email: 'sean.johncombs@ucll.be',
            password: await bcrypt.hash('sean1000', 10),
            role: 'doctor',
        },
    });
    const userDoctor7 = await prisma.user.create({
        data: {
            userName: 'caseoh',
            firstName: 'Case',
            lastName: 'Dylan Baker',
            email: 'case.dylanbaker@ucll.be',
            password: await bcrypt.hash('case9999kg', 10),
            role: 'doctor',
        },
    });
    const userDoctor8 = await prisma.user.create({
        data: {
            userName: 'oiiaiiooiiai',
            firstName: 'Cat',
            lastName: 'Dance',
            email: 'cat.dance@ucll.be',
            password: await bcrypt.hash('cat10', 10),
            role: 'doctor',
        },
    });
    const userDoctor9 = await prisma.user.create({
        data: {
            userName: 'onepiece',
            firstName: 'Luffy',
            lastName: 'Monkey D.',
            email: 'luffy.monkeyd@ucll.be',
            password: await bcrypt.hash('luffy1', 10),
            role: 'doctor',
        },
    });
    const userDoctor10 = await prisma.user.create({
        data: {
            userName: 'miffyandmelanie',
            firstName: 'Miffy',
            lastName: 'Melanie',
            email: 'miffy.melanie@ucll.be',
            password: await bcrypt.hash('mam2', 10),
            role: 'doctor',
        },
    });
    const userAdmin1 = await prisma.user.create({
        data: {
            userName: 'naphatpruekveeraparb',
            firstName: 'Naphat',
            lastName: 'Pruekveeraparb',
            email: 'naphat.pruekveeraparb@ucll.be',
            password: await bcrypt.hash('naphat420', 10),
            role: 'admin',
        },
    });
    const userAdmin2 = await prisma.user.create({
        data: {
            userName: 'bramvanimpe',
            firstName: 'Bram',
            lastName: 'Van Impe',
            email: 'bram.vanimpe@ucll.be',
            password: await bcrypt.hash('bram15', 10),
            role: 'admin',
        },
    });
    
// Create Records
    const record1 = await prisma.record.create({
        data: {
            title: 'Hypertension, mild asthma',
            description: 'Blood pressure slightly elevated. Recommended dietary adjustments and scheduled a follow-up in 3 months.',
        },
    });
    const record2 = await prisma.record.create({
        data: {
            title: 'History of migraines since adolescence',
            description: 'Ordered MRI for further investigation; advised tracking triggers and increasing hydration.'
        },
    });
    const record3 = await prisma.record.create({
        data: {
            title: 'Routine Annual Check-up',
            description: '35-year-old male, no complaints. Mild allergies. Exam normal, labs ordered.'
        },
    });
    const record4 = await prisma.record.create({
        data: {
            title: 'Diabetes Management Follow-Up',
            description: '52-year-old female with type 2 diabetes. Blood sugar stable, insulin adjusted.'
        },
    });
    const record5 = await prisma.record.create({
        data: {
            title: 'History of migraines since adolescence.',
            description: 'Ordered MRI for further investigation; advised tracking triggers and increasing hydration.'
        },
    });
    const record6 = await prisma.record.create({
        data: {
            title: 'Pediatric Asthma Evaluation',
            description: '10-year-old with asthma. Wheezing worsened by pollen. Prescribed inhaler.'
        },
    });
    const record7 = await prisma.record.create({
        data: {
            title: 'Post-Surgical Recovery Monitoring',
            description: '68-year-old recovering from knee surgery. Mild pain, mobility improving.'
        },
    });
    const record8 = await prisma.record.create({
        data: {
            title: 'Hypertension Initial Diagnosis',
            description: '45-year-old female, BP 160/100. Diagnosed hypertension, meds started.'
        },
    });
    const record9 = await prisma.record.create({
        data: {
            title: 'Emergency Room Visit - Chest Pain',
            description: '60-year-old male with chest pain. Diagnosed unstable angina, admitted.'
        },
    });
    const record10 = await prisma.record.create({
        data: {
            title: 'Prenatal Visit - First Trimester',
            description: '29-year-old, 10 weeks pregnant. Healthy pregnancy, follow-up scheduled.'
        },
    });
    const record11 = await prisma.record.create({
        data: {
            title: 'Sports Injury - Ankle Sprain',
            description: '17-year-old male with ankle sprain. X-ray ordered, RICE advised.'
        },
    });
    const record12 = await prisma.record.create({
        data: {
            title: 'Depression and Anxiety Assessment',
            description: '34-year-old female with low mood and panic. SSRI started, referred to therapy.'
        },
    });
    const record13 = await prisma.record.create({
        data: {
            title: 'Allergic Reaction to Antibiotics',
            description: '40-year-old male, hives after amoxicillin. Allergy noted, antihistamines given.'
        },
    });
    const record14 = await prisma.record.create({
        data: {
            title: 'Upper Respiratory Infection (URI)',
            description: '25-year-old male with cough and congestion. Viral URI, supportive care advised.'
        },
    });
    const record15 = await prisma.record.create({
        data: {
            title: 'Chronic Back Pain',
            description: '50-year-old female with lower back pain for months. Physical therapy recommended.'
        },
    });
    const record16 = await prisma.record.create({
        data: {
            title: 'Pediatric Ear Infection',
            description: '4-year-old with fever and ear pain. Diagnosed with otitis media, antibiotics prescribed.'
        },
    });
    const record17 = await prisma.record.create({
        data: {
            title: 'Skin Rash Evaluation',
            description: '32-year-old male with red, itchy rash on arms. Contact dermatitis diagnosed.'
        },
    });
    const record18 = await prisma.record.create({
        data: {
            title: 'Migraine Headache',
            description: '28-year-old female with severe headaches. Migraine diagnosed, triptan prescribed.'
        },
    });
    const record19 = await prisma.record.create({
        data: {
            title: 'Pre-Operative Assessment',
            description: '62-year-old male cleared for hip replacement surgery. Labs and EKG normal.'
        },
    });
    const record20 = await prisma.record.create({
        data: {
            title: 'Urinary Tract Infection (UTI)',
            description: '45-year-old female with dysuria. UTI confirmed, antibiotics started.'
        },
    });

// Create Patients
    const patient1 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient1.id } },
            records: { connect: [{ id: record1.id }, { id: record2.id }] }
        },
    });
    const patient2 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient2.id } },
            records: { connect: [{ id: record3.id }, { id: record4.id }] }
        },
    });
    const patient3 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient3.id } },
            records: { connect: [{ id: record5.id }, { id: record6.id }] }
        },
    });
    const patient4 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient4.id } },
            records: { connect: [{ id: record7.id }, { id: record8.id }] }
        },
    });
    const patient5 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient5.id } },
            records: { connect: [{ id: record9.id }, { id: record10.id }] }
        },
    });
    const patient6 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient6.id } },
            records: { connect: [{ id: record11.id }, { id: record12.id }] }
        },
    });
    const patient7 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient7.id } },
            records: { connect: [{ id: record13.id }, { id: record14.id }] }
        },
    });
    const patient8 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient8.id } },
            records: { connect: [{ id: record15.id }, { id: record16.id }] }
        },
    });
    const patient9 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient9.id } },
            records: { connect: [{ id: record17.id }, { id: record18.id }] }
        },
    });
    const patient10 = await prisma.patient.create({
        data: {
            user: { connect: { id: userPacient10.id } },
            records: { connect: [{ id: record19.id }, { id: record20.id }] }
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
    const doctor3 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor3.id }},
            department: 'Pediatrics',
        },
    });
    const doctor4 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor4.id }},
            department: 'Orthopedics',
        },
    });
    const doctor5 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor5.id }},
            department: 'Gastroenterology',
        },
    });
    const doctor6 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor6.id }},
            department: 'Endocrinology',
        },
    });
    const doctor7 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor7.id }},
            department: 'Psychiatry',
        },
    });
    const doctor8 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor8.id }},
            department: 'Ophthalmology',
        },
    });
    const doctor9 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor9.id }},
            department: 'Pulmonology',
        },
    });
    const doctor10 = await prisma.doctor.create({
        data: {
            user: { connect: { id: userDoctor10.id }},
            department: 'Vascular Surgery',
        },
    });

// Create Clinics
    const clinic1 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: [{ id: doctor1.id }, { id: doctor2.id }],
            },    
            address: 'Geldenaaksebaan 335, 3001 Leuven',
            contactNumber: 16375700,
            rating: 7.5,
        },
    });
    const clinic2 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: [{ id: doctor3.id }, { id: doctor4.id }],
            },            
            address: 'Kortestraat 7/9, 3000 Leuven',
            contactNumber: 16200752,
            rating: 8.9,
        },
    });
    const clinic3 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: [{ id: doctor5.id }, { id: doctor6.id }],
            },            
            address: 'Herestraat 49, 3000 Leuven',
            contactNumber: 16200752,
            rating: 8.9,
        },
    });
    const clinic4 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: [{ id: doctor7.id }, { id: doctor8.id }],
            },            
            address: 'P.J. Verhaghenstraat 12, 3000 Leuven',
            contactNumber: 16200752,
            rating: 8.9,
        },
    });
    const clinic5 = await prisma.clinic.create({
        data: {
            doctors: {
                connect: [{ id: doctor9.id }, { id: doctor10.id }],
            },            
            address: 'Naamsestraat 80, 3000 Leuven',
            contactNumber: 16200752,
            rating: 8.9,
        },
    });

// Create Appointments
    const appointment1 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-10-10'),
            endDate: new Date('2025-11-10'),
            comment: 'A routine physical to review overall health, test results, and address any symptoms.',
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
            endDate: new Date('2025-09-27'),
            comment: 'A regular cleaning and check-up to assess oral health and address any issues.',
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
            startDate: new Date('2025-06-15'),
            endDate: new Date('2026-06-16'),
            comment: 'An evaluation for knee pain with a possible imaging test.',
            patient: {
                connect: { id: patient3.id }, 
            },
            doctor: {
                connect: { id: doctor3.id },
            },
        },
    });
    const appointment4 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-12-15'),
            endDate: new Date('2025-12-16'),
            comment: 'A follow-up to review test results and monitor treatment progress.',
            patient: {
                connect: { id: patient4.id }, 
            },
            doctor: {
                connect: { id: doctor4.id },
            },
        },
    });
    const appointment5 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-07-28'),
            endDate: new Date('2025-07-29'),
            comment: 'Annual check-up or routine physical exam.',
            patient: {
                connect: { id: patient5.id }, 
            },
            doctor: {
                connect: { id: doctor5.id },
            },
        },
    });
    const appointment6 = await prisma.appointment.create({
        data: {
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-01-02'),
            comment: 'New or unexplained symptoms, such as fatigue or pain.',
            patient: {
                connect: { id: patient6.id }, 
            },
            doctor: {
                connect: { id: doctor6.id },
            },
        },
    });
    const appointment7 = await prisma.appointment.create({
        data: {
            startDate: new Date('2026-03-14'),
            endDate: new Date('2026-03-15'),
            comment: 'Cough, cold, or flu that lasts longer than a week.',
            patient: {
                connect: { id: patient7.id }, 
            },
            doctor: {
                connect: { id: doctor7.id },
            },
        },
    });
    const appointment8 = await prisma.appointment.create({
        data: {
            startDate: new Date('2026-09-05'),
            endDate: new Date('2026-09-06'),
            comment: 'Severe sore throat, especially with fever.',
            patient: {
                connect: { id: patient8.id }, 
            },
            doctor: {
                connect: { id: doctor8.id },
            },
        },
    });
    const appointment9 = await prisma.appointment.create({
        data: {
            startDate: new Date('2026-10-12'),
            endDate: new Date('2026-10-13'),
            comment: 'Gastrointestinal issues like nausea, vomiting, or diarrhea.',
            patient: {
                connect: { id: patient9.id }, 
            },
            doctor: {
                connect: { id: doctor9.id },
            },
        },
    });
    const appointment10 = await prisma.appointment.create({
        data: {
            startDate: new Date('2026-02-27'),
            endDate: new Date('2026-02-28'),
            comment: 'Management of ongoing conditions like diabetes, hypertension, or asthma.',
            patient: {
                connect: { id: patient10.id }, 
            },
            doctor: {
                connect: { id: doctor10.id },
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