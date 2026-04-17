import { render, screen } from "@/test-utils";
import { ProgressIndicator } from "./progress-indicator";

describe("ProgressIndicator", () => {
  it("renders linear type by default", () => {
    render(<ProgressIndicator testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();
  });

  it("renders circular type", () => {
    render(<ProgressIndicator type="circular" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();
  });

  it("renders determinate mode with progress value", () => {
    render(
      <ProgressIndicator mode="determinate" progress={0.5} testID="progress" />,
    );
    const el = screen.getByTestId("progress");
    expect(el).toBeTruthy();
    expect(el.props.accessibilityValue.now).toBe(50);
  });

  it("renders indeterminate mode without progress value", () => {
    render(<ProgressIndicator mode="indeterminate" testID="progress" />);
    const el = screen.getByTestId("progress");
    expect(el).toBeTruthy();
    expect(el.props.accessibilityValue.now).toBeUndefined();
  });

  it("renders with custom testID", () => {
    render(<ProgressIndicator testID="custom-progress" />);
    expect(screen.getByTestId("custom-progress")).toBeTruthy();
  });

  it("clamps progress to 0-1 range", () => {
    render(
      <ProgressIndicator mode="determinate" progress={1.5} testID="progress" />,
    );
    const el = screen.getByTestId("progress");
    expect(el.props.accessibilityValue.now).toBe(100);
  });

  it("has correct accessibility role", () => {
    render(<ProgressIndicator testID="a11y-progress" />);
    const element = screen.getByTestId("a11y-progress");
    expect(element.props.accessibilityRole).toBe("progressbar");
  });

  it("has correct accessibility value for determinate mode", () => {
    render(
      <ProgressIndicator
        mode="determinate"
        progress={0.75}
        testID="a11y-progress"
      />,
    );
    const element = screen.getByTestId("a11y-progress");
    expect(element.props.accessibilityValue).toEqual(
      expect.objectContaining({ min: 0, max: 100, now: 75 }),
    );
  });

  describe("circular determinate arc branches", () => {
    it("renders circular determinate at progress=0 (no arcs)", () => {
      const { toJSON } = render(
        <ProgressIndicator
          type="circular"
          mode="determinate"
          progress={0}
          testID="progress"
        />,
      );
      expect(toJSON()).toBeTruthy();
    });

    it("renders circular determinate at progress=0.3 (showBottom branch)", () => {
      const { toJSON } = render(
        <ProgressIndicator
          type="circular"
          mode="determinate"
          progress={0.3}
          testID="progress"
        />,
      );
      expect(toJSON()).toBeTruthy();
    });

    it("renders circular determinate at progress=0.6 (showLeft branch)", () => {
      const { toJSON } = render(
        <ProgressIndicator
          type="circular"
          mode="determinate"
          progress={0.6}
          testID="progress"
        />,
      );
      expect(toJSON()).toBeTruthy();
    });

    it("renders circular determinate at progress=0.9 (showTopArc branch)", () => {
      const { toJSON } = render(
        <ProgressIndicator
          type="circular"
          mode="determinate"
          progress={0.9}
          testID="progress"
        />,
      );
      expect(toJSON()).toBeTruthy();
    });
  });
});
