import { render, screen } from "@/test-utils";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("renders children", () => {
    render(
      <Tooltip label="Tooltip text" testID="tooltip">
        <></>
      </Tooltip>
    );
    expect(screen.getByTestId("tooltip")).toBeTruthy();
  });

  it("renders plain variant", () => {
    render(
      <Tooltip label="Plain tip" variant="plain" testID="tooltip">
        <></>
      </Tooltip>
    );
    expect(screen.getByTestId("tooltip")).toBeTruthy();
  });

  it("renders rich variant with description", () => {
    render(
      <Tooltip
        label="Rich title"
        description="Rich description text"
        variant="rich"
        testID="tooltip"
      >
        <></>
      </Tooltip>
    );
    expect(screen.getByTestId("tooltip")).toBeTruthy();
  });
});
