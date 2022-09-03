import { getConnection } from "./../database/database";
import fs from "fs";

const prueba = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(__dirname + "./../views/index2.html", null, (err, data) => {
    if (err) throw err;
    res.write(data);
    res.end();
  });
};

export const methods = {
  prueba,
};
