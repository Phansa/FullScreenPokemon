
import { BattleOutcome } from "battlemovr";
import { MenuGraphr } from "menugraphr";
import * as sinon from "sinon";
import { stubBlankGame } from "../fakes.test";
import { IBattleTeam, IPartialBattleOptions, IPokemon } from "./Battles";
import { Ending } from "./battles/animations/Ending";

describe("Battles", () => {
    it("Ensures provided audio is played once a battle ends", (): void => {
        const { clock, fsp, player } = stubBlankGame();
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
        fsp.battles.animations.complete(BattleOutcome.playerVictory, temp);
        clock.tick(250);
        console.log(fsp.audioPlayer);
        //console.log(fsp.audioPlayer.hasSound("theme", "Casino"));
    });

    it("Ensures a status condition sprite is displayed when pokemon is affected by a status condition", (): void => {
        const { clock, fsp, player } = stubBlankGame(
            {height: 1000,
             width: 1000},
        );
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
        charmander.status = "paralyzed";
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
        });
        clock.tick(1000);
        console.log(fsp.timeHandler);
        console.log(fsp.menuGrapher);
    });
});
