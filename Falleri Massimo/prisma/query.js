const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

function getAbteilungid() {
        let len = Math.floor(Math.random() * AbteilungIds.length);
        let abt = zooIds[len];
        return abt;
}
    
function getRndZooid() {
         return zooIds[Math.floor(Math.random() * zooIds.length)];
}
     
  const MitarbeiterIds = (
         await prisma.Mitarbeiter.findMany({ select: { cuid: true } })
     ).map((_) => _.id);