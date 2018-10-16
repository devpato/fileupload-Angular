import { Component, OnInit } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { Observable } from "rxjs/";
import { finalize } from "rxjs/operators";
import { AngularFirestore } from "angularfire2/firestore";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent implements OnInit {
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    // The storage path (the name of the file)
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata to know which app uploaded the file
    const customMetadata = { app: "My AngularFire-powered PWA!" };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection("photos").add({ path, size: snap.totalBytes });
        }
      })
    );

    // The file's download URL
    this.task
      .snapshotChanges()
      .pipe(
        finalize(
          () => (this.downloadURL = this.storage.ref(path).getDownloadURL())
        )
      )
      .subscribe();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  ngOnInit() {}
}
