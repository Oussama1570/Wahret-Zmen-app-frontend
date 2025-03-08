function getImgUrl(name) {
    // Check if the provided name is a full URL (external image)
    if (name.startsWith("http") || name.startsWith("https")) {
        return name; // Return the external URL directly
    }

    // Otherwise, assume it's a local asset in the project
    return new URL(`../assets/products/${name}`, import.meta.url).href;
}

export { getImgUrl };
