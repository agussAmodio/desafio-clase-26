const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerWarn: { type: "file", filename: "warn.log" },
    miLoggerError: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["miLoggerWarn", "miLoggerConsole"], level: "info" },
    consola: { appenders: ["miLoggerWarn", "miLoggerConsole"], level: "trace" },
    warning: { appenders: ["miLoggerWarn", "miLoggerConsole"], level: "warn" },
    error: { appenders: ["miLoggerError", "miLoggerConsole"], level: "error" },
  },
});

module.exports = log4js;
