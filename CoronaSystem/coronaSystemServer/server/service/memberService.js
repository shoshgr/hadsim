const db = require('../db');

async function getMembers() {

    let result = await db.query('select FirstName,LastName,ID from corona.members'
        , (res) => result = res);
    return result;
}

async function getMemberDetails(id) {
    try {
        let isExist = await db.query(`SELECT ID FROM corona.members WHERE ID = ${id}`);
        if (!isExist)
            throw { message: "Error: Cannot get non-existent member details" };
        let memberDetails = await db.query(`SELECT * FROM corona.members WHERE ID = ${id}`);
        let patientDetails = await db.query(`SELECT PositiveTestDate, RecoveryDate FROM corona.patients WHERE MemberID = ${id}`);
        let vaccinationDetails = await db.query(`SELECT VaccinationDate, VaccineManufacturer FROM corona.vaccinated WHERE MemberID = ${id}`);
        // Concatenate the results into a single array
        let result = memberDetails.concat({ "Illness": patientDetails }, { "Vaccinations": vaccinationDetails });
        return result;
    } catch (error) {
        console.error('Error getting member details:', error);
        throw error;
    }
}

async function postMemberDetails(req) {
    try {
        const { FirstName, LastName, IDNumber, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone } = req.body;
        let isExsit = await db.query(`select ID from corona.members WHERE IDNumber = ${IDNumber} `);
        if (isExsit && isExsit.length > 0)
            throw ({ message: " error the member is exist " });
        const result = await db.query(`INSERT INTO corona.members (FirstName, LastName, IDNumber, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone)
         values("${FirstName}", "${LastName}", "${IDNumber}",  "${AddressCity}",  "${AddressStreet}",  "${AddressNumber}",  "${BirthDate}",  "${Phone}",  "${MobilePhone}")`
        );
        const ID = await db.query(`select ID from corona.members WHERE IDNumber = ${IDNumber} `);
        if (!ID) {
            throw ({ message: " Error The member was not added" })
        }
        return result;
    } catch (error) {
        console.error('Error posting member details:', error);
        throw error;
    }
}

async function postVaccinesDetails(req) {
    try {
        const id = req.params.id;
        let isExsit = await db.query(`select ID from corona.members WHERE ID = ${id}`);
        if (!isExsit)
            throw ({ message: "Error Cannot add to not exist  member vaccine " })
        const { VaccinationDate, VaccineManufacturer } = req.body;
        const result = await db.query(`
        INSERT INTO corona.vaccinated (MemberID, VaccinationDate, VaccineManufacturer)
        VALUES (${id}, '${VaccinationDate}', '${VaccineManufacturer}')`);
        return result;
    } catch (error) {
        console.error('Error posting member corona details:', error);
        throw error;
    }
}

async function postIllnessDetails(req) {
    try {
        const id = req.params.id;
        let isExsit = await db.query(`select ID from corona.members WHERE ID = ${id} `);
        if (!isExsit)
            throw ({ massge: "Error Cannot add to not exist  member illnes details " })
        const { PositiveTestDate, RecoveryDate } = req.body;
        const Recovery = RecoveryDate!="" ? `'${RecoveryDate}'`: "NULL";
        const result = await db.query(`
        INSERT INTO corona.patients (MemberID, PositiveTestDate, RecoveryDate)
        VALUES ("${id}", '${PositiveTestDate}', ${Recovery})`);
        return result;
    } catch (error) {
        console.error('Error posting member corona details:', error);
        throw error;
    }

}

async function deleteMember(id) {
    try {
        let isExist = await db.query(`select ID from corona.members WHERE ID = ${id}`);
        if (!isExist) {
            throw { message: "Error Cannot delete member that does not exist" };
        }
        const deleteVaccines = await db.query(`UPDATE corona.vaccinated SET MemberID = NULL
        WHERE MemberID = ${id}`);
        const deleteIllness = await db.query(`UPDATE corona.patients SET MemberID = NULL
        WHERE MemberID = ${id}`);
        const deleteMember = await db.query(`DELETE FROM corona.members WHERE ID = '${id}'`);

        return deleteMember;
    } catch (error) {
        console.error('Error while deleting member:', error);
        throw error;
    }
}


async function updateMember(id, req) {
    let isExsit = await db.query(`select * from corona.members WHERE ID = ${id}`);
    if (!isExsit)
        throw ({ massge: "Error Cannot update  not exist member" })
    let updateQuery = `UPDATE corona.members SET `;
    const fieldsToUpdate = [];
    if (req.body.firstName)
        fieldsToUpdate.push(`FirstName = '${req.body.firstName}'`);

    if (req.body.lastName)
        fieldsToUpdate.push(`LastName = '${req.body.lastName}'`);

    if (req.body.phoneNumber)
        fieldsToUpdate.push(`PhoneNumber = '${req.body.phone}'`);

    if (req.body.mobilePhone)
        fieldsToUpdate.push(`MobilePhone = '${req.body.mobilePhone}'`);

    if (req.body.phoneNumber)
        fieldsToUpdate.push(`BrithDate = '${req.body.citi}'`);

    if (req.body.phoneNumber)
        fieldsToUpdate.push(`AddressCity  = ${req.body.brithDate}`);

    if (req.body.phoneNumber)
        fieldsToUpdate.push(`AddressStreet  = '${req.body.street}'`);

    if (req.body.phoneNumber)
        fieldsToUpdate.push(`AddressNumbe  = '${req.body.houseNO}'`);

    if (fieldsToUpdate.length > 0) {
        updateQuery += fieldsToUpdate.join(', ');
        updateQuery += ` WHERE ID = ${id}`;

        const result = await db.query(updateQuery);
        return result;
    }
}
async function updateMemberIllness(req) {
    const id = req.params.id;
    let isExsit = await db.query(`select * from corona.patients WHERE MemberID = ${id}`);
    if (!isExsit)
        throw ({ massge: "Error Cannot update  not exist patients" })

    const result = await db.query(`UPDATE corona.patients SET RecoveryDate ='${req.body.RecoveryDate}' WHERE MemberID=${id} `);
    return result;
}

module.exports = {
    getMembers, getMemberDetails, postMemberDetails, postVaccinesDetails, postIllnessDetails, deleteMember
    , updateMember, updateMemberIllness
}