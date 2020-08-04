const sqlite3 = require('sqlite3').verbose();

exports.initDB =  function initDB(path) {
    return new Promise((resolve,reject)=> {
        resolve(new sqlite3.Database(path))
        if(reject) {
            throw new Error('연결 실패')
        }
    })
}

exports.createTable =  function createTable(db) {
    return new Promise((resolve,reject)=> {
        resolve(db.run('CREATE TABLE IF NOT EXISTS student(id integer primary key, name text not null, email text unique)'))
        if(reject) {
            throw new Error('테이블 생성 실패')
        }
    })
}

exports.dropTable =  function dropTable(db) {
    return new Promise((resolve,reject)=>{
        resolve(db.run('DROP TABLE IF EXISTS student'))
        if(reject) {
            throw new Error('테이블 삭제 실패')
        }
    })
}

exports.insertStudent =  function insertStudent(db, name, email) {
    return new Promise((resolve,reject)=> {
        resolve(db.run(`INSERT INTO student(name, email) VALUES('${name}', '${email}')`))
        if(reject) {
            throw new Error('입력 실패')
        }
    })
}

exports.getStudentsByName = function getStudentsByName(db, name) {
    let sql = `SELECT * FROM student
    WHERE name = '${name}'`;

    return new Promise((resolve,reject)=> {
        db.all(sql, (err, rows)=> {
            resolve(rows)
        if(err) {
            throw reject(err)
        }
        })

    });
}

exports.closeDBPool = function closeDBPool(db) {
    return new Promise((resolve,reject)=> {
        resolve(db.close())
        if(reject) {
            throw new Error('종료 실패')
        }
    })
}

