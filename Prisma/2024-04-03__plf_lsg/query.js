
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query'] });

    async function getRndZooid() {
         return zooIds[Math.floor(Math.random() * zooIds.length)];
     }

    async function getRanAbteilungid() {
        let len = Math.floor(Math.random() * AbteilungIds.length);
        let abt = zooIds[len];
        return abt;
}
    async function getRndMitarbeiterid() {
        let len = Math.floor(Math.random() * AbteilungIds.length);
        let abt = zooIds[len];
        return abt;
    }