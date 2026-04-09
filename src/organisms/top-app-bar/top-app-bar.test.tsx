import { render, screen, fireEvent } from "@/test-utils";
import { TopAppBar } from "./top-app-bar";

describe("TopAppBar", () => {
  it("renders with default small type", () => {
    const { toJSON } = render(<TopAppBar title="Page Title" testID="tab" />);
    expect(screen.getByTestId("tab")).toBeTruthy();
    expect(screen.getByTestId("top-app-bar-title")).toBeTruthy();
    expect(toJSON()).toBeTruthy();
  });

  it("renders all MD3 types without crashing", () => {
    const types = ["center-aligned", "small", "medium", "large"] as const;
    types.forEach((type) => {
      const { unmount } = render(
        <TopAppBar title="Title" type={type} testID="tab" />,
      );
      expect(screen.getByTestId("tab")).toBeTruthy();
      unmount();
    });
  });

  it("renders navigation icon and fires onNavigationPress", () => {
    const onNav = jest.fn();
    render(
      <TopAppBar
        title="Title"
        navigationIcon="arrow-back"
        onNavigationPress={onNav}
      />,
    );
    fireEvent.press(screen.getByTestId("top-app-bar-nav"));
    expect(onNav).toHaveBeenCalledTimes(1);
  });

  it("renders without navigation icon", () => {
    const { toJSON } = render(<TopAppBar title="Title" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders up to 3 action icons", () => {
    const actions = [
      { icon: "search", onPress: jest.fn() },
      { icon: "favorite", onPress: jest.fn() },
      { icon: "more-vert", onPress: jest.fn() },
    ];
    render(<TopAppBar title="Title" actions={actions} />);
    expect(screen.getByTestId("top-app-bar-action-0")).toBeTruthy();
    expect(screen.getByTestId("top-app-bar-action-1")).toBeTruthy();
    expect(screen.getByTestId("top-app-bar-action-2")).toBeTruthy();
  });

  it("fires action onPress callback", () => {
    const onPress = jest.fn();
    render(<TopAppBar title="Title" actions={[{ icon: "search", onPress }]} />);
    fireEvent.press(screen.getByTestId("top-app-bar-action-0"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("limits actions to 3 even if more are provided", () => {
    const actions = [
      { icon: "search", onPress: jest.fn() },
      { icon: "favorite", onPress: jest.fn() },
      { icon: "more-vert", onPress: jest.fn() },
      { icon: "share", onPress: jest.fn() },
    ];
    render(<TopAppBar title="Title" actions={actions} />);
    expect(screen.getByTestId("top-app-bar-action-0")).toBeTruthy();
    expect(screen.getByTestId("top-app-bar-action-1")).toBeTruthy();
    expect(screen.getByTestId("top-app-bar-action-2")).toBeTruthy();
    expect(screen.queryByTestId("top-app-bar-action-3")).toBeNull();
  });

  it("renders with elevated prop", () => {
    const { toJSON } = render(
      <TopAppBar title="Title" elevated testID="tab" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders with custom testID", () => {
    render(<TopAppBar title="Title" testID="custom-tab" />);
    expect(screen.getByTestId("custom-tab")).toBeTruthy();
  });
});
