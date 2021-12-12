import Config from '../../config'

//
const LibTest = {
  getItems: async function(){
    try {
      return [];
    } catch (error) {
      console.error(error);
      throw new Error('Error , getItems');
    }    
  },
  test1: async function(){
    try {
      console.log("#test1");
    } catch (error) {
      console.error(error);
      throw new Error('Error , test1');
    }    
  },

}
export default LibTest
