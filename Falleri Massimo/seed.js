const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function main() {
    await prisma.abteilung.deleteMany();
    await prisma.zoo.deleteMany();
    await prisma.tier.deleteMany();
    await prisma.mitarbeiter.deleteMany();
    
    for (let i = 0; i < 5; i++) {
        await prisma.zoo.create({
            data: {
                land: faker.location.country(),
                stadt: faker.location.city(),
                adresse: faker.location.streetAddress(),
                baujahr: faker.date.past(),
            },
        });
    }
    const zooIds = (await prisma.zoo.findMany({ select: { id: true } })).map(
        (_) => _.id
    );

    tiere = [];
    for (let abteilung of abteilung) {
        const tierCount = faker.number.int({ min: 5, max: 20 });
        for (let i = 0; i < tierCount; i++) {
            tiere.push(
                await prisma.tier.create({
                    data: {
                        art: faker.animal[abteilung.name](),
                        name: `${abteilung.name}: ${faker.person.firstName()}`,
                        abteilungId: abteilung.id,
                    },
                })
            );
        }
    }
    mitarbeiter = [];
    for (let i = 0; i < 100; i++) {
        myAbteilungen = abteilungen
            .toSorted((_) => Math.random() - 0.5)
            .slice(0, faker.number.int({ min: 1, max: 4 }));
        assert.ok(myAbteilungen.length > 0);
        mitarbeiter.push(
            await prisma.Mitarbeiter.create({
                data: {
                    name: faker.person.fullName(),
                    abteilungen: {
                        connect: myAbteilungen,
                    },
                },
            })
        );
    }

    

    
    for (let i = 0; i < zooIds.length; i++) {
        
        const abtNamen = new Set();
        Array.from(new Array(100)).forEach((_) => {
            abtNamen.add(faker.animal.type());
        });
        abtArray = Array.from(abtNamen);
        const count = faker.number.int({ min: 2, max: 7 });
        for (let j = 0; j < count; j++) {
            await prisma.abteilung.create({
                data: {
                    zooId: zooIds[i],
                    name: abtArray.pop(),
                },
            });
        }
    }
}


    

    const AbteilungIds = (
        await prisma.Abteilung.findMany({ select: { cuid: true } })
    ).map((_) => _.id);
    for (let i = 0; i < Math.floor(Math.random() * 21); i++) {
        
        const TierIds = (
            await prisma.Tier.findMany({ select: { id: true } })
        ).map((_) => _.id);

        for (let i = 0; i < 100; i++) {
            const Name = {
                Name: faker.person.fullName(),
            };
            const prismaMitarbeiter = await prisma.Mitarbeiter.create({
                data: prismaMitarbeiter,
            });
        }
    }

   
 
    console.log(zoos.length + ' Zoos created');
    console.log(AbteilungIds.length + ' Abteilungen created');
    console.log(tiere.length + ' Tiere created');
    console.log(mitarbeiter.length + ' Mitarbeiter created');



 
 main()
     .then(() => {
         prisma.$disconnect();
         console.log('done');
     })
     .catch((e) => {
         console.error(e.message);
         process.exit(1);
     });
 

