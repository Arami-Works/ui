import type { ComponentProps } from "react";
import type { ReactNode } from "react";
import type { ScrollView, StyleProp, ViewStyle } from "react-native";

export type ListTemplateProps = {
  /** Typically a TopAppBar */
  topBar?: ReactNode;
  /** SearchBar, filter row, or other header content below the top bar */
  headerContent?: ReactNode;
  /** Scrollable list content */
  children?: ReactNode;
  /** Typically a NavigationBar */
  bottomBar?: ReactNode;
  /** Floating action button(s) positioned bottom-right */
  fab?: ReactNode;
  /** RefreshControl element forwarded to the internal ScrollView */
  refreshControl?: ComponentProps<typeof ScrollView>["refreshControl"];
  /** Additional styles merged into the ScrollView's contentContainerStyle */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Whether to show the vertical scroll indicator. Default: false */
  showsVerticalScrollIndicator?: boolean;
  testID?: string;
};
