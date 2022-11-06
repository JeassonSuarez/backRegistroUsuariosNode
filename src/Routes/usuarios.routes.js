import { Router } from "express";
import pkg from "nodemailer";
import { getUsuario } from "../db.js";


const router = Router();
router.get('/usuario', async(req, res)=>{
    res.json(await getUsuario("select * from USUARIOUNIVERSIDAD"));
});

router.post('/usuario', async(req, res)=>{
    let anio = new Date(req.body.fNacimiento).getFullYear(),
    mes = new Date(req.body.fNacimiento).getMonth(),
    dia = new Date(req.body.fNacimiento).getDay(),
    fechaNacimiento = `${dia}-${mes}-${anio}`;
    let respuesta = await getUsuario(`insert into usuariouniversidad values ('${req.body.cedula}', '${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.password}', '${fechaNacimiento}', '${req.body.telefono}', '${req.body.sexo}', '${req.body.tipoUsuario}')`)
    
    if (respuesta.rowsAffected === 1) {

        pkg.createTestAccount((err, account)=>{
            const htmlMail = `<div style="width: 100%; background-color: rgb(109, 109, 109); border-radius: 20px; border: 1px solid black; text-align: center; color: aliceblue;">
                                <h1>Registro de ${req.body.tipoUsuario} ${req.body.nombre} ${req.body.apellido} exitoso.</h1>
                            </div>`;
            const transporter = pkg.createTransport({
                host:'smtp.gmail.com',
                port: '465',
                secure: true,
                auth: {
                    user:'jeasson.js@gmail.com',
                    pass: 'dcmflxjqfjfykozj'
                }
            });
            const mailOptions = {
                from:'jeasson.js@gmail.com',
                to: req.body.correo,
                replyTo: 'jeasson.js@gmail.com',
                subject: 'Mensaje de registro',
                text: 'hola',
                html: htmlMail
            };
            transporter.sendMail(mailOptions, (err, info)=>{
                if (err) {
                    return console.log(err);
                }
                console.log('Mensaje enviado', info.mensaje);
                console.log('url del mensaje', pkg.getTestMessageUrl(info));
            })
        })

    }

    // indica si se creo el usuario
    res.json(respuesta.rowsAffected)
});

router.put('/usuario', (req, res)=>res.send('Actualizando usuarios'));

router.delete('/usuario', (req, res)=>res.send('Eliminando usuarios'));

export default router;