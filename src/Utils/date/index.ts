/**
 * @param {number | undefined} date date in milleseconds
 * @returns {string} returns a date in the format 00/00/0000
 */
export const localDate = (date: number | undefined): string => {
  if (date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
  return '';
};

/**
 * @param {number | undefined} days date in milleseconds
 * @returns {number} returns a date in the format 00/00/0000
 */
export const todayPlus = (days: number): number => {
  const day = 1000 * 60 * 60 * 24;
  const now = new Date().setHours(0, 0, 0, 0);
  return now + day * days;
};

/**
 * @param {number | undefined} days date in milleseconds
 * @returns {number} returns a date in the format 00/00/0000
 */
export const todayMinus = (days: number): number => {
  const day = 1000 * 60 * 60 * 24;
  const now = new Date().setHours(0, 0, 0, 0);
  return now - day * days;
};

export const delay = (milliseconds: number) => {
  return new Promise((resolve: any) => {
    setTimeout(resolve, milliseconds);
  });
};

export const now = () => {
  return new Date().setHours(0, 0, 0, 0);
};

/**
 * @param {number | undefined} days date in milleseconds
 * @returns {number} returns a date in the format 00/00/0000
 */
export const dateParam = (date: Date): string => {
  const str = date.toISOString();
  const arr = str.substring(0, 10).split('-');
  return `${arr[1]}-${arr[2]}-${arr[0]}`;
};

/**
 * @param {number | undefined} days date in milleseconds
 * @returns {number} returns a date in the format 00/00/0000
 */
export const dateToLocal = (date: string): string => {
  const arr = date.substring(0, 10).split('-');
  return arr.reverse().join('/');
};
