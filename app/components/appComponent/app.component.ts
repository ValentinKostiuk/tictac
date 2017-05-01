import {Component} from "@angular/core";
import {AppService} from "../../services/AppService";
import {AppStates} from "../../../shared/enums/AppStates";

@Component({
	selector: "tic-tac-app",
	templateUrl: "./app/components/appComponent/app.component.html",
	styleUrls: ["./app/components/appComponent/app.component.css"]
})
export class AppComponent {
	private showGame: boolean;

	constructor(private appService: AppService) {
		appService.appStateSource$.subscribe(
			(appState: AppStates) => {
				this.showGame = appState === AppStates.PartnerFound;
			});
	}
}
