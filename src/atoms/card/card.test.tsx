import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TamaguiProvider } from "tamagui";
import config from "../../../tamagui.config";
import { Card } from "./card";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

describe("Card", () => {
  it("renders elevated variant by default", () => {
    const { getByTestId } = render(<Card testID="card">Content</Card>, { wrapper });
    expect(getByTestId("card")).toBeTruthy();
  });

  it("renders filled variant", () => {
    const { getByTestId } = render(
      <Card variant="filled" testID="card">Content</Card>,
      { wrapper }
    );
    expect(getByTestId("card")).toBeTruthy();
  });

  it("renders outlined variant", () => {
    const { getByTestId } = render(
      <Card variant="outlined" testID="card">Content</Card>,
      { wrapper }
    );
    expect(getByTestId("card")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card onPress={onPress} testID="card">Content</Card>,
      { wrapper }
    );
    fireEvent.press(getByTestId("card"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card onPress={onPress} disabled testID="card">Content</Card>,
      { wrapper }
    );
    fireEvent.press(getByTestId("card"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
