import React from "react";
import { render, screen } from "@testing-library/react";
import FilterComponent from "../components/FilterComponent";
import { Provider } from "react-redux";
import store from "../store/store";

describe("FilterComponent Tests", () => {
  test("renders the search input", () => {
    render(
      <Provider store={store}>
        <FilterComponent />
      </Provider>,
    );
    const searchInput = screen.getByPlaceholderText(/search brands/i);
    expect(searchInput).toBeInTheDocument();
  });
});
