// src/config/config.ts
import 'dotenv/config';
import * as joi from 'joi';

const schema = joi.object({
  PORT          : joi.number().required(),
  DB_HOST       : joi.string().required(),
  DB_PORT       : joi.number().required(),
  DB_USER       : joi.string().required(),
  DB_PASS       : joi.string().required(),
  DB_NAME       : joi.string().required(),
  DB_TRUST_CERT : joi.boolean().default(true),
  JWT_SECRET    : joi.string().required(),
  SERVER        : joi.string().required(),
})
.unknown()
.prefs({ convert: true });

const { error, value } = schema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const envs = {
  port          : value.PORT,
  db: {
    host        : value.DB_HOST,
    port        : value.DB_PORT,
    username    : value.DB_USER,
    password    : value.DB_PASS,
    database    : value.DB_NAME,
    trustCert   : value.DB_TRUST_CERT,
  },
  jwtSecret     : value.JWT_SECRET,
  server        : value.SERVER
};
