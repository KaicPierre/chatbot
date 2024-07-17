import { WebhookClient } from "dialogflow-fulfillment";
import Fastify from "fastify";
const fastify = Fastify({
    logger: true
  })


async function bootsrap () {
  fastify.get('/healthcheck', function (request, reply) {
    reply.send({isHealthy: true})    
})

  fastify.post('/dialogflow', function (request, reply) {
    const agent = new WebhookClient({request: request, response: reply});

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

  const PORT = process.env.PORT || 3000;

  fastify.listen({ port: PORT as number, host: "0.0.0.0"}, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`Our app is running on port ${ PORT }`)
  })
}

bootsrap()