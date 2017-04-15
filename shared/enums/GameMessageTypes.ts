import { Enum } from "typescript-string-enums";

export const GameMessageTypes = Enum(
	"MakeMove",
	"MoveResult",
	"FieldState",
	"GameState",
	"PlayerSettings"
);

export type GameMessageTypes = Enum<typeof GameMessageTypes>;