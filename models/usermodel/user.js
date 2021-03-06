const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Subject`
        }
    ]
})

const autoPopulateLead = function(next) {
    this.populate('subjects');
    next();
  };
  
userSchema.pre('findOne', autoPopulateLead)
.pre('find', autoPopulateLead)

const UserMan = new mongoose.model(`User`, userSchema)

module.exports = UserMan