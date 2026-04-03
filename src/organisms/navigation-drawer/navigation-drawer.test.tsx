import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TamaguiProvider } from "tamagui";
import config from "../../../tamagui.config";
import { NavigationDrawer } from "./navigation-drawer";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

const sections = [
  {
    header: "Main",
    destinations: [
      { key: "home", icon: "home", label: "Home" },
      { key: "search", icon: "search", label: "Search", badgeCount: 3 },
    ],
  },
  {
    destinations: [
      { key: "settings", icon: "settings", label: "Settings" },
    ],
  },
];

describe("NavigationDrawer", () => {
  it("renders when open", () => {
    const { getByTestId } = render(
      <NavigationDrawer open onClose={jest.fn()} sections={sections} testID="drawer" />,
      { wrapper }
    );
    expect(getByTestId("drawer")).toBeTruthy();
  });

  it("calls onDestinationPress when destination pressed", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sections}
        onDestinationPress={onPress}
        testID="drawer"
      />,
      { wrapper }
    );
    fireEvent.press(getByTestId("drawer-dest-home"));
    expect(onPress).toHaveBeenCalledWith("home");
  });

  it("highlights active destination", () => {
    const { getByTestId } = render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sections}
        activeKey="home"
        testID="drawer"
      />,
      { wrapper }
    );
    expect(getByTestId("drawer-dest-home")).toBeTruthy();
  });
});
