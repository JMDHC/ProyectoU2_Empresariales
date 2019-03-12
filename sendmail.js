var mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/Alumnos');
var Alumno = mongoose.model('Alumnos', schema, 'alumnos');

Alumno.find({}, (error, data)=>{
	if(error){
		console.log(error);
		process.exit(1);
	}
	data.forEach(i=>{
 		main(i).catch(console.error);
	});
});

async function main(datos){

  	var transporter = nodemailer.createTransport({
	 service: 'gmail',
	 auth: {
	        user: 'PONER CORREO QUE ENVIARÁ AQUI', //<=====================DATOS IMPORTANTES=========
	        pass: 'CONTRASEÑA DEL CORREO'
	    }
	});

	var html = '<!DOCTYPE html>\
				<html>\
				<head>\
				  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\
				  <meta name="viewport" content="width=device-width, initial-scale=1">\
				  <title>Single Column</title>\
				  <style type="text/css">\
					body {\
					  margin: 0;\
					  padding: 0;\
					  -ms-text-size-adjust: 100%;\
					  -webkit-text-size-adjust: 100%;\
					}\
					table {\
					  border-spacing: 0;\
					}\
					table td {\
					  border-collapse: collapse;\
					}\
					.ExternalClass {\
					  width: 100%;\
					}\
					.ExternalClass,\
					.ExternalClass p,\
					.ExternalClass span,\
					.ExternalClass font,\
					.ExternalClass td,\
					.ExternalClass div {\
					  line-height: 100%;\
					}\
					.ReadMsgBody {\
					  width: 100%;\
					  background-color: #ebebeb;\
					}\
					table {\
					  mso-table-lspace: 0pt;\
					  mso-table-rspace: 0pt;\
					}\
					img {\
					  -ms-interpolation-mode: bicubic;\
					}\
					.yshortcuts a {\
					  border-bottom: none !important;\
					}\
					@media screen and (max-width: 599px) {\
					  .force-row,\
					  .container {\
					    width: 100% !important;\
					    max-width: 100% !important;\
					  }\
					}\
					@media screen and (max-width: 400px) {\
					  .container-padding {\
					    padding-left: 12px !important;\
					    padding-right: 12px !important;\
					  }\
					}\
					.ios-footer a {\
					  color: #aaaaaa !important;\
					  text-decoration: underline;\
					}\
					a[href^="x-apple-data-detectors:"],\
					a[x-apple-data-detectors] {\
					  color: inherit !important;\
					  text-decoration: none !important;\
					  font-size: inherit !important;\
					  font-family: inherit !important;\
					  font-weight: inherit !important;\
					  line-height: inherit !important;\
					}\
				</style>\
				</head>\
				<body style="margin:0; padding:0;" bgcolor="#F0F0F0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">\
				<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#F0F0F0">\
				  <tr>\
				    <td align="center" valign="top" bgcolor="#F0F0F0" style="background-color: #F0F0F0;">\
				      <br>\
				      <table border="0" width="600" cellpadding="0" cellspacing="0" class="container" style="width:600px;max-width:600px">\
				        <tr>\
				          <td class="container-padding header">\
				            <a href="http://www.tepic.tecnm.mx/"><img src="http://www.tepic.tecnm.mx/images/header_new.jpg" style="width: 100%"></a>\
				          </td>\
				        </tr>\
				        <tr>\
				          <td class="container-padding content" align="left" style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;background-color:#ffffff">\
				            <br>\
							<div class="title" style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;color:#374550">Jornada Académica de Computación 2019</div>\
							<br>\
							<div class="body-text" style="font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:justify;color:#333333">\
							  Recibe un cordial saludo <strong>'+datos.name+'</strong> \
							  <br><br>\
							  Te remitimos información correspondiente a la Jornada Académica de Computación 2019.\
							  <br><br>\
							  El pago deberá realizarse en el Departamento de Recursos Financieros, y entregar el recibo correspondiente en el Departamento de Sistemas y Computación.\
							  <br>\
							</div>\
							<div style="width: 30%; margin: auto;">\
								<img src="https://chart.googleapis.com/chart?cht=qr&chl='+datos._id+'&chs=180x180&choe=UTF-8&chld=L|2">\
							</div>\
				          </td>\
				        </tr>\
				        <tr>\
				          <td class="container-padding footer-text" align="center" style="font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;color:#aaaaaa;padding-left:24px;padding-right:24px">\
				            <br><br>\
				            Correo enviado automáticamente\
				            <br><br>\
				            <strong>Instituto Tecnológico de Tepic</strong><br>\
				            <span class="ios-footer">\
				              Av. Tecnológico 2595<br>\
				              Tepic, Nayarit, México<br>\
				            </span>\
				            <a href="http://www.tepic.tecnm.mx/" style="color:#aaaaaa">www.tepic.tecnm.mx</a><br>\
				            <br><br>\
				          </td>\
				        </tr>\
				      </table>\
				    </td>\
				  </tr>\
				</table>\
				</body>\
				</html>';

  let mailOptions = {
    from: '"Juan Manuel Del Hoyo 👻" <jumadelhoyoce@ittepic.edu.mx>', // sender address
    to: datos.email,
    subject: "Invitación ✔",
    html: html
  };

  let info = await transporter.sendMail(mailOptions)
  console.log("Mensaje enviado a: %s", datos.name);
}