const mongoose = require(`mongoose`)

const subjectSchema = new mongoose.Schema ({
    name: String,
    description: String
})

const SubjectMan = new mongoose.model(`Subject`, subjectSchema)

module.exports = SubjectMan