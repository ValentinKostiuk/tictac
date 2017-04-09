import { AppConfig } from "../../shared/configuration/appConfig";
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from '../components/app.component';
import * as io from "socket.io-client";

@NgModule({
	imports:      [ BrowserModule ],
	declarations: [ AppComponent ],
	bootstrap:    [ AppComponent ]
})
export class AppModule {
	constructor(){
		var socket = io.connect(AppConfig.appServerAddress);

		var playerType;

		socket.on('status', function (data) {
			console.log(data);
		});

		socket.on('PlayerSettings', function (data) {
			console.log('PlayerSettings', data.type);
			playerType = data.type;
		});

		socket.on('FieldState', function (data) {
			console.log(data);
		});

		socket.on('GameState', function (data) {
			console.log('HELLO', data);
		});

		var iteration = 0;
		var moves = [
			{
				x: 0,
				y: 0
			},
			{
				x: 1,
				y: 1
			},
			{
				x: 2,
				y: 2
			}
		];

		socket.on('MakeMove', function (data) {
			console.info('got make move');
			setTimeout(function () {
				if(playerType == 1) {
					socket.emit('MoveResult', moves[iteration]);
					console.warn('resultSent');
					iteration++;
				} else {
					socket.emit('MoveResult', {
						x: 1,
						y: 2
					});
				}
			}, 2000)
		});
	}
}