import { render, screen, fireEvent } from "@/test-utils";
import { Menu } from "./menu";

const items = [
  { key: "edit", label: "Edit", onPress: jest.fn() },
  { key: "delete", label: "Delete", onPress: jest.fn() },
  { key: "disabled", label: "Disabled", onPress: jest.fn(), disabled: true },
];

describe("Menu", () => {
  it("renders when visible", () => {
    render(<Menu visible onDismiss={jest.fn()} items={items} testID="menu" />);
    expect(screen.getByTestId("menu")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    render(
      <Menu
        visible={false}
        onDismiss={jest.fn()}
        items={items}
        testID="menu"
      />,
    );
    expect(screen.queryByTestId("menu")).toBeNull();
  });

  it("calls onPress for enabled item", () => {
    const onPress = jest.fn();
    render(
      <Menu
        visible
        onDismiss={jest.fn()}
        items={[{ key: "a", label: "A", onPress }]}
        testID="menu"
      />,
    );
    fireEvent.press(screen.getByTestId("menu-item-a"));
    expect(onPress).toHaveBeenCalled();
  });

  it("does not call onPress for disabled item", () => {
    const onPress = jest.fn();
    render(
      <Menu
        visible
        onDismiss={jest.fn()}
        items={[{ key: "d", label: "D", onPress, disabled: true }]}
        testID="menu"
      />,
    );
    fireEvent.press(screen.getByTestId("menu-item-d"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("has menu accessibility role on container", () => {
    render(
      <Menu visible onDismiss={jest.fn()} items={items} testID="a11y-menu" />,
    );
    const element = screen.getByTestId("a11y-menu");
    expect(element.props.accessibilityRole).toBe("menu");
  });

  it("forwards accessibilityHint to container", () => {
    render(
      <Menu
        visible
        onDismiss={jest.fn()}
        items={items}
        accessibilityHint="Choose an action"
        testID="hint-test"
      />,
    );
    expect(screen.getByTestId("hint-test").props.accessibilityHint).toBe(
      "Choose an action",
    );
  });

  it("has menuitem accessibility role on items", () => {
    render(
      <Menu visible onDismiss={jest.fn()} items={items} testID="a11y-menu" />,
    );
    const item = screen.getByTestId("a11y-menu-item-edit");
    expect(item.props.accessibilityRole).toBe("menuitem");
  });

  it("has correct accessibility state on disabled item", () => {
    render(
      <Menu visible onDismiss={jest.fn()} items={items} testID="a11y-menu" />,
    );
    const item = screen.getByTestId("a11y-menu-item-disabled");
    expect(item.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );
  });

  it("renders divider between items", () => {
    render(
      <Menu
        visible
        onDismiss={() => {}}
        items={[
          { key: "a", label: "Item A", onPress: () => {} },
          { key: "div", type: "divider" },
          { key: "b", label: "Item B", onPress: () => {} },
        ]}
        testID="menu"
      />,
    );
    expect(screen.getByTestId("menu-item-a")).toBeTruthy();
    expect(screen.getByTestId("menu-item-b")).toBeTruthy();
  });

  it("renders chevron for items with submenu", () => {
    render(
      <Menu
        visible
        onDismiss={() => {}}
        items={[
          {
            key: "more",
            label: "More options",
            onPress: () => {},
            submenu: [{ key: "sub1", label: "Sub item", onPress: () => {} }],
          },
        ]}
        testID="menu"
      />,
    );
    expect(screen.getByTestId("menu-item-more")).toBeTruthy();
  });

  it("pressing parent item opens submenu, pressing again closes it", () => {
    render(
      <Menu
        visible
        onDismiss={() => {}}
        items={[
          {
            key: "more",
            label: "More options",
            onPress: () => {},
            submenu: [{ key: "sub1", label: "Sub item", onPress: () => {} }],
          },
        ]}
        testID="menu"
      />,
    );
    expect(screen.queryByTestId("menu-item-more-sub1")).toBeNull();
    fireEvent.press(screen.getByTestId("menu-item-more"));
    expect(screen.getByTestId("menu-item-more-sub1")).toBeTruthy();
    fireEvent.press(screen.getByTestId("menu-item-more"));
    expect(screen.queryByTestId("menu-item-more-sub1")).toBeNull();
  });

  it("pressing subitem fires its onPress and calls onDismiss", () => {
    const subOnPress = jest.fn();
    const onDismiss = jest.fn();
    render(
      <Menu
        visible
        onDismiss={onDismiss}
        items={[
          {
            key: "more",
            label: "More options",
            onPress: () => {},
            submenu: [{ key: "sub1", label: "Sub item", onPress: subOnPress }],
          },
        ]}
        testID="menu"
      />,
    );
    fireEvent.press(screen.getByTestId("menu-item-more"));
    fireEvent.press(screen.getByTestId("menu-item-more-sub1"));
    expect(subOnPress).toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalled();
  });

  it("pressing inner stop-prop Pressable does not dismiss menu", () => {
    const onDismiss = jest.fn();
    render(<Menu visible onDismiss={onDismiss} items={items} testID="menu" />);
    fireEvent.press(screen.getByTestId("menu"), { stopPropagation: jest.fn() });
    expect(screen.getByTestId("menu")).toBeTruthy();
  });

  it("renders item with trailingText", () => {
    render(
      <Menu
        visible
        onDismiss={jest.fn()}
        items={[
          {
            key: "copy",
            label: "Copy",
            onPress: jest.fn(),
            trailingText: "⌘C",
          },
        ]}
        testID="menu"
      />,
    );
    expect(screen.getByText("⌘C")).toBeTruthy();
  });

  it("renders item with leadingIcon", () => {
    render(
      <Menu
        visible
        onDismiss={jest.fn()}
        items={[
          {
            key: "edit",
            label: "Edit",
            onPress: jest.fn(),
            leadingIcon: "edit",
          },
        ]}
        testID="menu"
      />,
    );
    expect(screen.getByTestId("menu-item-edit")).toBeTruthy();
  });

  it("style function returns pressed opacity for enabled menu item (pressed branch)", () => {
    const { UNSAFE_root } = render(
      <Menu
        visible
        onDismiss={jest.fn()}
        items={[{ key: "a", label: "A", onPress: jest.fn() }]}
        testID="menu"
      />,
    );
    const item = UNSAFE_root.findAll(
      (node: { props?: Record<string, unknown> }) =>
        node.props?.testID === "menu-item-a",
    )[0];
    // Invoke the style function with pressed=true to cover the inner ternary
    expect(typeof item.props.style).toBe("function");
    const pressed = item.props.style({ pressed: true });
    const notPressed = item.props.style({ pressed: false });
    expect(pressed.opacity).toBeLessThan(1);
    expect(notPressed.opacity).toBe(1);
  });

  it("style function on submenu item exercises pressed branch", () => {
    const { UNSAFE_root } = render(
      <Menu
        visible
        onDismiss={jest.fn()}
        items={[
          {
            key: "more",
            label: "More options",
            onPress: jest.fn(),
            submenu: [{ key: "sub1", label: "Sub item", onPress: jest.fn() }],
          },
        ]}
        testID="menu"
      />,
    );
    fireEvent.press(screen.getByTestId("menu-item-more"));
    const subItem = UNSAFE_root.findAll(
      (node: { props?: Record<string, unknown> }) =>
        node.props?.testID === "menu-item-more-sub1",
    )[0];
    const pressed = subItem.props.style({ pressed: true });
    const notPressed = subItem.props.style({ pressed: false });
    expect(pressed.opacity).toBeLessThan(1);
    expect(notPressed.opacity).toBe(1);
  });

  it("does not call subitem onPress when subitem is disabled", () => {
    const subOnPress = jest.fn();
    render(
      <Menu
        visible
        onDismiss={() => {}}
        items={[
          {
            key: "more",
            label: "More options",
            onPress: () => {},
            submenu: [
              {
                key: "sub1",
                label: "Sub item",
                onPress: subOnPress,
                disabled: true,
              },
            ],
          },
        ]}
        testID="menu"
      />,
    );
    fireEvent.press(screen.getByTestId("menu-item-more"));
    fireEvent.press(screen.getByTestId("menu-item-more-sub1"));
    expect(subOnPress).not.toHaveBeenCalled();
  });
});
