import type { Meta, StoryObj } from "@storybook/react-vite";
import { YStack, View, Text } from "tamagui";
import { AppBarTemplate } from "../../app-bar-template";
import { TopAppBar } from "../../../../organisms/top-app-bar";
import { SectionLabel } from "../../../../storybook";

function Overview() {
  return (
    <YStack gap={32} padding={16}>
      <YStack gap={8}>
        <SectionLabel label="TopAppBar + Content" />
        <View
          height={360}
          borderWidth={1}
          borderColor="#E0E0E0"
          borderRadius={12}
          overflow="hidden"
        >
          <AppBarTemplate topBar={<TopAppBar type="small" title="대시보드" />}>
            <View
              flex={1}
              padding={24}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={16} color="#49454F">
                Screen Content
              </Text>
            </View>
          </AppBarTemplate>
        </View>
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="With nav icon" />
        <View
          height={360}
          borderWidth={1}
          borderColor="#E0E0E0"
          borderRadius={12}
          overflow="hidden"
        >
          <AppBarTemplate
            topBar={
              <TopAppBar
                type="small"
                title="Detail"
                navigationIcon="arrow-back"
              />
            }
          >
            <View
              flex={1}
              padding={24}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={16} color="#49454F">
                Detail screen
              </Text>
            </View>
          </AppBarTemplate>
        </View>
      </YStack>
    </YStack>
  );
}

const meta: Meta = {
  title: "templates/app-bar-template/overview",
  component: Overview,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/HaGgCBIkDbJ2jVZp0dUFR0/templates?node-id=10-15",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
