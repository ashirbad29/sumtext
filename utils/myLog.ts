export const myLog = (...props: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...props);
  }
};
