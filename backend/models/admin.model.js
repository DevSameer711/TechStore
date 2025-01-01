import {model, Schema} from "mongoose"
import bcrypt from "bcrypt"

const AdminSchema = new Schema({
    username:{
        type: String,
        required: [true, "Name is required!"],
        minlength: [5, "Name must be at least 5 characters long."],
        maxLength: [30,"Name can not be longer than 30 characters."]
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "Password must be at least 5 characters!"]
    }
},
{
    timestamps: true
});

AdminSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next;

    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err){
        next(err)
    }
})

const Admin = model("admin", AdminSchema)
export default Admin