export class AppConfig {
	public static appHost: string = "localhost";
	public static appPort: number = 3000;
	public static appProtocol: string = "http";
	public static appServerAddress: string = AppConfig.appProtocol + "://" + AppConfig.appHost + AppConfig.appPort ? ":" +  AppConfig.appPort : "" + "/";
}