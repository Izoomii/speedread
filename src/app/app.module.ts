import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatTooltipModule } from "@angular/material/tooltip";

import { AppComponent } from "./app.component";
import { AboutComponent } from "./about";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home";

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [BrowserModule, MatTooltipModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
