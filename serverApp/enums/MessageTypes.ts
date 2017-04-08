import { Enum } from "typescript-string-enums";

export const MessageTypes = Enum(
	"MakeMove",
	"MoveResult",
	"FieldState",
	"GameState",
	"PlayerSettings"
);

export type MessageTypes = Enum<typeof MessageTypes>;