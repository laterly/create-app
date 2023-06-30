/**
 * 获取key
 */
export const getRouteKey = (path: string): string => {
  return path.split("/")[0];
};
