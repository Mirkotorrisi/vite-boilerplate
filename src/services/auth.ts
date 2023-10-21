export const fakeAuth = async () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });
