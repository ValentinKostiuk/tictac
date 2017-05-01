import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent}   from "../components/appComponent/app.component";
import {AppService} from "../services/AppService"
import {GameService} from "../services/GameService";
import {GameComponent} from "../components/gameComponent/game.component";
import {FieldComponent} from "../components/fieldComponent/field.component";
import {CellComponent} from "../components/cellComponent/cell.component";

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, GameComponent, FieldComponent, CellComponent],
	bootstrap: [AppComponent],
	providers: [AppService, GameService]
})
export class AppModule {
	constructor(private appService: AppService) {
	}
}