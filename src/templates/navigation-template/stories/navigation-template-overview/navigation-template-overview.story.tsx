import type { Meta, StoryObj } from "@storybook/react-vite";
import { YStack, View, Text } from "tamagui";
import { NavigationTemplate } from "../../navigation-template";
import { NavigationBar } from "../../../../organisms/navigation-bar";
import { SectionLabel } from "../../../../storybook";

const navDestinations = [
  { icon: "home-outline", activeIcon: "home", label: "Home" },
  { icon: "wallet-outline", activeIcon: "wallet", label: "Accounts" },
  { icon: "time-outline", activeIcon: "time", label: "History" },
];

function Overview() {
  return (
    <YStack gap={32} padding={16}>
      <YStack gap={8}>
        <SectionLabel label="Content + NavigationBar" />
        <View
          height={420}
          borderWidth={1}
          borderColor="#E0E0E0"
          borderRadius={12}
          overflow="hidden"
        >
          <NavigationTemplate
            navBar={
              <NavigationBar destinations={navDestinations} activeIndex={0} />
            }
          >
            <View flex={1} padding={24} justifyContent="center" alignItems="center">
              <Text fontSize={16} color="#49454F">
                Screen Content
              </Text>
            </View>
          </NavigationTemplate>
        </View>
      </YStack>

      <YStack gap={8}>
        <SectionLabel label="Content only (no nav bar)" />
        <View
          height={300}
          borderWidth={1}
          borderColor="#E0E0E0"
          borderRadius={12}
          overflow="hidden"
        >
          <NavigationTemplate>
            <View flex={1} padding={24} justifyContent="center" alignItems="center">
              <Text fontSize={16} color="#49454F">
                Full bleed screen
              </Text>
            </View>
          </NavigationTemplate>
        </View>
      </YStack>
    </YStack>
  );
}

const meta: Meta = {
  title: "templates/navigation-template/overview",
  component: Overview,
  tags: ["autodocs", "!dev"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/HaGgCBIkDbJ2jVZp0dUFR0/templates?node-id=10-8",
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
