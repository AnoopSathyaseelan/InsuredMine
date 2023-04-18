const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

exports.excecutequery =async(query)=>{
    
    const client = await pool.connect()
    try {
      const result = await client.query(query)
      return result
    }  catch(error){
        console.log("error:"+error);
    }
    finally {
      client.release()
    }
   
}