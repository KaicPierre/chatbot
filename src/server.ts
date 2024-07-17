import Fastify from "fastify";
import { WebhookClient } from "dialogflow-fulfillment"
const fastify = Fastify({
    logger: true
  })

  fastify.post('/', function (request, reply) {
    const agent = new WebhookClient({request: request, response: reply});
    reply.send({ hello: 'world' })

    function welcome (agent: WebhookClient) {
        agent.add("Olá, seja muito bem vindo!")
    }

    function fallback (agent: WebhookClient) {
        agent.add("Não entendi o que você precisa")
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
  })

  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })