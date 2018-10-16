import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UploadListComponent } from "./uploads/upload-list/upload-list.component";
import { UploadFormComponent } from "./uploads/upload-form/upload-form.component";
import { environment } from "../environments/environment";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { UploadService } from "./uploads/shared/upload.service";
import { DropZoneDirective } from './drop-zone.directive';

@NgModule({
  declarations: [AppComponent, UploadListComponent, UploadFormComponent, DropZoneDirective],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {}

//npm install firebase angularfire2
