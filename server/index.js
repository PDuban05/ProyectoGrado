const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

app.use(cors());
app.use(express.json());
const axios = require('axios');
const FormData = require('form-data');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bd_voting",
});

// Ruta para agregar usuario
app.post("/addUser", (req, res) => {
  const { firstName, lastName, email, dni, password } = req.body;

  // Verificar si el email ya está registrado
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.send({ success: false, message: "Error en el servidor" });
    }

    if (results.length > 0) {
      // Si el usuario ya existe
      return res.send({ success: false, message: "El usuario ya existe" });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error al hashear la contraseña",
        });
      }

      // Insertar los datos en la tabla person
      db.query(
        "INSERT INTO person (first_name, last_name, national_id_number) VALUES (?, ?, ?)",
        [firstName, lastName, dni],
        (err, result) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error al registrar usuario en la tabla person",
            });
          }

          // Obtener el ID de la persona recién insertada
          const personId = result.insertId;

          // Insertar los datos en la tabla users
          db.query(
            "INSERT INTO users (person_id, email, password_hash) VALUES (?, ?, ?)",
            [personId, email, hashedPassword],
            (err) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error al registrar usuario en la tabla users",
                });
              }

              res.send({ success: true, message: "Registro exitoso" });
            }
          );
        }
      );
    });
  });
});

// Clave secreta para firmar el token (asegúrate de mantenerla en un lugar seguro)
const SECRET_KEY = "zzzzzzzzzzz";

const isValidTokenStructure = (token) => {
  try {
    // Intentar decodificar el token sin verificar la firma
    const decoded = jwt.decode(token, { complete: true });
    return decoded && decoded.header && decoded.payload;
  } catch (e) {
    return false;
  }
};

// Ruta para autenticar usuario
app.post("/authUser", (req, res) => {
  const { email, password, rememberMe, userType } = req.body;

  // Verificar que se haya enviado el email y la contraseña
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Email y contraseña son requeridos",
    });
  }

  // Consulta SQL para buscar al usuario por email y obtener su contraseña encriptada
  db.query(
    `SELECT users.*, person.first_name, person.last_name, person.profile_picture_url
    FROM users
    JOIN person ON users.person_id = person.person_id
    WHERE users.email = ? AND users.role=?`,
    [email, userType],
    (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidorzzz",
        });
      }

      if (results.length === 0) {
        // Si no se encuentra el usuario
        return res.send({
          success: false,
          message: "Email o contraseña incorrectos",
        });
      }

      const user = results[0];

      // Comparar la contraseña proporcionada con el hash almacenado
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al comparar contraseñas",
          });
        }

        if (!isMatch) {
          // Si las contraseñas no coinciden
          return res.send({
            success: false,
            message: "Email o contraseña incorrectos",
          });
        }

        db.query(
          "UPDATE users SET last_login = NOW() WHERE user_id = ?",
          [user.user_id],
          (err, result) => {
            if (err) {
              return res.send({
                success: false,
                message:
                  "Error al actualizar la fecha de último inicio de sesión en la base de datos",
              });
            }
          }
        );

        // Verificar si el usuario ya tiene un token
        if (user.token && isValidTokenStructure(user.token)) {
          // Si existe un token, lo devolvemos junto con la información del usuario
          return res.send({
            success: true,
            message: "Autenticación exitosa",
            user: {
              id: user.user_id,
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              token: user.token,
              remember: rememberMe,
              role: user.role,
              profilePicture:user.profile_picture_url,
              isVerified: user.is_verified
            },
          });
        } else {
          // Si no existe un token, lo generamos
          const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload con la información que quieres incluir en el token
            SECRET_KEY,
            { expiresIn: rememberMe ? "10000d" : "0.15h" } // Configuración de expiración del token
          );

          // Actualizamos el campo 'token' en la base de datos
          db.query(
            "UPDATE users SET token = ? WHERE user_id = ?",
            [token, user.user_id],
            (err, result) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error al actualizar el token en la base de datos",
                });
              }

              // Devolvemos la respuesta con el token y la información del usuario
              res.send({
                success: true,
                message: "Autenticación exitosa",
                user: {
                  id: user.id,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  token: token,
                  remember: rememberMe,
                  role: user.role,
                  profilePicture:user.profile_picture_url,
                  isVerified: user.is_verified
                },
              });
            }
          );
        }
      });
    }
  );
});

