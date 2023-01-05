'use strict'

const { and } = require("ajv/dist/compile/codegen")

//creating json object

let students = [{

    "id":1,
    "student":{
    "studentName": "student1",
    "studentId": "s1",
    "subject1": 100,
    "subject2": 98,
    "subject3": 76,
    "subject4": 82,
    "subject5": 92
      }
}

]

let currentId=2;

// defining response schema

const postOptions = {
    schema:{
        body:{
        type: 'object',
        properties: {
        students:{type: 'object'},
                },
            },
        response:{
            201:{
                type: 'object',
                require:["id","student"],
                properties: {
                student:{type: 'object'},
                },
            },
       }, 
    
    } ,
}
  

//defining routes 

module.exports = async (fastify, opts) => {
    

    // GET student data

    fastify.get('/report', async function (request, reply) {
        return students
    })



    // POST student data 

    fastify.post('/post', postOptions,async function (request, reply) {

            const student = {...request.body }

            const newStd ={id:currentId,student}
                
            students.push(newStd);

            currentId++
    
            reply.code(201).send({students})

        })



    // DELETE student data

    fastify.delete('/delete/:id', async function(request, reply) {

        const { id } = request.params

    students = students.filter((students)=>students.id !== id)

      reply.send({ message: `Item ${id} has been removed` })
        })


    //UPDATE the student data

    fastify.update('/update', async function(request, reply){

        const {id } = request.params
        const name = {...request.body}
      
        students = students.map((student) => (students.student.studentId === id ? { id, name } :student))
      
        students = students.find((item) => students.student.studentId === id)
      
        reply.send(students);
      })
}
