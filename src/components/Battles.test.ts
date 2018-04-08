
import { BattleOutcome } from "battlemovr";
import { stubBlankGame } from "../fakes.test";
import { IBattleTeam, IPartialBattleOptions, IPokemon } from "./Battles";

describe("Battles", () => {
    it("Ensures provided audio is played once a battle ends", (): void => {
        const { clock, fsp, player } = stubBlankGame();
        console.log(fsp.audioPlayer);
        const charmander = fsp.equations.newPokemon({
            level: 99,
            title: "CHARMANDER".split(""),
            moves: [
                {
                    remaining: 10,
                    title: "Growl",
                    uses: 10,
                },
                {
                    remaining: 10,
                    title: "Scratch",
                    uses: 10,
                },
            ],
        });
        fsp.itemsHolder.setItem(fsp.storage.names.pokemonInParty, [
            charmander,
        ]);
        const enemyPokemon: IPokemon = fsp.equations.newPokemon({
            level: 3,
            title: "PIDGEY".split(""),
            moves: [
                {
                    remaining: 10,
                    title: "Growl",
                    uses: 10,
                },
            ],
        });
        const startingExperience = charmander.experience;
        const temp = () => 0;
        fsp.battles.startBattle({
            teams: {
                opponent: {
                    actors: [enemyPokemon],
                },
            },
            texts: {
                start: (team: IBattleTeam): string =>
                    `Wild ${team.selectedActor.nickname.join("")} appeared!`,
            },
            endingtheme: "Casino",
        });
        fsp.battleMover.stopBattle(BattleOutcome.playerVictory, temp);
        fsp.audioPlayer.hasSound("theme", "Casino");
        console.log(fsp.audioPlayer.hasSound("theme", "Casino"));
    });
});