// Ruta para autenticar usuario
app.post("/ValidarToken", (req, res) => {
  const { token } = req.body;
  //Verificar si el token está vacío o es null
  if (!token) {
    return res.send({
      success: false,
    });
  }
  // Consulta SQL para obtener el usuario y su información personal usando el token
  db.query(
    `SELECT users. *, person.first_name, person.last_name,person.profile_picture_url
     FROM users
     JOIN person ON users.person_id = person.person_id
     WHERE users.token = ?`,
    [token],
    (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor",
        });
      }

      if (results.length === 0) {
        // Si no se encuentra el usuario o el token no es válido
        return res.send({
          success: false,
          message: "Token no válido",
        });
      }

      const user = results[0];

      return res.send({
        success: true,
        message: "Autenticación exitosa",
        user: {
          id: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          token: user.token,
          role: user.role,
          profilePicture: user.profile_picture_url ,
          isVerified: user.is_verified
        },
      });
    }
  );
});

// Función para generar un código de 6 dígitos
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post("/send-verification-code", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.send({ success: false, message: "Email es requerido" });
  }

  // Consulta SQL para buscar al usuario por email
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.send({ success: false, message: "Error en el servidor" });
    }

    if (results.length === 0) {
      // Si no se encuentra el usuario
      return res.send({
        success: false,
        message: "Correo electrónico no registrado",
      });
    }
  });

  // Si el usuario existe, generar y enviar el código de verificación
  const verificationCode = generateVerificationCode();

  db.query(
    "UPDATE users SET verification_code = ? WHERE email = ?",
    [verificationCode, email],
    (err, updateResult) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error al actualizar el código de verificación",
        });
      }
    }
  );

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "pedroduban15@gmail.com",
      pass: "noui extw xilf voaz",
    },
  });

  const verificationEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      color: #333;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
    }
    .header img {
      max-width: 100px;
    }
    .content {
      text-align: center;
      padding: 20px;
    }
    .content h1 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #333;
    }
    .content p {
      font-size: 16px;
      margin-bottom: 30px;
      color: #666;
    }
    .verification-code {
      display: inline-block;
      font-size: 32px;
      letter-spacing: 4px;
      margin-bottom: 20px;
      padding: 10px 20px;
      border-radius: 5px;
      background-color: #f1f1f1;
      border: 1px solid #ddd;
      color: #333;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #999;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://firebasestorage.googleapis.com/v0/b/prueba-4dd37.appspot.com/o/votayalogo.png?alt=media&token=733bf5d9-6eb6-4568-9a90-0ce9e3a018e3" alt="Company Logo">
    </div>
    <div class="content">
      <h1>Verificación de cuenta</h1>
      <p>Tu código de verificación es:</p>
      <div class="verification-code">${verificationCode}</div>
      <p>Por favor, introduce este código en la aplicación para continuar.</p>
    </div>
    <div class="footer">
      <p>Si no solicitaste este código, puedes ignorar este mensaje.</p>
      <p>&copy; 2024 VotaOnline. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
`;

  transporter.sendMail(
    {
      from: '"Soporte 👻" <dominicode.xyz@gmail.com>', // Remitente
      to: email, // Receptor (el email proporcionado por el usuario)
      subject: "Código de verificación", // Asunto del correo
      text: `Tu código de verificación es: ${verificationCode}`, // Texto plano del correo
      html: verificationEmailHtml, // Cuerpo HTML del correo
    },
    (error, info) => {
      if (error) {
       
        return res.status(500).send({
          success: false,
          message: "Error enviando el correo electrónico",
        });
      }

     
      return res.send({
        success: true,
        message: "Código de verificación enviado",
      });
    }
  );
});

app.post("/verify-code", (req, res) => {
  const { code } = req.body;

  // Verificar que se haya enviado el código
  if (!code) {
    return res
      .status(400)
      .send({ success: false, message: "El código es requerido" });
  }

  // Consulta SQL para buscar al usuario por el código de verificación
  db.query(
    "SELECT * FROM users WHERE verification_code = ?",
    [code.code],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ success: false, message: "Error en el servidor" });
      }

      // Verificar si el código es inválido (usuario no encontrado)
      if (results.length === 0) {
        return res
          .status(400)
          .send({ success: false, message: "El código no es válido" });
      }

      // El código es válido, obtenemos la información del usuario
      const user = results[0];

      // Actualizar al usuario: eliminar el código, marcar como verificado y poner la fecha de verificación
      const verificationDate = new Date(); // Fecha actual
      db.query(
        "UPDATE users SET verification_code = null, is_verified = 1, verification_date = ? WHERE user_id = ?",
        [verificationDate, user.user_id],
        (err) => {
          if (err) {
            return res
              .status(500)
              .send({ success: false, message: "Error al actualizar el estado del usuario" });
          }

          // Enviar la información del usuario actualizado sin el código de verificación
          return res.send({ success: true, message: "Cuenta verificada correctamente", user });
        }
      );
    }
  );
});
  

app.post("/change-password", (req, res) => {
  const { userId, newPassword } = req.body;
  const saltRounds = 10;
  const password = newPassword.password

  
  // Primero, obtén la contraseña actual del usuario
  const selectQuery = "SELECT password_hash FROM users WHERE user_id = ?";
  db.query(selectQuery, [userId], (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error al obtener la contraseña actual",
      });
    }

    if (results.length === 0) {
      return res.send({ success: false, message: "Usuario no encontrado" });
    }

    const currentHashedPassword = results[0].password_hash;

  

    // Compara la nueva contraseña con la actual
    bcrypt.compare(password, currentHashedPassword, (err, isMatch) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error al comparar las contraseñas",
        });
      }

      if (isMatch) {
        return res.send({
          success: false,
          message: "La nueva contraseña no puede ser igual a la actual",
        });
      }

      // Si la nueva contraseña es diferente, hashearla y actualizarla
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al hashear la contraseña",
          });
        }

        const updateQuery =
          "UPDATE users SET password_hash = ? WHERE user_id = ?";
        db.query(updateQuery, [hashedPassword, userId], (err, result) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error al actualizar la contraseña",
            });
          }

          if (result.affectedRows > 0) {
            return res.send({
              success: true,
              message: "Contraseña actualizada correctamente",
            });
          } else {
            return res.send({
              success: false,
              message: "Usuario no encontrado",
            });
          }
        });
      });
    });
  });
});

app.post("/fetchUpcomingCampaigns", (req, res) => {
  // Obtener la fecha actual en formato compatible con SQL
  const currentDate = new Date().toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'

  // Consulta para obtener solo las campañas que aún no han iniciado
  db.query(
    "SELECT * FROM campaigns WHERE start_date > ?",
    [currentDate],
    (err, results) => {
      if (err) {
        return res.send({ success: false, message: "Error en el servidor" });
      }

      if (results.length === 0) {
        return res.send({
          success: false,
          message: "No hay campañas próximas para mostrar",
        });
      }

      return res.send({
        success: true,
        message: "fetchUpcomingCampaigns success",
        results,
      });
    }
  );
});

app.post("/fetchActiveCampaigns", (req, res) => {
  // Obtener la fecha actual en formato compatible con SQL
  const currentDate = new Date().toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'

  // Consulta para obtener solo las campañas que están activas actualmente
  db.query(
    "SELECT * FROM campaigns WHERE start_date <= ? AND end_date >= ?",
    [currentDate, currentDate],
    (err, results) => {
      if (err) {
        return res.send({ success: false, message: "Error en el servidor" });
      }

      if (results.length === 0) {
        return res.send({
          success: false,
          message: "No hay campañas activas actualmente",
        });
      }

      return res.send({
        success: true,
        message: "fetchActiveCampaigns success",
        results,
      });
    }
  );
});

app.post("/fetchFinishedCampaigns", (req, res) => {
  // Obtener la fecha actual en formato compatible con SQL
  const currentDate = new Date().toISOString().split("T")[0]; // Formato 'YYYY-MM-DD'

  // Consulta para obtener solo las campañas que ya han finalizado
  db.query(
    "SELECT * FROM campaigns WHERE end_date < ?",
    [currentDate],
    (err, results) => {
      if (err) {
        return res.send({ success: false, message: "Error en el servidor" });
      }

      if (results.length === 0) {
        return res.send({
          success: false,
          message: "No hay campañas finalizadas",
        });
      }

      return res.send({
        success: true,
        message: "fetchFinishedCampaigns success",
        results,
      });
    }
  );
});

app.post("/fetchCampaigns", (req, res) => {
  const { campaignId, userId } = req.body;

  // Obtenemos la información de la campaña específica, excluyendo public_key y private_key
  const campaignQuery = `
    SELECT campaign_id, name, description, start_date, end_date, image_url 
    FROM campaigns 
    WHERE campaign_id = ?`;

  db.query(campaignQuery, [campaignId], (err, campaignResults) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error en el servidor al obtener la campaña",
      });
    }

    if (campaignResults.length === 0) {
      return res.send({ success: false, message: "No se encontró la campaña" });
    }

    // Ahora, obtenemos los candidatos aprobados relacionados con esa campaña
    const candidatesQuery = `
      SELECT * FROM candidates 
      WHERE campaign_id = ? 
      AND is_approved = 'true'`;

    db.query(candidatesQuery, [campaignId], (err, candidatesResults) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al obtener los candidatos",
        });
      }

      // Extraer los person_id de los candidatos aprobados
      const personIds = candidatesResults.map(
        (candidate) => candidate.person_id
      );

      if (personIds.length === 0) {
        return res.send({
          success: true,
          message: "fetchCampaign success",
          campaign: campaignResults[0],
          candidates: [],
          hasVoted: false,
          totalVotes: 0, // No hay votos si no hay candidatos
        });
      }

      // Obtener la información de las personas basándose en los person_id
      const personQuery = "SELECT * FROM person WHERE person_id IN (?)";

      db.query(personQuery, [personIds], (err, personsResults) => {
        if (err) {
          return res.send({
            success: false,
            message:
              "Error en el servidor al obtener la información de las personas",
          });
        }

        // Verificar si el usuario ya votó en esta campaña
        const userVoteQuery =
          "SELECT * FROM votes WHERE campaign_id = ? AND user_id = ?";

        db.query(userVoteQuery, [campaignId, userId], (err, userVoteResults) => {
          if (err) {
            return res.send({
              success: false,
              message:
                "Error en el servidor al verificar el voto del usuario",
            });
          }

          const hasVoted = userVoteResults.length > 0; // Si el usuario ya votó

          // Contar los votos totales para la campaña
          const totalVotesQuery = `
            SELECT COUNT(*) AS totalVotes 
            FROM votes 
            WHERE campaign_id = ?`;

          db.query(totalVotesQuery, [campaignId], (err, totalVotesResult) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error en el servidor al contar los votos",
              });
            }

            const totalVotes = totalVotesResult[0].totalVotes; // El número total de votos

            // Combinar la información de los candidatos aprobados con la de las personas
            const candidatesWithPersonData = candidatesResults.map((candidate) => {
              const person = personsResults.find(
                (person) => person.person_id === candidate.person_id
              );
              return { ...candidate, ...person };
            });

            return res.send({
              success: true,
              message: "fetchCampaign success",
              campaign: campaignResults[0], // Retornamos la información de la campaña sin public_key ni private_key
              candidates: candidatesWithPersonData, // Retornamos la lista de candidatos aprobados con información de la persona
              hasVoted, // Retornamos si el usuario ya votó o no
              totalVotes, // Retornamos el número total de votos
            });
          });
        });
      });
    });
  });
});


// Leer claves desde archivos

// Función para encriptar
function encryptId(id, publicKey) {
  const buffer = Buffer.from(id, "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

// Función para desencriptar
function decryptId(encryptedId, privateKey) {
  const buffer = Buffer.from(encryptedId, "base64");
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf8");
}



function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Tamaño de la clave en bits
    publicKeyEncoding: {
      type: "spki", // Estructura de la clave pública
      format: "pem", // Formato PEM
    },
    privateKeyEncoding: {
      type: "pkcs8", // Estructura de la clave privada
      format: "pem", // Formato PEM
    },
  });

 
  return { publicKey, privateKey }; // Devolver las claves generadas
}

// Función para obtener las claves
function getKeys() {
  return generateKeys(); // Llamar a generateKeys y devolver sus claves
}

app.post("/registervote", (req, res) => {
  const { infVote, user } = req.body;

  const candidateIdString = String(infVote.candidate_id);

  if (!infVote || !infVote.candidate_id) {
    return res.status(400).json({ error: "Candidate ID is required" });
  }



  try {
    // Consulta para obtener la public_key de la campaña
    const publicKeyQuery = `
      SELECT public_key 
      FROM campaigns
      WHERE campaign_id = ?
    `;

    db.query(publicKeyQuery, [infVote.campaign_id], (err, campaignResults) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener la clave pública de la campaña.',
          error: err,
        });
      }

      if (campaignResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontró ninguna campaña con el ID proporcionado.',
        });
      }

      // Obtener la public_key de la campaña
      const publicKey = campaignResults[0].public_key;

      // Encriptar el ID del candidato utilizando la public_key
      const encryptedCandidateId = encryptId(candidateIdString, publicKey);

      const ipAddress =
        req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];

      // Insertar el voto en la tabla votes
      db.query(
        "INSERT INTO votes (user_id, campaign_id, ip_address, user_agent, digital_signature) VALUES (?, ?, ?, ?, ?)",
        [
          user.id,
          infVote.campaign_id,
          ipAddress,
          userAgent,
          encryptedCandidateId,
        ],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error al registrar el voto.",
              error: err,
            });
          }

          // Enviar la información del usuario sin el código
          return res.status(200).json({
            success: true,
            message: 'Voto registrado correctamente.',
            user,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering vote", error });
  }
});


app.post("/fetchUserInf", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.send({
      success: false,
      mensage: "ID no proporcionado o inválido.",
    });
  }
  db.query(
    "SELECT * FROM person WHERE  person_id =  ?",
    [id],
    (err, results) => {
      if (err) {
        return res.send({ success: false, message: "Error en el servidor" });
      }

      if (results.length === 0) {
        return res.send({
          success: false,
          message: "usuario no registrado",
        });
      }

      return res.send({
        success: true,
        message: "success",
        results,
      });
    }
  );
});

app.post("/UpdateUserInf", (req, res) => {
  const {
    person_id,
    national_id_number,
    first_name,
    last_name,
    date_of_birth,
    gender,
    phone_number,
    address,
    city,
    state,
    country,
    profile_picture_url,
    occupation,
    education_level,
    marital_status,
    citizenship_status,
  } = req.body;

  if (!person_id) {
    return res.send({
      success: false,
      message: "ID no proporcionado o inválido.",
    });
  }

  // Construcción de la consulta SQL para actualizar los datos
  const query = `
    UPDATE person 
    SET national_id_number = ?, 
        first_name = ?, 
        last_name = ?, 
        date_of_birth = ?, 
        gender = ?, 
        phone_number = ?, 
        address = ?, 
        city = ?, 
        state = ?, 
        country = ?, 
        profile_picture_url = ?, 
        occupation = ?, 
        education_level = ?, 
        marital_status = ?, 
        citizenship_status = ?
    WHERE person_id = ?`;

  // Parámetros que se enviarán a la consulta
  const params = [
    national_id_number,
    first_name,
    last_name,
    date_of_birth,
    gender,
    phone_number,
    address,
    city,
    state,
    country,
    profile_picture_url,
    occupation,
    education_level,
    marital_status,
    citizenship_status,
    person_id,
  ];

  db.query(query, params, (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error en el servidor al actualizar el usuario.",
        error: err,
      });
    }

    if (results.affectedRows === 0) {
      return res.send({
        success: false,
        message: "El usuario no existe o no se pudo actualizar.",
      });
    }

    return res.send({
      success: true,
      message: "Datos del usuario actualizados correctamente.",
    });
  });
});


app.post("/validarUserInf", (req, res) => {
  const {
    person_id,
  } = req.body;

  if (!person_id) {
    return res.send({
      success: false,
      message: "ID no proporcionado o inválido.",
    });
  }

  // Consulta SQL para obtener los datos actuales de la persona
  const selectQuery = "SELECT * FROM person WHERE person_id = ?";

  db.query(selectQuery, [person_id], (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error en el servidor al obtener los datos del usuario.",
        error: err,
      });
    }

    if (results.length === 0) {
      return res.send({
        success: false,
        message: "Usuario no encontrado.",
      });
    }

    const currentData = results[0];

    // Validación de los datos existentes en la base de datos
    if (
      !currentData.national_id_number ||
      !currentData.first_name ||
      !currentData.last_name ||
      !currentData.gender ||
      !currentData.phone_number ||
      !currentData.address ||
      !currentData.city ||
      !currentData.state ||
      !currentData.country ||
      !currentData.occupation ||
      !currentData.education_level ||
      !currentData.marital_status ||
      !currentData.citizenship_status
    ) {
      return res.send({
        success: false,
        message: "Los datos existentes en la base de datos no son válidos.",
      });
    }

    return res.send({
      success: true,
      message: "Los datos son validos.",
    });

   

   

    
  });
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.user_id; // Obtener user_id de los parámetros de la URL
    const type = req.params.type; // Obtener type (profile o campaign) de los parámetros de la URL
 

    // Validar que el tipo sea válido (profile o campaign)
    if (!["profile", "campaign"].includes(type)) {
      return cb(new Error("Tipo de carpeta no válido"), null);
    }

    // Crear la ruta de la carpeta según el user_id y el tipo
    const folderPath = path.join(__dirname, `uploads/${userId}_${type}`);

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Definir el destino final
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    // Asignar el nombre del archivo
    cb(null, "uploaded_file" + path.extname(file.originalname)); // Cambia "uploaded_file" según tu necesidad
  },
});

const upload = multer({ storage: storage });

// Ruta para subir archivos con el tipo dinámico
app.post("/upload/:user_id/:type", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ success: false, message: "No file uploaded" });
  }

  const userId = req.params.user_id;
  const type = req.params.type;

  // Ruta relativa del archivo subido
  const filePath = `/uploads/${userId}_${type}/${req.file.filename}`;

  res.send({
    success: true,
    imageUrl: filePath,
  });
});



app.post("/RegisterCandidate", (req, res) => {
  const {
    person_id,
    political_party,
    campaign_slogan,
    biography,
    social_media_links,
    campaign_id
  } = req.body;

  if (!person_id) {
    return res.send({
      success: false,
      message: "ID no proporcionado o inválido.",
    });
  }

  // Consulta para verificar si el candidato ya está registrado en la campaña
  const checkCandidateQuery = `
    SELECT * FROM candidates 
    WHERE person_id = ? AND campaign_id = ?`;

  db.query(checkCandidateQuery, [person_id, campaign_id], (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error en el servidor al verificar el candidato.",
        error: err,
      });
    }

    // Si se encuentra un registro, significa que la persona ya está registrada como candidato
    if (results.length > 0) {
      return res.send({
        success: false,
        message: "Ya has aplicado para ser candidato para esta campaña.",
      });
    }

    // Si no existe, procedemos a la inserción
    const insertCandidateQuery = `
      INSERT INTO candidates (
        person_id, 
        campaign_id, 
        political_party, 
        campaign_slogan, 
        biography, 
        social_media_links
      ) VALUES (?, ?, ?, ?, ?, ?)`;

    // Serializamos los enlaces de redes sociales a un JSON string
    const socialMediaLinks = JSON.stringify(social_media_links);

    const candidateParams = [
      person_id,
      campaign_id,
      political_party,
      campaign_slogan,
      biography,
      socialMediaLinks
    ];

    // Ejecutamos la consulta para insertar los datos en la tabla 'candidates'
    db.query(insertCandidateQuery, candidateParams, (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al insertar el candidato.",
          error: err,
        });
      }

      return res.send({
        success: true,
        message: "Candidato insertado correctamente.",
      });
    });
  });
});


app.post("/fetchCampaignsAdmin", (req, res) => {
  // Obtener todas las campañas
  const campaignQuery = "SELECT * FROM campaigns";

  db.query(campaignQuery, (err, campaignResults) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error en el servidor al obtener las campañas",
      });
    }

    if (campaignResults.length === 0) {
      return res.send({
        success: false,
        message: "No se encontraron campañas",
      });
    }

    // Extraer todos los campaign_ids
    const campaignIds = campaignResults.map(campaign => campaign.campaign_id);

    // Obtener candidatos y toda la información de la tabla candidates y person
    const candidatesQuery = `
      SELECT 
        c.*,  -- Aquí seleccionamos toda la información de 'candidates'
        p.*   -- Aquí seleccionamos toda la información de 'person'
      FROM candidates c
      JOIN person p ON c.person_id = p.person_id
      WHERE c.campaign_id IN (?);
    `;

    db.query(candidatesQuery, [campaignIds], (err, candidatesResults) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al obtener los candidatos",
        });
      }

      // Obtener votantes para todas las campañas
      const votesQuery = "SELECT * FROM votes WHERE campaign_id IN (?)";
      db.query(votesQuery, [campaignIds], (err, votesResults) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error en el servidor al obtener los votos",
          });
        }

        // Combinar los resultados
        const campaignsWithDetails = campaignResults.map(campaign => {
          const campaignCandidates = candidatesResults.filter(
            candidate => candidate.campaign_id === campaign.campaign_id
          );

          const campaignVoters = votesResults.filter(
            vote => vote.campaign_id === campaign.campaign_id
          );

          return {
            ...campaign,
            candidates: campaignCandidates,  // Agregar candidatos y su información de 'person' y 'candidates'
            voters: campaignVoters,  // Agregar los votantes
          };
        });

        return res.send({
          success: true,
          message: "fetchCampaignsAdmin success",
          campaigns: campaignsWithDetails,
        });
      });
    });
  });
});



app.post("/updateCampaign", (req, res) => {
  const {
    campaignId,
    name,
    description,
    startDate,
    endDate,
    imageUrl,
  } = req.body;

  if (!campaignId) {
    return res.send({
      success: false,
      message: "ID de campaña no proporcionado o inválido.",
    });
  }

  // Construcción de la consulta SQL para actualizar los datos de la campaña
  const query = `
    UPDATE campaigns 
    SET name = ?, 
        description = ?, 
        start_date = ?, 
        end_date = ?, 
        image_url = ?
    WHERE campaign_id = ?`;

  // Parámetros que se enviarán a la consulta
  const params = [
    name,
    description,
    startDate,
    endDate,
    imageUrl,
    campaignId,  
  ];

  db.query(query, params, (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error en el servidor al actualizar la campaña.",
        error: err,
      });
    }

    if (results.affectedRows === 0) {
      return res.send({
        success: false,
        message: "La campaña no existe o no se pudo actualizar.",
      });
    }

    return res.send({
      success: true,
      message: "Datos de la campaña actualizados correctamente.",
    });
  });
});


app.post("/updateCandidate", (req, res) => {

  const { approvedCandidates, unapprovedCandidates } = req.body;

  if (!approvedCandidates && !unapprovedCandidates) {
    return res.send({
      success: false,
      message: "No se proporcionaron candidatos aprobados o desaprobados.",
    });
  }

  // Actualizar los candidatos aprobados
  if (approvedCandidates && approvedCandidates.length > 0) {
    const approvedQuery = `
      UPDATE candidates 
      SET is_approved = 'true' 
      WHERE candidate_id = ? AND campaign_id = ?
    `;

    approvedCandidates.forEach((candidate) => {
      const params = [candidate.candidate_id, candidate.campaign_id];
      db.query(approvedQuery, params, (err, results) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al actualizar los candidatos aprobados.",
            error: err,
          });
        }
      });
    });
  }

  // Actualizar los candidatos no aprobados
  if (unapprovedCandidates && unapprovedCandidates.length > 0) {
    const unapprovedQuery = `
      UPDATE candidates 
      SET is_approved = 'false' 
      WHERE candidate_id = ? AND campaign_id = ?
    `;

    unapprovedCandidates.forEach((candidate) => {
      const params = [candidate.candidate_id, candidate.campaign_id];
      db.query(unapprovedQuery, params, (err, results) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al actualizar los candidatos no aprobados.",
            error: err,
          });
        }
      });
    });
  }

  return res.send({
    success: true,
    message: "El estado de aprobación de los candidatos se ha actualizado correctamente.",
  });
});
// Tu función CreateCampaign
app.post("/CreateCampaign", (req, res) => {
  const { Data } = req.body;

  // Verificar si los campos obligatorios están presentes
  if (!Data.name || !Data.startDate || !Data.endDate) {
    return res.send({
      success: false,
      message: "Faltan campos obligatorios.",
    });
  }

  // Generar las claves
  const { publicKey, privateKey } = getKeys();

  // Insertar la nueva campaña en la tabla 'campaigns'
  const insertCampaignQuery = `
    INSERT INTO campaigns (
      name, 
      description, 
      start_date, 
      end_date, 
      voting_method, 
      image_url,
      public_key, 
      private_key
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Parámetros de la campaña que se van a insertar
  const campaignParams = [
    Data.name,
    Data.description || null,
    Data.startDate,
    Data.endDate,
    Data.voting_method || "online",
    Data.image_url || null, // Esto es opcional, si no hay imagen pasa null
    publicKey,
    privateKey
  ];

  // Ejecutar la consulta para insertar los datos en la tabla 'campaigns'
  db.query(insertCampaignQuery, campaignParams, (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error en el servidor al insertar la campaña.",
        error: err,
      });
    }

    const campaignId = results.insertId; // ID de la campaña recién creada
 

    // Devolver el ID de la campaña creada
    return res.send({
      success: true,
      message: "Campaña creada correctamente.",
      campaignId: campaignId,
    });
  });
});

