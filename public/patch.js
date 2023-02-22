// First rename original fetch function
window.originalFetch = window.fetch

// Then override fetch function with your new function
window.fetch = async (... args) => {
    // call the renamed fetch function
    const result = await window.originalFetch(...args);
    return result;
}

console.log("Utube_it extension successfully installed.");
