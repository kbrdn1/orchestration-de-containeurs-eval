export const formatTitle = (str: string): string => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const formatBrandCollectionModel = (str: string): string => {
  return decodeURIComponent(str.trim()).replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
