export type SearchSuggestion = {
  label: string;
  icon?: string;
  onPress: () => void;
};

export type SearchVariant = "bar" | "fullScreen";

export type SearchProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  onBack?: () => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  onRecentSearchPress?: (query: string) => void;
  onClearRecent?: () => void;
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  /** Search display variant. "fullScreen" expands to fill the screen. Default: "bar" */
  variant?: SearchVariant;
  testID?: string;
};
