import { Modal } from "react-native";
import { Text } from "react-native";
import { render, screen, fireEvent } from "@/test-utils";
import { NavigationDrawer } from "./navigation-drawer";

const sections = [
  {
    header: "Main",
    destinations: [
      { key: "home", icon: "home", label: "Home" },
      { key: "search", icon: "search", label: "Search", badgeCount: 3 },
    ],
  },
  {
    destinations: [{ key: "settings", icon: "settings", label: "Settings" }],
  },
];

describe("NavigationDrawer", () => {
  it("renders when open", () => {
    render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sections}
        testID="drawer"
      />,
    );
    expect(screen.getByTestId("drawer")).toBeTruthy();
  });

  it("calls onDestinationPress when destination pressed", () => {
    const onPress = jest.fn();
    render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sections}
        onDestinationPress={onPress}
        testID="drawer"
      />,
    );
    fireEvent.press(screen.getByTestId("drawer-dest-home"));
    expect(onPress).toHaveBeenCalledWith("home");
  });

  it("modal variant with open=false (animation closed branch)", () => {
    const { toJSON } = render(
      <NavigationDrawer
        open={false}
        onClose={jest.fn()}
        sections={sections}
        testID="drawer"
      />,
    );
    // Modal with visible={false} returns null in the test environment;
    // exercising this path covers the closed-animation branch without crashing.
    expect(toJSON()).toBeNull();
  });

  it("renders with header prop", () => {
    const { toJSON } = render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sections}
        header={<Text>Header content</Text>}
        testID="drawer"
      />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("pressing destination without onDestinationPress does not throw", () => {
    render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sections}
        testID="drawer"
      />,
    );
    expect(() =>
      fireEvent.press(screen.getByTestId("drawer-dest-home")),
    ).not.toThrow();
  });

  it("renders activeIcon when destination is active and has activeIcon", () => {
    const sectionsWithActiveIcon = [
      {
        destinations: [
          {
            key: "home",
            icon: "home-outlined",
            activeIcon: "home",
            label: "Home",
          },
        ],
      },
    ];
    render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sectionsWithActiveIcon}
        activeKey="home"
        testID="drawer"
      />,
    );
    expect(screen.getByTestId("drawer-dest-home")).toBeTruthy();
  });

  it("highlights active destination", () => {
    render(
      <NavigationDrawer
        open
        onClose={jest.fn()}
        sections={sections}
        activeKey="home"
        testID="drawer"
      />,
    );
    expect(screen.getByTestId("drawer-dest-home")).toBeTruthy();
  });

  it("uses default open=false when prop omitted", () => {
    // Type assertion: testing the runtime default for `open` (required in type)
    const { toJSON } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <NavigationDrawer sections={sections} {...({} as any)} />,
    );
    // Modal with visible={false} returns null
    expect(toJSON()).toBeNull();
  });

  it("uses default onClose noop when prop omitted (invoking it does not throw)", () => {
    const { UNSAFE_getByType } = render(
      <NavigationDrawer
        open
        sections={sections}
        testID="drawer"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...({} as any)}
      />,
    );
    const modal = UNSAFE_getByType(Modal);
    expect(() => modal.props.onRequestClose()).not.toThrow();
  });

  describe("standard variant", () => {
    it("renders standard variant without crash", () => {
      render(
        <NavigationDrawer
          open={false}
          onClose={jest.fn()}
          sections={sections}
          variant="standard"
          testID="drawer"
        />,
      );
      expect(screen.getByTestId("drawer")).toBeTruthy();
    });

    it("standard variant renders drawer content without Modal", () => {
      const { UNSAFE_queryByType } = render(
        <NavigationDrawer
          open={false}
          onClose={jest.fn()}
          sections={sections}
          variant="standard"
          testID="drawer"
        />,
      );
      expect(UNSAFE_queryByType(Modal)).toBeNull();
    });

    it("standard variant is always visible regardless of open prop", () => {
      const { rerender } = render(
        <NavigationDrawer
          open={false}
          onClose={jest.fn()}
          sections={sections}
          variant="standard"
          testID="drawer"
        />,
      );
      expect(screen.getByTestId("drawer")).toBeTruthy();
      rerender(
        <NavigationDrawer
          open={true}
          onClose={jest.fn()}
          sections={sections}
          variant="standard"
          testID="drawer"
        />,
      );
      expect(screen.getByTestId("drawer")).toBeTruthy();
    });

    it("standard variant renders destinations", () => {
      render(
        <NavigationDrawer
          open={false}
          onClose={jest.fn()}
          sections={sections}
          variant="standard"
          testID="drawer"
        />,
      );
      expect(screen.getByTestId("drawer-dest-home")).toBeTruthy();
      expect(screen.getByTestId("drawer-dest-search")).toBeTruthy();
      expect(screen.getByTestId("drawer-dest-settings")).toBeTruthy();
    });

    it("dark mode renders standard variant", () => {
      render(
        <NavigationDrawer
          open={false}
          onClose={jest.fn()}
          sections={sections}
          variant="standard"
          testID="drawer"
        />,
        { theme: "dark" },
      );
      expect(screen.getByTestId("drawer")).toBeTruthy();
    });
  });
});
