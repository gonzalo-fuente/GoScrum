import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../LoginForm";

describe("Login", () => {
  it("should render input element", () => {
    render(<LoginForm />, { wrapper: MemoryRouter });
    const inputElement = screen.getByPlaceholderText("User Name");
    expect(inputElement).toBeInTheDocument();
  });

  it("should verify that all fields are required", async () => {
    render(<LoginForm />, { wrapper: MemoryRouter });
    const logInButton = screen.getByRole("button", { name: /log in/i });
    user.click(logInButton);

    await waitFor(() => {
      const requiredText = screen.getAllByText(/This field is required/i);
      expect(requiredText.length).toBe(2);
    });
  });

  it("should verify login process", async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm atSubmit={handleSubmit} />, { wrapper: MemoryRouter });
    const userInput = screen.getByRole("textbox", {
      placeholder: /user name/i,
    });
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(userInput, "user");
    await user.type(passwordInput, "pass");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        userName: "user",
        password: "pass",
      });
    });
  });
});
