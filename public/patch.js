// First rename original fetch function
window.originalFetch = window.fetch;

const client_api = "http://127.0.0.1:30000?";

function notifyClient(hostname) {
  window
    .originalFetch(
      client_api +
        new URLSearchParams({
          domain: hostname,
        })
    )
    .catch(console.error);
}

// Then override fetch function with your new function
window.fetch = (...args) => {
  console.log(...args);

  if (args.length && args[0].constructor.name === "Request") {
    notifyClient(new URL(args[0].url).hostname);
  }

  // call the renamed fetch function
  return window.originalFetch(...args);
};

console.log("Utube_it extension successfully installed.");
