const { User, Book}= require('../models');
const { AuthenticationError} = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers={
    Query:{
        me: async (parent, args, context)=>{
            if(context.user)
                {
                    const userData = await User.findOne({ _id: context.user.id })
                        .select('-__V -password')
                    return userData;        
                }
                throw new AuthenticationError('not logged in')

        }
    },
    Mutation:{
        login: async (parent, {email,password})=>{
            const user = await User.fineOne({ email });
            if(!user){
                throw new AuthenticationError('incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password)
            if(!correctPw){
                throw new AuthenticationError('incorrect credentials')
            }

            const token = signToken(user);
            return{token,user}
        },
        addUser: async(parent, args)=>{
            const user = await User.create(args);
            const token = signToken(user);
            
            return {token, user};
        }
    }
}