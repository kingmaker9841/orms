var path = require("path");
var winston = require("winston");
require("winston-daily-rotate-file");
var transport = new winston.transports.DailyRotateFile({
    filename: path.join("logs", "application-%DATE%.log"),
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
});
var logger = winston.createLogger({
    transports: [transport],
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp(),
    ),

});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
}
module.exports = logger;