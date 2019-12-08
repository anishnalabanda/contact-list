import React, { Component } from 'react';
import ContactCard from '../contact-card/contact-card.jsx';
import './contacts-list.scss';
import Api from '../../api/api.js';

class ContactsList extends Component {

    constructor(props) {
        super(props);
        //Configuration used to display contacts
        this.configJson = {
            "title": "Contact List",
            "userUrl": "https://api.randomuser.me",
            "numberCards": 120,
            "tabs": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        };

        //Main variables are initialized only once.
        this.contactList = {};
        this.leftColumn = [];
        this.rightColumn = [];
        this.selectedTab = {};
        this.contactPosition={};

        //Sets the default state of the component
        this.state = {
            tabs: [],
            showContactCard: false
        };
    }

    //prepares contact list by segregating the contacts based on last name
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

    //sets the state to render the tabs
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

    //Retrieves the contacts list by making an API call
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
    
    //life cycle methods called once when component is mounted
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
                                    onClick={() => this.onTabClick(index, tab)}
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
                                    <div key={contact.name.first + index} id='contact' className='contact' onClick={(event) => this.onContactClick(event, contact)}>
                                        <span id='name' className='contact-first-name'>{`${contact.name.first},`}&nbsp;</span><span id='name' className='contact-last-name'>{contact.name.last}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='contacts'>
                            {
                                this.rightColumn.map((contact, index) => (
                                    <div key={contact.name.first + index} id='contact' className='contact' onClick={(event) => this.onContactClick(event, contact)}>
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
                            position={this.contactPosition}
                            contact={this.selectedContact}
                            closeContactCard={this.closeContactCard.bind(this)}
                        />
                        : null
                    }
                </div>
            </div >
        );
    }

    //event that is triggered when tab is clicked
    onTabClick(contactIndex, tab) {
        if(tab.style === 'disabled'){
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

    //event that is triggered when contact is clicked
    onContactClick(event, contact) {
        let target = event.target;
        if (target.id === 'name') {
            target = event.target.parentElement;
        }
        const pos = target.getClientRects()[0];
        this.contactPosition = { 'left': pos.left, 'top': pos.top + 55, 'width': pos.width - 30 };
        this.selectedContact = contact;
        this.openContactCard();
    }

    //sets the state to open the contact card
    openContactCard() {
        this.setState({
            showContactCard: true
        });
    }

    //sets the state to close the contact card
    closeContactCard() {
        this.setState({
            showContactCard: false
        });
    }
}

export default ContactsList;


