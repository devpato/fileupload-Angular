import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UploadListComponent } from "./uploads/upload-list/upload-list.component";
import { UploadFormComponent } from "./uploads/upload-form/upload-form.component";
import { environment } from "../environments/environment";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { UploadService } from "./uploads/shared/upload.service";

@NgModule({
  declarations: [AppComponent, UploadListComponent, UploadFormComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {}

//npm install firebase angularfire2
