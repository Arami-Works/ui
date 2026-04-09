import type { ReactNode } from "react";
import type { IconName } from "../../atoms/icon";

export type AccordionItemProps = {
  /** Header text */
  title: string;
  /** Subtitle text */
  supportingText?: string;
  /** Controlled expand state */
  expanded?: boolean;
  /** Uncontrolled default expand state */
  defaultExpanded?: boolean;
  /** Expand/collapse callback */
  onToggle?: (expanded: boolean) => void;
  /** Optional leading icon */
  leadingIcon?: IconName;
  /** Collapsible content */
  children: ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  testID?: string;
};

export type AccordionProps = {
  /** AccordionItem children */
  children: ReactNode;
  testID?: string;
};
