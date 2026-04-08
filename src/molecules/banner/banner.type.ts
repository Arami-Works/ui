import type { IconName } from "../../atoms/icon";

export type BannerAction = {
  label: string;
  onPress: () => void;
};

export type BannerProps = {
  /** Primary message text */
  message: string;
  /** Additional detail text */
  supportingText?: string;
  /** Optional leading icon */
  icon?: IconName;
  /** Up to 2 action buttons */
  actions?: BannerAction[];
  /** Controls visibility (default true) */
  visible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  testID?: string;
};
