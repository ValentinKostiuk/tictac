import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from '../components/app.component';
import {AppService} from '../services/AppService'
import {GameService} from "../services/GameService";

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers: [AppService, GameService]
})
export class AppModule {
	constructor(private appService: AppService) {
	}
}