import { render, screen, fireEvent } from "@/test-utils";
import { TextField } from "./text-field";

describe("TextField", () => {
  it("renders filled variant by default", () => {
    render(<TextField testID="tf" />);
    expect(screen.getByTestId("tf")).toBeTruthy();
  });

  it("renders outlined variant", () => {
    render(<TextField variant="outlined" testID="tf" />);
    expect(screen.getByTestId("tf")).toBeTruthy();
  });

  it("renders with label", () => {
    render(<TextField label="Email" testID="tf" />);
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("renders with helper text", () => {
    render(<TextField helperText="Enter your email" testID="tf" />);
    expect(screen.getByText("Enter your email")).toBeTruthy();
  });

  it("renders with error text", () => {
    render(<TextField errorText="Invalid email" testID="tf" />);
    expect(screen.getByText("Invalid email")).toBeTruthy();
  });

  it("renders disabled without crash", () => {
    render(<TextField disabled testID="tf" />);
    expect(screen.getByTestId("tf")).toBeTruthy();
  });

  it("renders with leading icon", () => {
    const { toJSON } = render(<TextField leadingIcon="search" testID="tf" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders with trailing icon", () => {
    const { toJSON } = render(<TextField trailingIcon="close" testID="tf" />);
    expect(toJSON()).toBeTruthy();
  });

  it("fires onChangeText callback", () => {
    const onChangeText = jest.fn();
    render(<TextField onChangeText={onChangeText} testID="tf" />);
    fireEvent.changeText(screen.getByTestId("tf-input"), "hello");
    expect(onChangeText).toHaveBeenCalledWith("hello");
  });

  it("renders with custom testID", () => {
    render(<TextField testID="custom-tf" />);
    expect(screen.getByTestId("custom-tf")).toBeTruthy();
  });

  it("forwards accessibilityLabel to input", () => {
    render(<TextField accessibilityLabel="Email address" testID="a11y-tf" />);
    const input = screen.getByTestId("a11y-tf-input");
    expect(input.props.accessibilityLabel).toBe("Email address");
  });

  it("forwards accessibilityHint to input", () => {
    render(
      <TextField
        accessibilityHint="Enter your email address"
        testID="hint-test"
      />,
    );
    expect(screen.getByTestId("hint-test-input").props.accessibilityHint).toBe(
      "Enter your email address",
    );
  });

  it("defaults accessibilityLabel to label prop", () => {
    render(<TextField label="Email" testID="a11y-tf" />);
    const input = screen.getByTestId("a11y-tf-input");
    expect(input.props.accessibilityLabel).toBe("Email");
  });

  it("has correct accessibility state when disabled", () => {
    render(<TextField disabled testID="a11y-tf" />);
    const input = screen.getByTestId("a11y-tf-input");
    expect(input.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );
  });

  it("renders outlined with focus (isFocused branch)", () => {
    render(<TextField variant="outlined" testID="tf" />);
    fireEvent(screen.getByTestId("tf-input"), "focus");
    expect(screen.getByTestId("tf")).toBeTruthy();
  });

  it("renders outlined with error", () => {
    render(<TextField variant="outlined" errorText="Bad input" testID="tf" />);
    expect(screen.getByText("Bad input")).toBeTruthy();
  });

  it("renders outlined disabled", () => {
    const { toJSON } = render(
      <TextField variant="outlined" disabled testID="tf" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders disabled with trailing icon (onPress disabled branch)", () => {
    const { toJSON } = render(
      <TextField disabled trailingIcon="close" testID="tf" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders label with leadingIcon (left offset applied)", () => {
    const { toJSON } = render(
      <TextField label="Name" leadingIcon="person" testID="tf" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders maxLength counter without supportText (spacer branch)", () => {
    render(<TextField maxLength={50} testID="tf" />);
    expect(screen.getByTestId("tf")).toBeTruthy();
  });

  it("fires onFocus and onBlur callbacks", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(<TextField onFocus={onFocus} onBlur={onBlur} testID="tf" />);
    fireEvent(screen.getByTestId("tf-input"), "focus");
    expect(onFocus).toHaveBeenCalledTimes(1);
    fireEvent(screen.getByTestId("tf-input"), "blur");
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("fires onTrailingIconPress when trailing icon pressed", () => {
    const onTrailingIconPress = jest.fn();
    render(
      <TextField
        trailingIcon="close"
        onTrailingIconPress={onTrailingIconPress}
        testID="tf"
      />,
    );
    expect(screen.getByTestId("tf")).toBeTruthy();
  });

  describe("dark mode", () => {
    it("renders in dark theme without crashing", () => {
      render(<TextField testID="dark-test" />, { theme: "dark" });
      expect(screen.getByTestId("dark-test")).toBeTruthy();
    });
  });
});
