import { render, screen } from "@/test-utils";
import { Text } from "tamagui";
import { FormTemplate } from "./form-template";

describe("FormTemplate", () => {
  it("renders with testID", () => {
    render(<FormTemplate testID="form-template" />);
    expect(screen.getByTestId("form-template")).toBeTruthy();
  });

  it("renders topBar slot", () => {
    render(<FormTemplate topBar={<Text>App Bar</Text>} />);
    expect(screen.getByText("App Bar")).toBeTruthy();
  });

  it("renders children in scrollable area", () => {
    render(
      <FormTemplate>
        <Text>Field 1</Text>
        <Text>Field 2</Text>
      </FormTemplate>,
    );
    expect(screen.getByText("Field 1")).toBeTruthy();
    expect(screen.getByText("Field 2")).toBeTruthy();
  });

  it("renders actions slot", () => {
    render(<FormTemplate actions={<Text>Submit</Text>} />);
    expect(screen.getByText("Submit")).toBeTruthy();
  });

  it("does not render actions container when actions is undefined", () => {
    const { toJSON } = render(
      <FormTemplate testID="form-template">
        <Text>Content</Text>
      </FormTemplate>,
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).not.toContain("outlineVariant");
  });

  it("renders all slots together", () => {
    render(
      <FormTemplate
        testID="full-form"
        topBar={<Text>Header</Text>}
        actions={<Text>Save</Text>}
      >
        <Text>Form Content</Text>
      </FormTemplate>,
    );
    expect(screen.getByTestId("full-form")).toBeTruthy();
    expect(screen.getByText("Header")).toBeTruthy();
    expect(screen.getByText("Form Content")).toBeTruthy();
    expect(screen.getByText("Save")).toBeTruthy();
  });
});
