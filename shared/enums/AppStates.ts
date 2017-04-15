import { Enum } from "typescript-string-enums";

export const AppStates = Enum(
	"WaitingForPartner",
	"PartnerFound"
);

export type AppStates = Enum<typeof AppStates>;