// The loading snippet adds a UA object to the global scope. This object provides promise-like then and catch functions. They can be called as many times as you'd like and can be chained like promises.
// UA.then(cb) Takes a callback function that is called with sdk as its only argument. It is only called if the SDK loads successfully and the browser supports all features. All other features of the SDK can be used from here.
// UA.catch(cb) Takes a callback function that is called with the error object as its only argument. It is only called if the SDK encounters an error while loading or the browser is unsupported.
// UA.then will only be called when the SDK has been loaded and if the browser supports the SDK's features. Do not rely on it being called in every browser. Because of this it is good practice to not enable UA SDK-specific parts of your UI until the SDK has loaded.
// Unsupported browsers will call .catch(), which likewise will only be called if loading the SDK has an error.UA Object

UA.then(function(sdk) {
  console.log(sdk.channel.id)
}).catch(function(err) {
  console.log(err)
});

// Multiple calls have no additional expense.
UA.then(function(sdk) {
  $('#register').show()
  $('#register').click(function(ev) { sdk.register() })
});

