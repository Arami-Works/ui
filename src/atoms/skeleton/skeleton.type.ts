import type { ViewStyle } from "react-native";

export type SkeletonProps = {
  /** Width of the skeleton placeholder */
  width?: number | string;
  /** Height of the skeleton placeholder */
  height?: number | string;
  /** Border radius. Use 9999 for pill/circle shapes. Default: 4 */
  borderRadius?: number;
  /** Additional styles */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
};
