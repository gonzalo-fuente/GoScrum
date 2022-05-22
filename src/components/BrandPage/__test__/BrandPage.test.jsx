import { render, screen } from "@testing-library/react";
import BrandPage from "../BrandPage";

describe("BrandPage", () => {
  it("should render the logo", () => {
    render(<BrandPage />);
    const headingElement = screen.getByRole("heading", {
      level: 1,
      name: "Go Scrum",
    });
    expect(headingElement).toBeInTheDocument();
  });
});
