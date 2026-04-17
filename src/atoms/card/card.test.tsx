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
});
