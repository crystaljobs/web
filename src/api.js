let url = process.env.VUE_APP_API_SCHEME + '://' + process.env.VUE_APP_API_HOST
if (process.env.VUE_APP_API_PORT) url += ':' + process.env.VUE_APP_API_PORT
export { url }
