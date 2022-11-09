"use strict";
import crypto from "crypto";

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key (clave de encriptacion)
const IV = "5183666c72eec9e4"; // set random initialisation vector (vector de inicializacion)
const ALGORITHM = "aes-256-cbc"
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex')
const phrase = "PIC16F876A";

const encrypt = (val) => {
  //Encripta
  let cipher = crypto.createCipheriv(ALGORITHM, ENC_KEY, IV);
  let encrypted = cipher.update(val, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted; //Devuelve lo encriptado
};

function decrypt(encrypted) {
  //Desencripta
  let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8"); //Devuelve lo desencriptado
}
 const cryptMethods = {
  encrypt,
  decrypt,
};

export default  cryptMethods 
// star this gist if you found it useful

/* Nuestros comentarios:
Link del codigo original: https://gist.github.com/siwalikm/8311cf0a287b98ef67c73c1b03b47154

No nombrar carpetas ni archivos con tildes ni espacios.
Tanto en las carpetas como en los archivos se pueden tipear las primeras letras del nombre y apretar tab.

Para meterse en una carpeta tipear en Terminal "cd -nombre de la carpeta-"
Para ejecutar un archivo tipear en Terminal "node -nombre del archivo-.js"
*/
