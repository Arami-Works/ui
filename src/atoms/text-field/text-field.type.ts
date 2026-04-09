import type { TextInputProps } from "react-native";

/** MD3 TextField variants */
export type TextFieldVariant = "filled" | "outlined";

export type TextFieldProps = {
  /** TextField variant. Default: "filled" */
  variant?: TextFieldVariant;
  /** Label text (floats above on focus) */
  label?: string;
  /** Current text value */
  value?: string;
  /** Placeholder text (shown when no label and empty) */
  placeholder?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error text (replaces helper text, enables error styling) */
  errorText?: string;
  /** Whether field is in error state */
  error?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Leading icon name (Material Icons) */
  leadingIcon?: string;
  /** Trailing icon name (Material Icons) */
  trailingIcon?: string;
  /** Callback when trailing icon pressed */
  onTrailingIconPress?: () => void;
  /** Max character count (shown bottom-right) */
  maxLength?: number;
  /** Callback when text changes */
  onChangeText?: (text: string) => void;
  /** Callback when focused */
  onFocus?: () => void;
  /** Callback when blurred */
  onBlur?: () => void;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint describing the result of interacting with the text field */
  accessibilityHint?: string;
  testID?: string;
} & Pick<
  TextInputProps,
  "keyboardType" | "autoCapitalize" | "secureTextEntry" | "multiline"
>;
