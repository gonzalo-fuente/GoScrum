import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

describe("Login", () => {
  it("should render input element", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const inputElement = screen.getByPlaceholderText("User Name");
    expect(inputElement).toBeInTheDocument();
  });

  it("should verify that user name is required", async () => {
    render(<Login />, { wrapper: MemoryRouter });
    const userName = screen.getByRole("textbox", { placeholder: /User name/i });
    fireEvent.blur(userName);

    let error;
    await waitFor(() => {
      error = screen.getByText("* This field is required");
    });
    expect(error).not.toBeNull();
  });

  it("should verify that password is required", async () => {
    render(<Login />, { wrapper: MemoryRouter });
    const password = screen.getByRole("textbox", { placeholder: /Pasword/i });
    fireEvent.blur(password);

    let error;
    await waitFor(() => {
      error = screen.getByText("* This field is required");
    });
    expect(error).not.toBeNull();
  });

  it("should verify login process", async () => {
    const username = "username";
    const password = "password";
    const mockLogin = jest.fn();

    render(<Login onSubmit={mockLogin(username, password)} />, {
      wrapper: MemoryRouter,
    });

    const userName = screen.getByRole("textbox", {
      placeholder: /User name/i,
    });
    const pass = screen.getByRole("textbox", { placeholder: /Pasword/i });
    const loginButton = screen.getByRole("button", { name: /Log In/i });

    await userEvent.type(userName, "username");
    await userEvent.type(pass, "password");
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith("username", "password");
    });
  });
});
