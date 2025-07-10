// module.exports = () => ({});

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-azure-sa",
      providerOptions: {
        account: env("AZURE_STORAGE_ACCOUNT"),
        accountKey: env("AZURE_STORAGE_ACCOUNT_KEY"),
        containerName: env("AZURE_STORAGE_CONTAINER_NAME"),
        defaultPath: env("AZURE_BLOG_MEDIA_PATH", "uploads"),
      },
    },
  },
});
