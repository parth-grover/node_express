const winston = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
let logDirectory = 'logs/'

//create directory if it is not present
if (!fs.existsSync(logDirectory)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDirectory);
}

let logger = winston.createLogger({
	format: winston.format.json(),
    format: winston.format.combine(
		winston.format.splat(),
		winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        //winston.format.align(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`; 
        })
    ),
	exitOnError: false,
	transports: [
		new (winston.transports.Console)({
			level: process.env.ENV === 'development' ? 'debug' : 'info',
			json: true,
			handleExceptions: true, 
			json: false,
			colorize: true
		}),
		new (winston.transports.DailyRotateFile)({
			level: process.env.ENV === 'development' ? 'debug' : 'warn',
			filename: logDirectory+'errors_%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '5m',
			maxFiles: '10d',
			// handleExceptions: true
		})
	],
	exceptionHandlers: [
		new (winston.transports.DailyRotateFile)({
			filename: 'logs/exceptions_%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			maxSize: '20m',
			maxFiles: '10d'
		})
	]
});

module.exports = logger;