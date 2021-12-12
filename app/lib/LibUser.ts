// const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');

interface IArgs {
  name: string,
  email: string,
  password: string,
}
//
const LibUser = {
  addUser :async function(args: any){
    try {
    } catch (err) {
      throw new Error('Error , addUser');
    }          
  },
 
}
export default LibUser;
