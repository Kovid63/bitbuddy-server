const mongoose = require('mongoose');
const os = require('os');

function healthCheckHandler(req, res) {
    try {
        const databaseStateMessage = mongoose.connection.readyState === 1 ? 'connected' : 'error';
        const currentTime = new Date();
        const memoryUsage = process.memoryUsage();
        const uptimeInSeconds = os.uptime();

        // Calculate hours, minutes, and seconds
        const days = Math.floor(uptimeInSeconds / (3600 * 24));
        const hours = Math.floor(uptimeInSeconds / 3600);
        const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeInSeconds % 60);
        
        res.status(200).json(
            {
                status: 'success',
                message: 'Server is healthy',
                data: {
                    uptime: `${days} days ${hours} hours`,
                    database: databaseStateMessage,
                    currentTime: currentTime.toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'long' }),
                    responseTime: process.hrtime(),
                    memoryUsage: {
                        rss: `${((memoryUsage.rss) / (1024 * 1024)).toFixed(0)}MB`,
                        heapTotal: `${((memoryUsage.heapTotal) / (1024 * 1024)).toFixed(0)}MB`,
                        heapUsage: `${((memoryUsage.heapUsed) / (1024 * 1024)).toFixed(0)}MB`,
                    }
                }
            }
        );
    } catch (error) {
        res.status(503).json(
            {
                status: 'error',
                message: error.message
            }
        );
    }


}

module.exports = { healthCheckHandler }