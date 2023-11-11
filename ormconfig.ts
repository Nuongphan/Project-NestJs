import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"
require('dotenv').config()

const Config: MysqlConnectionOptions = {

    type: process.env.TYPE_DB as 'mysql',
    host: process.env.HOST_DB,
    port: Number(process.env.PORT_DB),
    username: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/**/**/**/**/*.entity{.ts,.js}'],
    synchronize: true

  }  
  
  export default Config  