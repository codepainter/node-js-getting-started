const log = require('debug')('callback:express')

module.exports = function makeExpressAdapter ({ apiVersion = 'service-f0.0.0' }) {
    log('apiVersion:', apiVersion)

    return Object.freeze({
        callback
    })

    function callback (controller) {
        return async function expressController (request, response) {
            try {
                const httpRequest = {
                    user: request.user,
                    query: request.query,
                    body: request.body,
                    files: request.files,
                    params: request.params,
                    headers: request.headers,
                    id: request.id,
                    log: request.log,
                    ip: request.ip,
                    ips: request.ips,
                    hostname: request.hostname
                }
                log('httpRequest:', httpRequest)
                const httpResponse = await controller(httpRequest)
                log('httpResponse:', httpResponse)
                if (httpResponse.statusCode !== 200) {
                    return response.status(httpResponse.statusCode).send(httpResponse.body)
                }
                return response.status(200).send(httpResponse.body)
            } catch (error) {
                log('error:', error)
                return response.status(500).send('ouch, somethings wrong')
            }
        }
    }
}
