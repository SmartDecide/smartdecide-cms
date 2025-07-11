export default {
  routes: [
    {
      method: "GET",
      path: "/metadatas/:page",
      handler: "metadatas.findByPage",
    },
  ],
};
