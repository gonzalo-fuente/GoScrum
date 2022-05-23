import { render, screen, waitFor, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TaskForm from "../TaskForm";

describe("Create Task Form", () => {
  it("should verify that all fields are required", async () => {
    render(<TaskForm />);
    const createTaskButton = screen.getByRole("button", {
      name: /create task/i,
    });
    user.click(createTaskButton);

    await waitFor(() => {
      const requiredText = screen.getAllByText(/This field is required/i);
      expect(requiredText.length).toBe(4);
    });
  });

  it("should verify create task process", async () => {
    const handleSubmit = jest.fn();
    render(<TaskForm atSubmit={handleSubmit} />);
    const taskInput = screen.getByPlaceholderText(/task title/i);
    const statusInput = screen.getByTestId(/status/i);
    const priorityInput = screen.getByTestId(/importance/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const createTaskButton = screen.getByRole("button", {
      name: /create task/i,
    });

    await user.type(taskInput, "New Task");
    await user.selectOptions(
      statusInput,
      within(statusInput).getByRole("option", { name: "New" })
    );
    await user.selectOptions(
      priorityInput,
      within(priorityInput).getByRole("option", { name: "Low" })
    );
    await user.type(descriptionInput, "This is a New Task");

    user.click(createTaskButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        task: {
          title: "New Task",
          status: "NEW",
          importance: "LOW",
          description: "This is a New Task",
        },
      });
    });
  });
});
