import type { ReactElement } from "react";
import { act, renderHook } from "@testing-library/react-native";
import { useConfirmDialog } from "./use-confirm-dialog";

describe("useConfirmDialog", () => {
  it("returns showConfirmDialog and ConfirmDialogPortal", () => {
    const { result } = renderHook(() => useConfirmDialog());
    expect(typeof result.current.showConfirmDialog).toBe("function");
    expect(typeof result.current.ConfirmDialogPortal).toBe("function");
  });

  it("ConfirmDialogPortal returns null when not triggered", () => {
    const { result } = renderHook(() => useConfirmDialog());
    const portal = result.current.ConfirmDialogPortal();
    expect(portal).toBeNull();
  });

  it("ConfirmDialogPortal renders Dialog after showConfirmDialog is called", () => {
    const { result } = renderHook(() => useConfirmDialog());
    act(() => {
      result.current.showConfirmDialog({
        title: "Delete item?",
        message: "This cannot be undone.",
        onConfirm: jest.fn(),
      });
    });
    expect(result.current.ConfirmDialogPortal()).not.toBeNull();
  });

  it("calls onConfirm callback when confirmed", () => {
    const onConfirm = jest.fn();
    const { result } = renderHook(() => useConfirmDialog());
    act(() => {
      result.current.showConfirmDialog({
        title: "Confirm",
        message: "Are you sure?",
        onConfirm,
      });
    });
    // Simulate confirm press by extracting props
    const portal = result.current.ConfirmDialogPortal() as ReactElement<
      Record<string, unknown>
    >;
    act(() => {
      (portal.props.onConfirm as () => void)();
    });
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss callback when dismissed", () => {
    const onDismiss = jest.fn();
    const { result } = renderHook(() => useConfirmDialog());
    act(() => {
      result.current.showConfirmDialog({
        title: "Confirm",
        message: "Are you sure?",
        onConfirm: jest.fn(),
        onDismiss,
      });
    });
    const portal = result.current.ConfirmDialogPortal() as ReactElement<
      Record<string, unknown>
    >;
    act(() => {
      (portal.props.onDismiss as () => void)();
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("dismiss without onDismiss does not throw (?.() undefined branch)", () => {
    const { result } = renderHook(() => useConfirmDialog());
    act(() => {
      result.current.showConfirmDialog({
        title: "Confirm",
        message: "Are you sure?",
        onConfirm: jest.fn(),
      });
    });
    const portal = result.current.ConfirmDialogPortal() as ReactElement<
      Record<string, unknown>
    >;
    expect(() => {
      act(() => {
        (portal.props.onDismiss as () => void)();
      });
    }).not.toThrow();
  });

  it("uses custom labels when provided", () => {
    const { result } = renderHook(() => useConfirmDialog());
    act(() => {
      result.current.showConfirmDialog({
        title: "Confirm",
        message: "Are you sure?",
        onConfirm: jest.fn(),
        confirmLabel: "Yes",
        dismissLabel: "No",
      });
    });
    const portal = result.current.ConfirmDialogPortal() as ReactElement<
      Record<string, unknown>
    >;
    expect(portal.props.confirmLabel).toBe("Yes");
    expect(portal.props.dismissLabel).toBe("No");
  });

  it("uses default labels when none provided", () => {
    const { result } = renderHook(() => useConfirmDialog());
    act(() => {
      result.current.showConfirmDialog({
        title: "Confirm",
        message: "Are you sure?",
        onConfirm: jest.fn(),
      });
    });
    const portal = result.current.ConfirmDialogPortal() as ReactElement<
      Record<string, unknown>
    >;
    expect(portal.props.confirmLabel).toBe("확인");
    expect(portal.props.dismissLabel).toBe("취소");
  });
});
