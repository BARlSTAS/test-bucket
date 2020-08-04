var assert = require('assert')
const path = require('path')
var {initDB, createTable, dropTable, insertStudent, getStudentsByName, closeDBPool} = require('../src/level04')

const name = 'kim'
const email = name+'@email.com'
describe(('Test') , function() {
    let db
    before(async ()=> {
        // db = await initDB(path.resolve(__dirname, 'test.db'))
        // await dropTable(db)
        // await createTable(db)
    })

    describe('insert students', async ()=> {
       it("학생 테스트" ,async ()=> {
        // await insertStudent(db,name,email)
        // const student = await getStudentsByName(db,name)
        // assert.equal(student[0].name,name)
        // assert.equal(student[0].email,email)
       })
    })

    after(async ()=> {
        // await closeDBPool(db)
    })
})
