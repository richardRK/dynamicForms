import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}


  alert() {
    this.snackBar.open("Submitted Successfully", "Fechar", {
      duration: 2000
    });
  }

  warn() {
    this.snackBar.open("Closing snack bar in a few seconds", "Fechar", {
      duration: 2000
    });
  }
}
