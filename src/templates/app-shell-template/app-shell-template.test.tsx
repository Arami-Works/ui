import { render, screen } from "@/test-utils";
import { Text } from "tamagui";
import { AppShellTemplate } from "./app-shell-template";

describe("AppShellTemplate", () => {
  it("renders with testID", () => {
    render(<AppShellTemplate testID="ast" />);
    expect(screen.getByTestId("ast")).toBeTruthy();
  });

  it("renders the content area when no children are passed", () => {
    render(<AppShellTemplate testID="ast" />);
    expect(screen.getByTestId("ast-content")).toBeTruthy();
  });

  it("renders children inside the content area", () => {
    render(
      <AppShellTemplate testID="ast">
        <Text>Screen Content</Text>
      </AppShellTemplate>,
    );
    expect(screen.getByText("Screen Content")).toBeTruthy();
  });

  it("renders topAppBar slot when provided", () => {
    render(
      <AppShellTemplate testID="ast" topAppBar={<Text>Top App Bar</Text>} />,
    );
    expect(screen.getByText("Top App Bar")).toBeTruthy();
  });

  it("renders bottomNavigationBar slot when provided", () => {
    render(
      <AppShellTemplate
        testID="ast"
        bottomNavigationBar={<Text>Bottom Nav</Text>}
      />,
    );
    expect(screen.getByText("Bottom Nav")).toBeTruthy();
  });

  it("renders all slots together", () => {
    render(
      <AppShellTemplate
        testID="ast"
        topAppBar={<Text>Top App Bar</Text>}
        bottomNavigationBar={<Text>Bottom Nav</Text>}
      >
        <Text>Content</Text>
      </AppShellTemplate>,
    );
    expect(screen.getByText("Top App Bar")).toBeTruthy();
    expect(screen.getByText("Content")).toBeTruthy();
    expect(screen.getByText("Bottom Nav")).toBeTruthy();
  });

  it("renders without testID (undefined branch)", () => {
    const { toJSON } = render(
      <AppShellTemplate>
        <Text>Content</Text>
      </AppShellTemplate>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
