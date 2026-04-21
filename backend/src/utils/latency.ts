export const trackLatency = () => {
  const start = Date.now();
  return { end: () => Date.now() - start };
};