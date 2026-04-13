import type { ComponentProps } from "react";
import type { ReactNode } from "react";
import type { ScrollView, StyleProp, ViewStyle } from "react-native";

export type DetailTemplateProps = {
  topBar?: ReactNode;
  children?: ReactNode;
  /** RefreshControl element forwarded to the internal ScrollView */
  refreshControl?: ComponentProps<typeof ScrollView>["refreshControl"];
  /** Additional styles merged into the ScrollView's contentContainerStyle */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Whether to show the vertical scroll indicator. Default: false */
  showsVerticalScrollIndicator?: boolean;
  testID?: string;
};
