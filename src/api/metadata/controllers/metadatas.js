// import { factories } from "@strapi/strapi";

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  "api::metadata.metadata",
  ({ strapi }) => ({
    async findByPage(ctx) {
      const { page } = ctx.params;

      const entries = await strapi.entityService.findMany(
        "api::metadata.metadata",
        {
          filters: { page },
        }
      );

      if (!entries || entries.length === 0) {
        return ctx.notFound("Metadata not found");
      }

      const metadata = entries[0];

      ctx.body = metadata;
    },
  })
);
