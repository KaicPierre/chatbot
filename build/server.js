"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_dialogflow_fulfillment = require("dialogflow-fulfillment");
var fastify = (0, import_fastify.default)({
  logger: true
});
fastify.post("/", function(request, reply) {
  const agent = new import_dialogflow_fulfillment.WebhookClient({
    request,
    response: reply
  });
  reply.send({
    hello: "world"
  });
  function welcome(agent2) {
    agent2.add("Ol\xE1, seja muito bem vindo!");
  }
  __name(welcome, "welcome");
  function fallback(agent2) {
    agent2.add("N\xE3o entendi o que voc\xEA precisa");
  }
  __name(fallback, "fallback");
  let intentMap = /* @__PURE__ */ new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});
fastify.listen({
  port: 3e3
}, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
