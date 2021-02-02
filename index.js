const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const process = require("process");
const logger = require("./src/config/logger");
const helmet = require('helmet');
const compression = require('compression');

app.use(cors({
  origin: 'http://localhost:3001', // Use Bank IP address on Production
  optionsSuccessStatus: 200
}));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use(require("./src/config/middleware"));
app.use(require("./src/config/setup"));
app.use(require("./src/config/test-email"));

app.use((req,res,next)=> {
  console.log("URL", req.url);
  next();
})

const requestTime = (req,res,next)=> {
  req.requestTime = Date.now();
  next();
}
app.use(requestTime);

/**
 *
 * ██╗   ██╗███████╗███████╗██████╗     ███╗   ███╗ ██████╗ ███╗   ███╗████████╗
 * ██║   ██║██╔════╝██╔════╝██╔══██╗    ████╗ ████║██╔════╝ ████╗ ████║╚══██╔══╝
 * ██║   ██║███████╗█████╗  ██████╔╝    ██╔████╔██║██║  ███╗██╔████╔██║   ██║
 * ██║   ██║╚════██║██╔══╝  ██╔══██╗    ██║╚██╔╝██║██║   ██║██║╚██╔╝██║   ██║
 * ╚██████╔╝███████║███████╗██║  ██║    ██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║   ██║
 *  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝   ╚═╝
 *
 */
// app.use(passport.initialize());
// app.use(passport.session());
app.use("/api", require("./src/user-management"));
/******************************************************************************************************************** */

app.use("/api", require("./src/misc"));
/******************************************************************************************************************** */

app.use("/api", require("./src/risk-rule-setup"));
/******************************************************************************************************************** */

app.use("/api", require("./src/risk-management"));
/******************************************************************************************************************** */

app.use("/api", require("./src/reporting"));
/******************************************************************************************************************** */

app.use("/api", require("./src/form-management"));
/******************************************************************************************************************** */
/**
 *
 *     ███████╗ ██████╗██╗  ██╗███████╗██████╗ ██╗   ██╗██╗     ███████╗██████╗
 *     ██╔════╝██╔════╝██║  ██║██╔════╝██╔══██╗██║   ██║██║     ██╔════╝██╔══██╗
 *     ███████╗██║     ███████║█████╗  ██║  ██║██║   ██║██║     █████╗  ██████╔╝
 *     ╚════██║██║     ██╔══██║██╔══╝  ██║  ██║██║   ██║██║     ██╔══╝  ██╔══██╗
 *     ███████║╚██████╗██║  ██║███████╗██████╔╝╚██████╔╝███████╗███████╗██║  ██║
 *     ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
 *
 */
require("./src/config/scheduler");
/******************************************************************************************************************** */
const PORT = process.env.PORT || 8181;

app.use("/api/reports", express.static("reports"));
// Documentation Route
app.use("/", express.static("public"));
app.use("/docs", express.static("docs"));
// ERROR HANDLING
process.on("uncaughtException", err => {
  logger.error(err);
});

app.listen(PORT, () => console.log("Listening on PORT " + PORT));
