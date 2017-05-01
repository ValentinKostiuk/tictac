import { Enum } from "typescript-string-enums";

export const GameStates = Enum(
	"Win",
	"Lose"
);

export type GameStates = Enum<typeof GameStates>;