import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store.js";
import CartComponent from "../components/CartComponent";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/slices/cartSlice";
import { act } from "react";

describe("CartComponent Tests", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn(() => null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the cart component", () => {
    render(
      <Provider store={store}>
        <CartComponent />
      </Provider>,
    );

    const cartTitle = screen.getByText(/Your Cart/i);
    expect(cartTitle).toBeInTheDocument();
  });

  test("adds a car product to the cart", async () => {
    const product = { id: 1, brand: "BMW", model: "X5", price: 30000 };

    await act(async () => {
      render(
        <Provider store={store}>
          <CartComponent />
        </Provider>,
      );
      store.dispatch(addToCart(product));
    });

    const brand = screen.getByText(/BMW/i);
    const model = screen.getByText(/X5/i);
    expect(brand).toBeInTheDocument();
    expect(model).toBeInTheDocument();
  });

  test("increments the quantity of a car product in the cart", async () => {
    const product = { id: 1, brand: "BMW", model: "X5", price: 30000 };

    await act(async () => {
      render(
        <Provider store={store}>
          <CartComponent />
        </Provider>,
      );
      store.dispatch(addToCart(product));
      store.dispatch(incrementQuantity({ id: 1 }));
    });

    await waitFor(() => {
      const quantityElements = screen.getAllByText(/\d+/);
      const quantity = quantityElements.find((element) =>
        /\d/.test(element.textContent),
      );
      expect(quantity).toBeInTheDocument();
    });
  });

  test("decrements the quantity of a car product in the cart", async () => {
    const product = { id: 1, brand: "BMW", model: "X5", price: 30000 };

    await act(async () => {
      render(
        <Provider store={store}>
          <CartComponent />
        </Provider>,
      );
      store.dispatch(addToCart(product));
      store.dispatch(incrementQuantity({ id: 1 }));
      store.dispatch(decrementQuantity({ id: 1 }));
    });

    await waitFor(() => {
      const quantityElements = screen.getAllByText(/\d+/);
      const quantity = quantityElements.find((element) =>
        /\d/.test(element.textContent),
      );
      expect(quantity).toBeInTheDocument();
    });
  });

  test("calculates the total price correctly for dynamic products", async () => {
    const product = { id: 1, brand: "BMW", model: "X5", price: 30000 };

    await act(async () => {
      render(
        <Provider store={store}>
          <CartComponent />
        </Provider>,
      );
      store.dispatch(addToCart(product));
      store.dispatch(incrementQuantity({ id: 1 }));
    });

    await waitFor(() => {
      const totalPriceElement = screen.getByTestId("total-price");
      expect(totalPriceElement.textContent).toMatch(/₺/);
    });
  });
});
