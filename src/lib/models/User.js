import {Schema,model, models} from 'mongoose'

const UserSchema = new Schema({
    email: String,
    name: String,
    
},{
    timestamps: true
})

export default models.User || model('User',UserSchema)