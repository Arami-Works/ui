/** MD3 Slider type: continuous or discrete (with tick marks) */
export type SliderType = "continuous" | "discrete";

export type SliderProps = {
  /** Slider type. Default: "continuous" */
  type?: SliderType;
  /** Current value */
  value?: number;
  /** Minimum value. Default: 0 */
  min?: number;
  /** Maximum value. Default: 100 */
  max?: number;
  /** Step size (discrete only). Default: 1 */
  step?: number;
  /** Show value label above thumb. Default: false */
  showLabel?: boolean;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Accessibility label */
  accessibilityLabel?: string;
  testID?: string;
};
