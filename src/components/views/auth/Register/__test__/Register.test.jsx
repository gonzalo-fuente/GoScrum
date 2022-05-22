import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

describe("Register", () => {
  it("should render input element", () => {
    render(<Register />, { wrapper: MemoryRouter });
    const inputElement = screen.getByPlaceholderText("User Name");
    expect(inputElement).toBeInTheDocument();
  });

  it("should fetch from API and render select element", async () => {
    render(<Register />, { wrapper: MemoryRouter });
    const optionElement = await screen.findByRole("option", { name: "Europa" });
    expect(optionElement).toBeInTheDocument();
  });

  it("should fetch from MockServer and render select element", async () => {
    render(<Register />, { wrapper: MemoryRouter });
    const optionElement = await screen.findByRole("option", { name: "Europa" });
    expect(optionElement).toBeInTheDocument();
  });
});
