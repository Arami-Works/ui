import { render, screen } from "@/test-utils";
import { Text } from "tamagui";
import { NavigationTemplate } from "./navigation-template";

describe("NavigationTemplate", () => {
  it("renders with testID", () => {
    render(<NavigationTemplate testID="nav" />);
    expect(screen.getByTestId("nav")).toBeTruthy();
  });

  it("renders the content area when no children are passed", () => {
    render(<NavigationTemplate testID="nav" />);
    expect(screen.getByTestId("nav-content")).toBeTruthy();
  });

  it("renders children inside the content area", () => {
    render(
      <NavigationTemplate testID="nav">
        <Text>Screen Content</Text>
      </NavigationTemplate>,
    );
    expect(screen.getByText("Screen Content")).toBeTruthy();
  });

  it("renders navBar slot when provided", () => {
    render(
      <NavigationTemplate
        testID="nav"
        navBar={<Text>Nav Bar</Text>}
      />,
    );
    expect(screen.getByText("Nav Bar")).toBeTruthy();
  });

  it("renders children and navBar together", () => {
    render(
      <NavigationTemplate
        testID="nav"
        navBar={<Text>Bottom Nav</Text>}
      >
        <Text>Content</Text>
      </NavigationTemplate>,
    );
    expect(screen.getByText("Content")).toBeTruthy();
    expect(screen.getByText("Bottom Nav")).toBeTruthy();
  });
});
