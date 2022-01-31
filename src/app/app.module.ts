import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationGateway } from './domain/models/Publication/gateway/publication-gateway';
import { PublicationApiService } from './infrastructure/adapters/publication-api.service';
import { PublicationComponent } from './UI/view-models/publication/publication.component';
import { CommentsComponent } from './UI/view-models/comments/comments.component';
import { StateComponent } from './UI/view-models/state/state.component';
import { MenuComponent } from './UI/view-models/menu/menu.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PublicationComponent,
    CommentsComponent,
    StateComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{provide:PublicationGateway,useClass:PublicationApiService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
