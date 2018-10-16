import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { DropZoneDirective } from "./drop-zone.directive";
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [AppComponent, DropZoneDirective, FileUploadComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

//npm install firebase angularfire2
