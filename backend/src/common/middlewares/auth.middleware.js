/** @import {Request, Response, NextFunction} from '../lib/types'; */

const cache = require("../utils/cache");
const { prisma } = require("../database/prisma");
const CustomError = require("../utils/CustomError");
const { defineAbilityFor } = require("../utils/ability");
const { getUserAgent } = require("../utils/userAgent.util");

/**
 * Middleware de autenticação e definição de habilidades.
 *
 * @param {Request} req - Objeto da requisição
 * @param {Response} res - Objeto da resposta
 * @param {NextFunction} next - Função para chamar o próximo middleware
 */
const AuthGuard = async (req, res, next) => {
  if (!req.session?.userId) throw new CustomError("Acesso negado!", 401);
  const start = process.hrtime.bigint();

  if (!cache.get("roles")) {
    const roles = await prisma.role.findMany({
      include: { permissions: { include: { permission: true } } },
    });
    cache.set("roles", roles);
    console.log("Caching roles...");
  }

  const cachedRoles = cache.get("roles");
  const user = { id: req.session.userId, roles: req.session.roles };

  req.userId = user.id;
  req.ability = defineAbilityFor(user, cachedRoles);

  const stats = cache.getStats();
  const size = stats.keys * stats.ksize * stats.vsize;
  console.log(`Cache size: ${size} bytes`);

  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const ua = getUserAgent(userAgent);

  if (ua.browser !== req.session.browser) {
    console.error("❌ Context not match.");
    throw new CustomError("Acesso negado!", 401);
  }

  const end = process.hrtime.bigint();
  const durationInSeconds = Number(end - start) / 1e9;
  console.log(`⌚ Request Time: ${durationInSeconds.toFixed(3)}s`);

  next();
};

module.exports = { AuthGuard };
