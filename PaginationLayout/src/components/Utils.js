export const serializeQueryParams = (params = {}) => {
  const query = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

  return query ? `?${query}` : query
}