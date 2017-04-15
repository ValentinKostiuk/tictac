import { Enum } from "typescript-string-enums";

export const AppMessageTypes = Enum(
	"Status"
);

export type AppMessageTypes = Enum<typeof AppMessageTypes>;