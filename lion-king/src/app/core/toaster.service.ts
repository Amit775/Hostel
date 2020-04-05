import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  SimpleSnackBar
} from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ToasterService {
  private ref: MatSnackBarRef<SimpleSnackBar>;
  constructor(private snackbar: MatSnackBar) {}

  commonConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: "top",
    horizontalPosition: "left"
  };

  info(message: string, application: string) {
    this.open(message, application, "info");
  }
  warn(message: string, application: string) {
    this.open(message, application, "warn");
  }
  error(message: string, application: string) {
    this.open(message, application, "error");
  }
  success(message: string, application: string) {
    this.open(message, application, "success");
  }

  private open(message: string, application: string, panelClass: string) {
    this.ref = this.snackbar.open(`${application}: ${message}`, null, {
      ...this.commonConfig,
      panelClass
    });
  }
}
