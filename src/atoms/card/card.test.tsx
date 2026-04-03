import { render, screen, fireEvent } from "@/test-utils";
import { Card } from "./card";

describe("Card", () => {
  it("renders elevated variant by default", () => {
    render(<Card testID="card">Content</Card>);
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("renders filled variant", () => {
    render(<Card variant="filled" testID="card">Content</Card>);
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("renders outlined variant", () => {
    render(<Card variant="outlined" testID="card">Content</Card>);
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    render(<Card onPress={onPress} testID="card">Content</Card>);
    fireEvent.press(screen.getByTestId("card"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    render(<Card onPress={onPress} disabled testID="card">Content</Card>);
    fireEvent.press(screen.getByTestId("card"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
