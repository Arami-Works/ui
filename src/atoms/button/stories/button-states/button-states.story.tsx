import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button/States",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "text", "elevated", "tonal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default State",
    variant: "filled",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled State",
    variant: "filled",
    disabled: true,
  },
};
