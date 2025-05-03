/**
 * Converts a hex color string to rgba format with specified opacity
 * @param hexColor - Hex color string (e.g. "#C45526" or "#fff")
 * @param opacity - Opacity value between 0 and 1
 * @returns RGBA color string (e.g. "rgba(196, 85, 38, 0.05)")
 */
export const getHexWithOpacity = (hexColor: string, opacity: number): string => {
  // Ensure the opacity is within valid range
  const validOpacity = Math.max(0, Math.min(1, opacity));
  
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Handle both 3-digit and 6-digit hex formats
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
}; 