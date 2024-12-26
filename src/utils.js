const isValidURL = (link, domain) => {
  try {
    const parsedURL = new URL(link, domain);
    return parsedURL.hostname.includes(new URL(domain).hostname);
  } catch {
    return false;
  }
};

export default isValidURL;
