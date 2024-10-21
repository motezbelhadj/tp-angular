import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NomDuServiceService } from './nom-du-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  providers: [NomDuServiceService], // Register the service here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newMessage: string = ''; 
  messages: { text: string; color: string }[] = [];  
  colors: string[] = ['red', 'blue', 'green', 'purple', 'orange'];

  sortModes: string[] = ['Random', 'Alphabetical', 'Descendant']; // Sorting modes
  currentSortModeIndex: number = 0; // Tracks the current sorting mode
  sortButtonLabel: string = `Sort: ${this.sortModes[this.currentSortModeIndex]}`; 
  showList: boolean = true; // Track whether the list is visible or hidden
  toggleButtonLabel: string = 'Hide'; 

  addMsg() {
    if (this.newMessage.trim()) {
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];  
      this.messages.push({ text: this.newMessage, color: randomColor }); 
      this.newMessage = '';  
    }
  }

  couleur() {
    this.messages = this.messages.map(msg => ({
      ...msg,
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    }));
  }

  DelMsg() {
    this.messages.pop();
  }

  // Function to sort messages based on the current sort mode and update the button label
  sortMessages() {
    const sortMode = this.sortModes[this.currentSortModeIndex];

    if (sortMode === 'Alphabetical') {
      // Sort alphabetically by text
      this.messages.sort((a, b) => a.text.localeCompare(b.text));
    } 
    else if (sortMode === 'Descendant') {
      // Sort alphabetically in reverse (Z-A)
      this.messages.sort((a, b) => b.text.localeCompare(a.text));
    } else if (sortMode === 'Random') {
      // Randomly shuffle the messages
      this.messages.sort(() => Math.random() - 0.5);
    }

    // Move to the next sort mode (cyclic behavior)
    this.currentSortModeIndex = (this.currentSortModeIndex + 1) % this.sortModes.length;

    // Update the button label to show the next sort mode
    this.sortButtonLabel = `Sort: ${this.sortModes[this.currentSortModeIndex]}`;
  }

  toggleListVisibility() {
    this.showList = !this.showList;
    console.log('showList:', this.showList); // Debugging line
    this.toggleButtonLabel = this.showList ? 'Hide' : 'Show';
  }
}
