import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TamaguiProvider } from "tamagui";
import config from "../../../tamagui.config";
import { TimePicker } from "./time-picker";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

describe("TimePicker", () => {
  it("renders when visible", () => {
    const { getByTestId } = render(
      <TimePicker visible onConfirm={jest.fn()} onDismiss={jest.fn()} testID="time-picker" />,
      { wrapper }
    );
    expect(getByTestId("time-picker")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByTestId } = render(
      <TimePicker visible={false} onConfirm={jest.fn()} onDismiss={jest.fn()} testID="time-picker" />,
      { wrapper }
    );
    expect(queryByTestId("time-picker")).toBeNull();
  });

  it("calls onDismiss when cancel pressed", () => {
    const onDismiss = jest.fn();
    const { getByText } = render(
      <TimePicker visible onConfirm={jest.fn()} onDismiss={onDismiss} testID="tp" />,
      { wrapper }
    );
    fireEvent.press(getByText("Cancel"));
    expect(onDismiss).toHaveBeenCalled();
  });

  it("calls onConfirm when OK pressed", () => {
    const onConfirm = jest.fn();
    const { getByText } = render(
      <TimePicker visible onConfirm={onConfirm} onDismiss={jest.fn()} hour={9} minute={30} testID="tp" />,
      { wrapper }
    );
    fireEvent.press(getByText("OK"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("renders 24-hour format", () => {
    const { getByTestId } = render(
      <TimePicker visible onConfirm={jest.fn()} onDismiss={jest.fn()} use24Hour testID="tp" />,
      { wrapper }
    );
    expect(getByTestId("tp")).toBeTruthy();
  });
});
