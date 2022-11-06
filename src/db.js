import pkg from 'oracledb';
const config = {
  user: 'jeasson',
  password: 'jass',
  connectString: 'localhost:1521'
}

export async function getUsuario (consulta) {
  let conn
  try {

    conn = await pkg.getConnection(config)

    const result = await conn.execute(consulta);
    await conn.execute('COMMIT')

    return(result)

  } catch (err) {
    console.log('Ouch!', err)
    return err;
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}
