export default {
  routes: [
    {
      method: "GET",
      path: "/articles/by-slug/:slug",
      handler: "articles.findBySlug",
    },
    {
      method: "GET",
      path: "/articles/get-all/articles",
      handler: "articles.findAllBlogs",
    },
    {
      method: "GET",
      path: "/articles/get-all-slugs/articles",
      handler: "articles.getAllSlugs",
    },
  ],
};
