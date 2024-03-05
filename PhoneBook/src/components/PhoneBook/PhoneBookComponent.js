import React, { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import { gql, useLazyQuery } from "@apollo/client";

export const GET_CONTACTS = gql`
  query SearchContacts($name: String!) {
    searchContacts(name: $name) {
      name
      phone
    }
  }
`;

/**
 * This component gives the Phonebook functionality with search field
 * @returns PhoneBook component
 */
function PhoneBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContacts, { loading, error, data }] = useLazyQuery(GET_CONTACTS);

  /**
   * HandleSearch function is an event handler function to catch search term and load contacts accordingly
   * @param {*} event
   */
  const handleSearch = (event) => {
    const term = event.target.value;
    if (term.trim() !== "") {
      searchContacts({ variables: { name: term } });
    }
    setSearchTerm(term);
  };

  return (
    <Container>
      <h1>Phone Book</h1>
      <TextField
        label="Search by name"
        variant="outlined"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
        fullWidth
        value={searchTerm}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {searchTerm && data && data.searchContacts ? (
        data.searchContacts.length > 0 ? (
          <List>
            {data.searchContacts.map((contact, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={contact.name}
                  secondary={`Phone: ${contact.phone}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No matching contacts found.</p>
        )
      ) : (
        <p>Please enter a search term.</p>
      )}
    </Container>
  );
}

export default PhoneBook;
