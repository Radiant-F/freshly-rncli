export default function useFormatIDR(price: number, withSuffix?: boolean) {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  };
  if (price >= 1000 && withSuffix) {
    const thousands = price / 1000;
    return `${thousands.toLocaleString('id-ID', options)}K`;
  } else return price.toLocaleString('id-ID', options);
}
