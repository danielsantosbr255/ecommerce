/**
 * @typedef {import("express").Request & {
 *   session?: { userId?: string, roles?: string[], os?: string, browser?: string, device?: string, location?: string },
 *   userId?: string,
 *   ability?: import("@casl/ability").AbilityBuilder
 * }} Request
 */

/**
 * @typedef {import("express").Response} Response
 */

/**
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @typedef {import("@prisma/client").Prisma} Prisma
 */

module.exports = {};
