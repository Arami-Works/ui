import { render, screen } from "@/test-utils";
import { Text } from "tamagui";
import { AppBarTemplate } from "./app-bar-template";

describe("AppBarTemplate", () => {
  it("renders with testID", () => {
    render(<AppBarTemplate testID="abt" />);
    expect(screen.getByTestId("abt")).toBeTruthy();
  });

  it("renders the content area when no children are passed", () => {
    render(<AppBarTemplate testID="abt" />);
    expect(screen.getByTestId("abt-content")).toBeTruthy();
  });

  it("renders children inside the content area", () => {
    render(
      <AppBarTemplate testID="abt">
        <Text>Screen Content</Text>
      </AppBarTemplate>,
    );
    expect(screen.getByText("Screen Content")).toBeTruthy();
  });

  it("renders topBar slot when provided", () => {
    render(
      <AppBarTemplate
        testID="abt"
        topBar={<Text>App Bar</Text>}
      />,
    );
    expect(screen.getByText("App Bar")).toBeTruthy();
  });

  it("renders children and topBar together", () => {
    render(
      <AppBarTemplate
        testID="abt"
        topBar={<Text>Top App Bar</Text>}
      >
        <Text>Content</Text>
      </AppBarTemplate>,
    );
    expect(screen.getByText("Top App Bar")).toBeTruthy();
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("renders without testID (undefined branch)", () => {
    const { toJSON } = render(
      <AppBarTemplate>
        <Text>Content</Text>
      </AppBarTemplate>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
