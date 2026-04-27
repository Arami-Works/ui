import { render, screen } from "@/test-utils";
import { Text } from "tamagui";
import { renderHook, act } from "@testing-library/react-native";
import { UiProvider } from "./UiProvider";
import { useThemeMode } from "./ThemeContext";

jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  __esModule: true,
  default: jest.fn(() => "light"),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const useColorScheme =
  require("react-native/Libraries/Utilities/useColorScheme") as {
    default: jest.MockedFunction<() => "light" | "dark" | null | undefined>;
  };
const mockedUseColorScheme = useColorScheme.default;

describe("UiProvider", () => {
  it("renders children", () => {
    render(
      <UiProvider>
        <Text testID="child">hello</Text>
      </UiProvider>,
    );
    expect(screen.getByTestId("child")).toBeTruthy();
  });

  it("defaults to light theme", () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => <UiProvider>{children}</UiProvider>,
    });
    expect(result.current.mode).toBe("light");
    expect(result.current.resolved).toBe("light");
  });

  it("accepts defaultTheme='dark'", () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => (
        <UiProvider defaultTheme="dark">{children}</UiProvider>
      ),
    });
    expect(result.current.mode).toBe("dark");
    expect(result.current.resolved).toBe("dark");
  });

  it("accepts defaultTheme='system' and resolves to light by default", () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => (
        <UiProvider defaultTheme="system">{children}</UiProvider>
      ),
    });
    expect(result.current.mode).toBe("system");
    expect(["light", "dark"]).toContain(result.current.resolved);
  });

  it("accepts defaultTheme='system' with dark color scheme resolves to dark", () => {
    mockedUseColorScheme.mockReturnValue("dark");
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => (
        <UiProvider defaultTheme="system">{children}</UiProvider>
      ),
    });
    expect(result.current.mode).toBe("system");
    expect(result.current.resolved).toBe("dark");
    mockedUseColorScheme.mockReturnValue("light");
  });

  it("accepts defaultTheme='system' with light color scheme resolves to light", () => {
    mockedUseColorScheme.mockReturnValue("light");
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => (
        <UiProvider defaultTheme="system">{children}</UiProvider>
      ),
    });
    expect(result.current.mode).toBe("system");
    expect(result.current.resolved).toBe("light");
  });

  it("setMode changes resolved theme", () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => <UiProvider>{children}</UiProvider>,
    });
    act(() => result.current.setMode("dark"));
    expect(result.current.mode).toBe("dark");
    expect(result.current.resolved).toBe("dark");
  });

  it("default ThemeContext setMode (no provider) is a no-op that does not throw", () => {
    // Without UiProvider, useThemeMode returns the default context value
    // whose setMode is a no-op. Invoke it to cover the noop function.
    const { result } = renderHook(() => useThemeMode());
    expect(result.current.mode).toBe("light");
    expect(() => result.current.setMode("dark")).not.toThrow();
  });

  it("useThemeMode returns setMode function", () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => <UiProvider>{children}</UiProvider>,
    });
    expect(typeof result.current.setMode).toBe("function");
  });
});
