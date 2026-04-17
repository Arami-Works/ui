import { render, screen, fireEvent } from "@/test-utils";
import { NavigationRail } from "./navigation-rail";

const destinations = [
  { icon: "home-outlined", activeIcon: "home", label: "Home" },
  { icon: "search", label: "Search" },
  {
    icon: "notifications-outlined",
    activeIcon: "notifications",
    label: "Alerts",
    badge: 3,
  },
];

describe("NavigationRail", () => {
  it("renders all destinations", () => {
    render(<NavigationRail destinations={destinations} testID="rail" />);
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Search")).toBeTruthy();
    expect(screen.getByText("Alerts")).toBeTruthy();
  });

  it("renders with default activeIndex of 0", () => {
    render(<NavigationRail destinations={destinations} testID="rail" />);
    expect(screen.getByTestId("rail-dest-0")).toBeTruthy();
  });

  it("fires onDestinationPress with correct index", () => {
    const onPress = jest.fn();
    render(
      <NavigationRail
        destinations={destinations}
        onDestinationPress={onPress}
        testID="rail"
      />,
    );
    fireEvent.press(screen.getByTestId("rail-dest-1"));
    expect(onPress).toHaveBeenCalledWith(1);
  });

  it("renders FAB when provided", () => {
    const onFabPress = jest.fn();
    render(
      <NavigationRail
        destinations={destinations}
        fab={{
          icon: "edit",
          onPress: onFabPress,
          accessibilityLabel: "Compose",
        }}
        testID="rail"
      />,
    );
    expect(screen.getByTestId("rail-fab")).toBeTruthy();
  });

  it("renders badge count", () => {
    render(<NavigationRail destinations={destinations} testID="rail" />);
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("renders with custom testID", () => {
    render(<NavigationRail destinations={destinations} testID="custom-rail" />);
    expect(screen.getByTestId("custom-rail")).toBeTruthy();
  });

  it("sets accessibility role and state on destinations", () => {
    render(
      <NavigationRail
        destinations={destinations}
        activeIndex={1}
        testID="rail"
      />,
    );
    const activeDest = screen.getByTestId("rail-dest-1");
    expect(activeDest.props.accessibilityRole).toBe("tab");
    expect(activeDest.props.accessibilityState).toEqual({ selected: true });
  });

  it("renders menu icon when menuIcon prop is provided", () => {
    const onPress = jest.fn();
    render(
      <NavigationRail
        destinations={destinations}
        menuIcon={{ onPress }}
        testID="rail"
      />,
    );
    expect(screen.getByTestId("rail-menu")).toBeTruthy();
  });

  it("does not render menu icon by default", () => {
    render(<NavigationRail destinations={destinations} testID="rail" />);
    expect(screen.queryByTestId("rail-menu")).toBeNull();
  });

  it("renders without testID (undefined branch for dest/menu/fab testIDs)", () => {
    const { toJSON } = render(
      <NavigationRail
        destinations={destinations}
        menuIcon={{ onPress: jest.fn() }}
        fab={{ icon: "edit", onPress: jest.fn(), accessibilityLabel: "Compose" }}
      />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("pressing destination without onDestinationPress does not throw", () => {
    render(<NavigationRail destinations={destinations} testID="rail" />);
    expect(() =>
      fireEvent.press(screen.getByTestId("rail-dest-1")),
    ).not.toThrow();
  });

  it("calls menuIcon.onPress when menu icon is pressed", () => {
    const onPress = jest.fn();
    render(
      <NavigationRail
        destinations={destinations}
        menuIcon={{ onPress }}
        testID="rail"
      />,
    );
    fireEvent.press(screen.getByTestId("rail-menu"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
