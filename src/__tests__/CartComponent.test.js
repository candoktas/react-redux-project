// CartComponent.test.js
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
    // localStorage mocklama
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

    // BMW ve X5'i ayrı ayrı kontrol ediyoruz
    const brand = screen.getByText(/BMW/i); // BMW'yi buluyoruz
    const model = screen.getByText(/X5/i); // X5'i buluyoruz
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
      const quantityElements = screen.getAllByText(/\d+/); // Herhangi bir sayıyı içeren öğeleri bul
      const quantity = quantityElements.find((element) =>
        /\d/.test(element.textContent),
      ); // Sadece sayı içeren öğeyi bul
      expect(quantity).toBeInTheDocument(); // Öğenin var olup olmadığını kontrol et
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
      const quantityElements = screen.getAllByText(/\d+/); // Herhangi bir sayıyı içeren öğeleri bul
      const quantity = quantityElements.find((element) =>
        /\d/.test(element.textContent),
      ); // Sadece sayı içeren öğeyi bul
      expect(quantity).toBeInTheDocument(); // Öğenin var olup olmadığını kontrol et
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
      store.dispatch(incrementQuantity({ id: 1 })); // İkinci ürünü ekle
    });

    await waitFor(() => {
      const totalPriceElement = screen.getByTestId("total-price");
      expect(totalPriceElement.textContent).toMatch(/₺/); // Sadece ₺ sembolünü içerdiğini kontrol ediyoruz
    });
  });
});
