/**
 * @param {number | undefined} total sum of all items *
 * @param {'BRL'|'USD'} currency formats the return string
 * @returns {string}
 */
export const currency = (total: number | undefined, format: 'BRL' | 'USD') => {
  if (total) {
    return total.toLocaleString(format === 'BRL' ? 'pt-BR' : 'en-US', {
      currency: format,
      minimumFractionDigits: 2,
      style: 'currency',
    });
  }
  return '';
};

/**
 * @param {number | undefined} total sum of all items *
 * @param {'BRL'|'USD'} currency formats the return string
 * @returns {string}
 */
export const formatCurrency = (
  amount: number | undefined,
  local: 'USD' | 'BRL',
  digits?: number,
) => {
  if (amount !== undefined) {
    if (local === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: digits || 2,
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: digits || 2,
      maximumFractionDigits: digits || 2,
    }).format(amount);
  }
  return '';
};