app.post('/updateCampaignImage',  (req, res) => {
  const { imageUrl,campaignId } = req.body;

  

 

  // Consulta para actualizar el campo `image_url` en la base de datos
  const updateQuery = `
    UPDATE campaigns
    SET image_url = ?
    WHERE campaign_id = ?
  `;

  db.query(updateQuery, [imageUrl, campaignId], (err, results) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: 'Error al actualizar la imagen de la campaña.',
        error: err,
      });
    }

    return res.send({
      success: true,
      message: 'Imagen actualizada correctamente.',
      imageUrl: imageUrl // Devuelve la URL de la imagen actualizada
    });
  });
});




app.post('/deleteCampaign', (req, res) => {
  const { campaign_Id } = req.body;

  if (!campaign_Id) {
    return res.status(400).send({
      success: false,
      message: 'Falta el ID de la campaña.',
    });
  }

  // Iniciar una transacción
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: 'Error al iniciar la transacción.',
        error: err,
      });
    }

    // Consulta para eliminar todos los votos de la campaña
    const deleteVotesQuery = `
      DELETE FROM votes
      WHERE campaign_id = ?
    `;

    db.query(deleteVotesQuery, [campaign_Id], (err, results) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).send({
            success: false,
            message: 'Error al eliminar los votos.',
            error: err,
          });
        });
      }

      // Consulta para eliminar todos los candidatos de la campaña
      const deleteCandidatesQuery = `
        DELETE FROM candidates
        WHERE campaign_id = ?
      `;

      db.query(deleteCandidatesQuery, [campaign_Id], (err, results) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).send({
              success: false,
              message: 'Error al eliminar los candidatos.',
              error: err,
            });
          });
        }

        // Consulta para eliminar la campaña
        const deleteCampaignQuery = `
          DELETE FROM campaigns
          WHERE campaign_id = ?
        `;

        db.query(deleteCampaignQuery, [campaign_Id], (err, results) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send({
                success: false,
                message: 'Error al eliminar la campaña.',
                error: err,
              });
            });
          }

          if (results.affectedRows === 0) {
            return db.rollback(() => {
              res.status(404).send({
                success: false,
                message: 'No se encontró ninguna campaña con el ID proporcionado.',
              });
            });
          }

          // Commit de la transacción
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).send({
                  success: false,
                  message: 'Error al finalizar la transacción.',
                  error: err,
                });
              });
            }

            return res.send({
              success: true,
              message: 'Campaña, candidatos y votos eliminados correctamente.',
            });
          });
        });
      });
    });
  });
});





    app.post('/resultVotes', (req, res) => {
      const { idCampaign } = req.body;
    
      // Verificar que se proporciona el id de la campaña
      if (!idCampaign) {
        return res.status(400).send({
          success: false,
          message: 'Falta el ID de la campaña.',
        });
      }
    
      // Consulta para obtener la private_key de la tabla campaigns
      const privateKeyQuery = `
        SELECT private_key 
        FROM campaigns
        WHERE campaign_id = ?
      `;
    
      db.query(privateKeyQuery, [idCampaign], (err, campaignResults) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: 'Error al obtener la private_key de la campaña.',
            error: err,
          });
        }
    
        if (campaignResults.length === 0) {
          return res.status(404).send({
            success: false,
            message: 'No se encontró ninguna campaña con el ID proporcionado.',
          });
        }
    
        // Obtener la private_key de la campaña
        const privateKey = campaignResults[0].private_key;
    
        // Consulta para obtener los votos de la campaña específica
        const votesQuery = `
          SELECT digital_signature
          FROM votes
          WHERE campaign_id = ?
        `;
    
        db.query(votesQuery, [idCampaign], (err, voteResults) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: 'Error al obtener los votos de la campaña.',
              error: err,
            });
          }
    
          // Si no hay votos, retornamos un mensaje indicando la situación
          if (voteResults.length === 0) {
            return res.status(404).send({
              success: false,
              message: 'No se encontraron votos para esta campaña.',
            });
          }
    
          // Contador para almacenar los votos de cada candidato
          const voteCount = {};
          let isValidKey = true;
    
          // Desencriptar las firmas digitales y contar los votos por cada candidato
          voteResults.forEach(vote => {
            try {
              // Desencriptar el ID del candidato
              const decryptedCandidateId = decryptId(vote.digital_signature, privateKey);
    
              // Si el ID del candidato ya existe en el contador, incrementar su cuenta
              if (voteCount[decryptedCandidateId]) {
                voteCount[decryptedCandidateId]++;
              } else {
                // Si el ID no existe, inicializar su cuenta en 1
                voteCount[decryptedCandidateId] = 1;
              }
            } catch (error) {
              // Manejar el error de desencriptación si ocurre
              console.error(`Error desencriptando el voto: ${vote.digital_signature}. Error: ${error.message}`);
              // Continuar con el siguiente voto
            }
          });
    
          // Si la clave privada es inválida, poner el conteo de todos los candidatos en cero
          if (!isValidKey) {
            // Aquí es donde debes ajustar el conteo a cero para todos los candidatos
            // Esto puede requerir otra consulta para obtener la lista de candidatos y luego establecer el conteo en cero.
            
            // Por simplicidad, supongamos que tienes una función para obtener todos los candidatos
            const allCandidatesQuery = `
              SELECT candidate_id
              FROM candidates
              WHERE campaign_id = ?
            `;
            
            db.query(allCandidatesQuery, [idCampaign], (err, candidateResults) => {
              if (err) {
                return res.status(500).send({
                  success: false,
                  message: 'Error al obtener los candidatos de la campaña.',
                  error: err,
                });
              }
    
              const zeroVoteCount = candidateResults.reduce((acc, candidate) => {
                acc[candidate.candidate_id] = 0;
                return acc;
              }, {});
    
              return res.send({
                success: true,
                message: 'Error con la clave privada. Todos los votos se han puesto a cero.',
                voteCount: zeroVoteCount,
              });
            });
          } else {
            return res.send({
              success: true,
              message: 'Votos obtenidos y contados correctamente.',
              voteCount, // Retorna el conteo de votos por candidato
            });
          }
        });
      });
    });
    





app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001");
});
