// import { factories } from "@strapi/strapi";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const entries = await strapi.entityService.findMany(
      "api::article.article",
      {
        filters: { slug },
        populate: ["cover", "author", "category", "blocks"],
      }
    ); 

    if (!entries || entries.length === 0) {
      return ctx.notFound("Blog not found");
    }

    const blog = entries[0];

    ctx.body = blog;
  },
  async findAllBlogs(ctx) {
    const { page = 1, pageSize = 10 } = ctx.query;

    const limit = Number(pageSize);
    const start = (Number(page) - 1) * limit;

    const entries = await strapi.entityService.findMany(
      "api::article.article",
      {
        populate: ["cover"],
        fields: ["title", "slug"], // optional optimization
        start,
        limit,
      }
    );

    // Second: Count total blogs
    const total = await strapi.entityService.count("api::article.article");

    const blogs = entries.map((blog) => {
      return {
        id: blog?.id,
        title: blog?.title,
        slug: blog?.slug,
        cover: {
          url: blog?.cover?.url,
          alt: blog?.cover?.alternativeText,
          caption: blog?.cover?.caption,
        },
      };
    });

    ctx.body = {
      data: blogs,
      pagination: {
        page: Number(page),
        pageSize: limit,
        total,
        pageCount: Math.ceil(total / limit),
      },
    };
  },
  async getAllSlugs(ctx) {
    const slugs = await strapi.entityService.findMany("api::article.article", {
      fields: ["slug"],
    });
    ctx.body = slugs;
  },
}));
