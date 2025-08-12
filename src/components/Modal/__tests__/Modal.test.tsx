import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Modal } from "../Modal";

beforeEach(() => {
  const root = document.createElement("div");
  root.setAttribute("id", "modal-root");
  document.body.appendChild(root);
});

afterEach(() => {
  cleanup();
  const root = document.getElementById("modal-root");
  if (root && root.parentNode) root.parentNode.removeChild(root);
});

test("renders children in the portal", () => {
  const onClose = jest.fn();
  const onSave = jest.fn();

  render(
    <Modal onClose={onClose} onSave={onSave}>
      <div data-testid="modal-content">Hello Modal</div>
    </Modal>
  );

  expect(screen.getByTestId("modal-content")).toBeInTheDocument();
});

test("clicking Save button calls onSave", () => {
  const onClose = jest.fn();
  const onSave = jest.fn();

  render(
    <Modal onClose={onClose} onSave={onSave}>
      <div>Content</div>
    </Modal>
  );

  fireEvent.click(screen.getByRole("button", { name: /save/i }));
  expect(onSave).toHaveBeenCalledTimes(1);
});

test("clicking Close (X) button calls onClose", () => {
  const onClose = jest.fn();
  const onSave = jest.fn();

  const { container } = render(
    <Modal onClose={onClose} onSave={onSave}>
      <div>Content</div>
    </Modal>
  );
  const closeBtn = container.ownerDocument.querySelector<HTMLButtonElement>(".modalClose");
  expect(closeBtn).toBeTruthy();

  if (closeBtn) fireEvent.click(screen.getByRole("button", { name: /close dialog/i }));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("click inside modal content does NOT trigger onClose", () => {
  const onClose = jest.fn();
  const onSave = jest.fn();

  render(
    <Modal onClose={onClose} onSave={onSave}>
      <button data-testid="inside">Inside</button>
    </Modal>
  );

  const inside = screen.getByTestId("inside");
  fireEvent.click(inside);

  expect(onClose).not.toHaveBeenCalled();
});
