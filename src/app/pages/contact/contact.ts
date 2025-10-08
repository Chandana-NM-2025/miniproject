import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
 
      name = '';
  email = '';
  message = '';

  submitContact() {
    if(this.name && this.email && this.message) {
      alert(`Thank you, ${this.name}! Your message has been received.`);
      // Reset form
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      alert('Please fill all fields.');
    }
  }
}
  
