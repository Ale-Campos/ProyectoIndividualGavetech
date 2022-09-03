import { config } from "dotenv";
//Pone a disposición las variables de entorno (.env)
config();

export default {
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
};
