import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register.component';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [AppComponent, RegisterComponent, UserListComponent],
  imports: [BrowserModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
