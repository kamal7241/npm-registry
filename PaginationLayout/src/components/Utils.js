export const serializeNonQueryParams = (params = {}) => {
  const query = [];

  Object.keys(params).forEach(key => {
    if(params[key]) {
      query.push(`${key}=${params[key]}`)
    }
  });

  return query ? `?${query.join('&')}` : query
}