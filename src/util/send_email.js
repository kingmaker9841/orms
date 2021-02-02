const { emailTransporter: transporter } = require('../config/email_transport');

module.exports.sendMessage = async (email) => {
    // ████████╗ ██████╗ ██████╗  ██████╗ 
    // ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
    //    ██║   ██║   ██║██║  ██║██║   ██║
    //    ██║   ██║   ██║██║  ██║██║   ██║
    //    ██║   ╚██████╔╝██████╔╝╚██████╔╝
    //    ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 
    transporter.sendMail({
        from: '"General Technology " <info@generaltechnology.com.np>', // sender address
        ...email,
    }).then(info => {
        console.log("=================================================");
        console.log(info.envelope, email.subject);
        console.log("Rejected: ", info.rejected);
    });
}