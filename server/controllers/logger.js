const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'logs', 'error.log');

const ensureLogDirectoryExists = () => {
    const logDir = path.dirname(logFilePath);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};

const logger = {
    error: async (message) => {
        try {
            ensureLogDirectoryExists();

            const logMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;
            
            await fs.promises.appendFile(logFilePath, logMessage);
        } catch (err) {
            console.error(`Erro ao escrever no arquivo de log: ${err.message}`);
        }
    }
};

module.exports = logger;