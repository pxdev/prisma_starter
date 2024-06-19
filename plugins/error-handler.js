export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.log("Error handler", error, instance, info);
  };

  // Also possible
  nuxtApp.hook("vue:error", (error, instance, info) => {
    // handle error, e.g. report to a service
    console.log("Error handler", error, instance, info);
  });
});
