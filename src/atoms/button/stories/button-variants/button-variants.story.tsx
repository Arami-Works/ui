import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button/Variants",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "text", "elevated", "tonal"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    children: "Filled Button",
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    children: "Text Button",
    variant: "text",
  },
};

export const Elevated: Story = {
  args: {
    children: "Elevated Button",
    variant: "elevated",
  },
};

export const Tonal: Story = {
  args: {
    children: "Tonal Button",
    variant: "tonal",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "filled",
    disabled: true,
  },
};
