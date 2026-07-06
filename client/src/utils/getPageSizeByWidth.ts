export const getPageSizeByWidth = (width: number): number => {
  if (width >= 2560) return 15;
  if (width >= 1920) return 12;
  return 7;
};
