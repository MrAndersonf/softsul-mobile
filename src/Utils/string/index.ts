/**
 * @param {string | undefined} text string to mesure
 * @param {number} size cut place
 * @returns {string} returns a date in the format 00/00/0000
 */
export const truncate = (text: string | undefined, size: number) => {
  if (text) {
    return text.length > size ? text.slice(0, size - 1) + '...' : text;
  }
  return '...';
};

/**
 * @param {string | undefined} text string to mesure
 * @returns {string} returns a date in the format 00/00/0000
 */
export const firstName = (text: string | undefined) => {
  if (text) {
    return text.length > 0 ? text.slice(0, text.indexOf(' ')) : text;
  }
  return '...';
};
