import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import PhoneBook, { GET_CONTACTS } from "./PhoneBookComponent";

const mocks = [
  {
    request: {
      query: GET_CONTACTS,
      variables: { name: "Jetendar" },
    },
    result: {
      data: {
        searchContacts: [{ name: "Jetendar Maheshwari", phone: "01782148995" }],
      },
    },
  },
];

describe("PhoneBook component", () => {
  test("renders PhoneBook component and initiates a search", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PhoneBook />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Phone Book")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a search term.")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/search by name/i), {
      target: { value: "Jetendar" },
    });

    await waitFor(() => {
      expect(screen.getByText("Jetendar Maheshwari")).toBeInTheDocument();
    });
  });
});
