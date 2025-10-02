// RTL Utility Functions

/**
 * Get the appropriate CSS class for RTL/LTR direction
 */
export const getDirectionClass = (
  isRTL: boolean,
  ltrClass: string,
  rtlClass: string
): string => {
  return isRTL ? rtlClass : ltrClass;
};

/**
 * Get margin/padding classes that are direction-aware
 */
export const getSpacingClass = (
  isRTL: boolean,
  property: 'margin' | 'padding',
  side: 'left' | 'right',
  value: string
): string => {
  const actualSide = isRTL ? (side === 'left' ? 'right' : 'left') : side;
  const prefix = property === 'margin' ? 'm' : 'p';
  const sidePrefix = actualSide === 'left' ? 'l' : 'r';
  return `${prefix}${sidePrefix}-${value}`;
};

/**
 * Get text alignment class that is direction-aware
 */
export const getTextAlignClass = (
  isRTL: boolean,
  align: 'left' | 'right' | 'center'
): string => {
  if (align === 'center') return 'text-center';

  const actualAlign = isRTL ? (align === 'left' ? 'right' : 'left') : align;
  return `text-${actualAlign}`;
};

/**
 * Get flex direction class that is direction-aware
 */
export const getFlexDirectionClass = (
  isRTL: boolean,
  direction: 'row' | 'row-reverse'
): string => {
  if (direction === 'row-reverse') {
    return isRTL ? 'flex-row' : 'flex-row-reverse';
  }
  return isRTL ? 'flex-row-reverse' : 'flex-row';
};

/**
 * Get transform class for RTL-aware positioning
 */
export const getTransformClass = (
  isRTL: boolean,
  transform: string
): string => {
  if (!isRTL) return transform;

  // Mirror translateX values
  return transform.replace(
    /translateX\((-?\d+(?:\.\d+)?(?:px|rem|em|%))\)/g,
    (match, value) => {
      const numericValue = parseFloat(value);
      const unit = value.replace(/^-?\d+(?:\.\d+)?/, '');
      return `translateX(${-numericValue}${unit})`;
    }
  );
};

/**
 * Get position classes that are direction-aware
 */
export const getPositionClass = (
  isRTL: boolean,
  side: 'left' | 'right',
  value: string
): string => {
  const actualSide = isRTL ? (side === 'left' ? 'right' : 'left') : side;
  return `${actualSide}-${value}`;
};

/**
 * Get border radius classes that are direction-aware
 */
export const getBorderRadiusClass = (
  isRTL: boolean,
  corner: 'tl' | 'tr' | 'bl' | 'br',
  value: string
): string => {
  let actualCorner = corner;

  if (isRTL) {
    switch (corner) {
      case 'tl':
        actualCorner = 'tr';
        break;
      case 'tr':
        actualCorner = 'tl';
        break;
      case 'bl':
        actualCorner = 'br';
        break;
      case 'br':
        actualCorner = 'bl';
        break;
    }
  }

  return `rounded-${actualCorner}-${value}`;
};

/**
 * Get animation direction for RTL-aware animations
 */
export const getAnimationDirection = (
  isRTL: boolean,
  direction: 'left' | 'right'
): 'left' | 'right' => {
  return isRTL ? (direction === 'left' ? 'right' : 'left') : direction;
};

/**
 * Utility to conditionally apply RTL styles
 */
export const rtlClass = (
  isRTL: boolean,
  rtlClasses: string,
  ltrClasses: string = ''
): string => {
  return isRTL ? rtlClasses : ltrClasses;
};

/**
 * Get icon rotation class for RTL (useful for arrows, chevrons)
 */
export const getIconRotationClass = (isRTL: boolean): string => {
  return isRTL ? 'scale-x-[-1]' : '';
};

/**
 * CSS-in-JS style object for RTL-aware positioning
 */
export const getRTLStyle = (
  isRTL: boolean,
  ltrStyle: React.CSSProperties,
  rtlStyle: React.CSSProperties
): React.CSSProperties => {
  return isRTL ? rtlStyle : ltrStyle;
};

/**
 * Get grid template columns that work well with RTL
 */
export const getGridClass = (columns: number): string => {
  return `grid-cols-${columns}`;
};

/**
 * Utility for RTL-aware CSS custom properties
 */
export const getRTLCustomProperties = (isRTL: boolean) => ({
  '--direction': isRTL ? 'rtl' : 'ltr',
  '--text-align-start': isRTL ? 'right' : 'left',
  '--text-align-end': isRTL ? 'left' : 'right',
  '--margin-start': isRTL ? 'margin-right' : 'margin-left',
  '--margin-end': isRTL ? 'margin-left' : 'margin-right',
  '--padding-start': isRTL ? 'padding-right' : 'padding-left',
  '--padding-end': isRTL ? 'padding-left' : 'padding-right',
  '--border-start': isRTL ? 'border-right' : 'border-left',
  '--border-end': isRTL ? 'border-left' : 'border-right',
  '--left': isRTL ? 'right' : 'left',
  '--right': isRTL ? 'left' : 'right',
});

/**
 * Check if a language code represents an RTL language
 */
export const isRTLLanguage = (languageCode: string): boolean => {
  const rtlLanguages = [
    'ar', // Arabic
    'he', // Hebrew
    'fa', // Persian/Farsi
    'ur', // Urdu
    'ku', // Kurdish
    'ps', // Pashto
    'sd', // Sindhi
    'ug', // Uyghur
    'yi', // Yiddish
    'ji', // Yiddish (alternative code)
    'iw', // Hebrew (alternative code)
    'dv', // Dhivehi/Maldivian
  ];

  const langCode = languageCode.toLowerCase().split('-')[0];
  return rtlLanguages.includes(langCode);
};
