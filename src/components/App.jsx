import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Section } from "./Section/Section";

const { Component } = require("react")

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
    ],
    filter: ''
  };

  saveContact = data => {
    this.setState(({ contacts }) =>
      contacts.some(contact => contact.name === data.name)
        ? alert(`${data.name} is already in contacts.`)
        : { contacts: [...contacts, data] }
    );
  };


  onFilter = (event) => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => idContact !== id),
    }));
  }; 

  render() {
    const { contacts, filter } = this.state
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.saveContact} />
        </Section>
        <Section title="Contacts">
          <Filter filter={filter}
            onFilter={this.onFilter} />
          <ContactList contacts={filteredContacts}
            handleDelete={this.deleteContact} />
        </Section>
      </>
    );
  }
}