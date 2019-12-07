import React, { Component } from 'react';
import ContactCard from '../contact-card/contact-card.jsx';
import './contacts-list.scss';
import Api from '../../api/api.js';

class ContactsList extends Component {

    constructor(props) {
        super(props);
        this.configJson = {
            "title": "Contact List",
            "userUrl": "https://api.randomuser.me",
            "numberCards": 120,
            "tabs": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        };
        this.contactList = {};
        this.leftColumn = [];
        this.rightColumn = [];
        this.selectedTab = {};
        this.state = {
            tabs: [],
            showContactCard: false
        };
    }

    prepareContactList(results) {
        results.forEach(contact => {
            const letter = contact.name.last[0].toLowerCase();
            if (!this.contactList[letter]) {
                this.contactList[letter] = [];
                this.contactList[letter].push(contact);
            } else {
                this.contactList[letter].push(contact);
            }
        });
    }

    setTabsData() {
        const tabs = [];
        this.configJson.tabs.forEach(tab => {
            const noOfContacts = (this.contactList[tab]) ? this.contactList[tab].length : 0;
            const contactStyle = (noOfContacts === 0) ? 'disabled' : '';
            tabs.push({ value: tab, contacts: noOfContacts, style: contactStyle });
        });
        const index = tabs.findIndex(tab => tab.contacts > 0);
        if (~index) {
            tabs[index].style = 'selected';
            this.selectedTab = tabs[index];
        }
        this.setState({ tabs });
    }

    getRandomContacts() {
        const request = Api.makeRemoteRequest(this.configJson);
        console.log('request :: ', request);
        request.then(response => response.json())
            .then(response => {
                this.prepareContactList(response.results);
                this.setTabsData();
            })
            .catch(error => {
                console.log('error :: ', error);
            });
    }

    componentDidMount() {
       this.getRandomContacts();
    }

    render() {
        const displayContacts = (this.selectedTab.value) ? this.contactList[this.selectedTab.value] : [];
        const contactsDelimiter = Math.ceil(displayContacts.length / 2);
        if (contactsDelimiter > 0) {
            this.leftColumn = displayContacts.slice(0, contactsDelimiter);
            this.rightColumn = displayContacts.slice(contactsDelimiter, displayContacts.length);
        }
        return (
            <div className='contacts-main'>
                <div className='contacts-outer-box'>
                    <div className='contacts-tabs'>
                        {
                            this.state.tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={`contact-tab ${tab.style}`}
                                    onClick={() => this.onContactListChange(index, tab)}
                                >
                                    <div className='contact-tab-data'>
                                        <span className={`contact-index ${tab.style}`}>{tab.value}</span>
                                        <span className={`contact-index-number ${tab.style}`}>{tab.contacts}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='contacts-list'>
                        <div className='contacts'>
                            {
                                this.leftColumn.map((contact, index) => (
                                    <div key={contact.name.first + index} id='contact' className='contact' onClick={(event) => this.onContactShowChange(event, contact)}>
                                        <span id='name' className='contact-first-name'>{`${contact.name.first},`}&nbsp;</span><span id='name' className='contact-last-name'>{contact.name.last}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='contacts'>
                            {
                                this.rightColumn.map((contact, index) => (
                                    <div key={contact.name.first + index} id='contact' className='contact' onClick={(event) => this.onContactShowChange(event, contact)}>
                                        <span id='name' className='contact-first-name'>{`${contact.name.first},`}&nbsp;</span><span id='name' className='contact-last-name'>{contact.name.last}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.showContactCard ?
                        <ContactCard
                            position={this.position}
                            contact={this.selectedContact}
                            closeContactCard={this.closeContactCard.bind(this)}
                        />
                        : null
                    }
                </div>
            </div >
        );
    }

    onContactListChange(contactIndex, contact) {
        if(contact.style === 'disabled'){
            return;
        }
        const tabs = this.state.tabs;
        this.leftColumn = [];
        this.rightColumn = [];
        tabs.forEach((tab, index) => {
            if (tab.style === 'disabled') {
                return;
            }
            if (index === contactIndex) {
                tab.style = 'selected';
                this.selectedTab = tab;
            } else {
                tab.style = '';
            }
        });
        this.setState({ tabs, showContactCard: false });
    }

    onContactShowChange(event, contact) {
        let target = event.target;
        if (target.id === 'name') {
            target = event.target.parentElement;
        }
        const pos = target.getClientRects()[0];
        this.position = { 'left': pos.left, 'top': pos.top + 55, 'width': pos.width - 30 };
        this.selectedContact = contact;
        this.openContactCard();
    }

    openContactCard() {
        this.setState({
            showContactCard: true
        });
    }

    closeContactCard() {
        this.setState({
            showContactCard: false
        });
    }
}

export default ContactsList;


