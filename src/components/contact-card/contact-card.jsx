import React, { Component } from 'react';
import { AiOutlineCloseSquare } from "react-icons/ai";
import './contact-card.scss'

class ContactCard extends Component {

    render() {
        const { contact, position, closeContactCard } = this.props;
        console.log('contact :: ', contact);
        console.log('position :: ', position);
        return (
            <div className='contact-card' style={position}>

                <div className='contact-details'>
                    <div className='contact-display'>
                        <div className='contact-photo'>
                            <img src={contact.picture.large} />
                        </div>
                        <div className='contact-name'>
                            <span className='contact-last-name'>{`${contact.name.last},`}&nbsp;</span><span className='contact-first-name'>{contact.name.first}</span>
                        </div>
                    </div>
                    {/*div className='contact-seperator'><span className='border'></span></div>*/}
                    <div className='contact-info'>
                        <div className='contact-info-row'>
                            <span className='contact-detail-key'>email</span>
                            <span className='contact-detail-value'>{contact.email}</span>
                        </div>
                        <div className='contact-info-row'>
                            <span className='contact-detail-key'>phone</span>
                            <span className='contact-detail-value'>{contact.phone}</span>
                        </div>
                        <div className='contact-info-row'>
                            <span className='contact-detail-key'>street</span>
                            <span className='contact-detail-value'>{contact.location.street.number} {contact.location.street.name}</span>
                        </div>
                        <div className='contact-info-row'>
                            <span className='contact-detail-key'>city</span>
                            <span className='contact-detail-value'>{contact.location.city}</span>
                        </div>
                        <div className='contact-info-row'>
                            <span className='contact-detail-key'>state</span>
                            <span className='contact-detail-value'>{contact.location.state}</span>
                        </div>
                        <div className='contact-info-row'>
                            <span className='contact-detail-key'>postal code</span>
                            <span className='contact-detail-value'>{contact.location.postcode}</span>
                        </div>
                    </div>
                </div>
                <div className='close-icon'><AiOutlineCloseSquare onClick={closeContactCard} /></div>
            </div>
        );
    }
}

export default ContactCard;