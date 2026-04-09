import { render, screen } from "@/test-utils";
import { Skeleton } from "./skeleton";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: {
      View,
      createAnimatedComponent: (c: any) => c,
      call: () => {},
    },
    useSharedValue: (init: any) => ({ value: init }),
    useAnimatedStyle: (fn: any) => fn(),
    withTiming: (val: any) => val,
    withRepeat: (val: any) => val,
    withSequence: (...vals: any[]) => vals[vals.length - 1],
    Easing: { linear: (v: any) => v },
  };
});

describe("Skeleton", () => {
  it("renders with default props", () => {
    render(<Skeleton testID="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeTruthy();
  });

  it("renders with custom dimensions", () => {
    const { toJSON } = render(
      <Skeleton width={200} height={48} testID="skeleton" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders with pill shape", () => {
    const { toJSON } = render(
      <Skeleton width={48} height={48} borderRadius={9999} testID="skeleton" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders with string width", () => {
    const { toJSON } = render(
      <Skeleton width="100%" height={16} testID="skeleton" />,
    );
    expect(toJSON()).toBeTruthy();
  });

  describe("dark mode", () => {
    it("renders in dark theme without crashing", () => {
      render(<Skeleton testID="dark-test" />, { theme: "dark" });
      expect(screen.getByTestId("dark-test")).toBeTruthy();
    });
  });
});
