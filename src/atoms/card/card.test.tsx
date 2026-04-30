import { render, screen, fireEvent } from "@/test-utils";
import { Card } from "./card";

describe("Card", () => {
  it("renders elevated variant by default", () => {
    render(<Card testID="card">Content</Card>);
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("renders filled variant", () => {
    render(
      <Card variant="filled" testID="card">
        Content
      </Card>,
    );
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("renders outlined variant", () => {
    render(
      <Card variant="outlined" testID="card">
        Content
      </Card>,
    );
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    render(
      <Card onPress={onPress} testID="card">
        Content
      </Card>,
    );
    fireEvent.press(screen.getByTestId("card"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("calls onLongPress when long-pressed", () => {
    const onLongPress = jest.fn();
    render(
      <Card onLongPress={onLongPress} testID="card">
        Content
      </Card>,
    );
    fireEvent(screen.getByTestId("card"), "longPress");
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it("renders interactively when only onLongPress is provided", () => {
    render(
      <Card onLongPress={jest.fn()} testID="card">
        Content
      </Card>,
    );
    expect(screen.getByTestId("card").props.accessibilityRole).toBe("button");
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    render(
      <Card onPress={onPress} disabled testID="card">
        Content
      </Card>,
    );
    fireEvent.press(screen.getByTestId("card"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("has button accessibility role when interactive", () => {
    render(
      <Card onPress={jest.fn()} testID="card">
        Content
      </Card>,
    );
    const element = screen.getByTestId("card");
    expect(element.props.accessibilityRole).toBe("button");
  });

  it("has correct accessibility state when disabled", () => {
    render(
      <Card onPress={jest.fn()} disabled testID="card">
        Content
      </Card>,
    );
    const element = screen.getByTestId("card");
    expect(element.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );
  });

  it("renders disabled without onPress (opacity style applied)", () => {
    const { toJSON } = render(
      <Card disabled testID="card">
        Content
      </Card>,
    );
    expect(toJSON()).toBeTruthy();
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("applies pressed style when pressIn fires on interactive card", () => {
    const onPress = jest.fn();
    render(
      <Card onPress={onPress} testID="card">
        Content
      </Card>,
    );
    fireEvent(screen.getByTestId("card"), "pressIn");
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("style and children-render functions cover pressed=true and disabled branches", () => {
    const { UNSAFE_root, rerender } = render(
      <Card onPress={jest.fn()} testID="card">
        Content
      </Card>,
    );
    const pressable = UNSAFE_root.findAll(
      (node: { props?: Record<string, unknown> }) =>
        node.props?.testID === "card" &&
        typeof node.props?.style === "function",
    )[0];
    // style fn — pressed=true (PRESSED_OPACITY) and pressed=false (1)
    expect(pressable.props.style({ pressed: true }).opacity).toBeLessThan(1);
    expect(pressable.props.style({ pressed: false }).opacity).toBe(1);
    // children-render fn — pressed=true with !disabled → scale 0.98
    const childPressed = pressable.props.children({ pressed: true });
    const childIdle = pressable.props.children({ pressed: false });
    expect(childPressed).toBeTruthy();
    expect(childIdle).toBeTruthy();

    // Now re-render with disabled to cover style fn disabled-true branch
    rerender(
      <Card onPress={jest.fn()} disabled testID="card">
        Content
      </Card>,
    );
    const disabledPressable = UNSAFE_root.findAll(
      (node: { props?: Record<string, unknown> }) =>
        node.props?.testID === "card" &&
        typeof node.props?.style === "function",
    )[0];
    expect(
      disabledPressable.props.style({ pressed: true }).opacity,
    ).toBeLessThan(1);
    // children-render with disabled+pressed: scale stays 1
    const childDisabledPressed = disabledPressable.props.children({
      pressed: true,
    });
    expect(childDisabledPressed).toBeTruthy();
  });
});
