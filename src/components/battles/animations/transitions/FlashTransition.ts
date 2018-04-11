import { FullScreenPokemon } from "../../../../FullScreenPokemon";

import { Transition } from "./Transition";

/**
 * Flashing battle transition animation.
 */
export class FlashTransition<TGameStartr extends FullScreenPokemon> extends Transition<TGameStartr> {
    /**
     * How much to change the visible opacity each change.
     */
    private readonly change: number = 0.33;

    /**
     * Colors to flash in.
     */
    private readonly flashColors: string[] = ["Black", "White"];

    /**
     * How many times to flash.
     */
    private readonly flashes: number = 6;

    /**
     * How many game ticks between each opacity change.
     */
    private readonly speed: number = 1;

    /**
     * How many flashes have been completed.
     */
    private completed = 0;

    /**
     * Plays the transition.
     */
    public play(): void {
        this.flash();
    }

    /**
     * Flashes to and from a color.
     */
    private flash(): void {
        console.log(this);
        if (this.completed >= this.flashes) {
            this.settings.onComplete();
            return;
        }
        console.log("post");
        const color: string = this.flashColors[this.completed % this.flashColors.length];
        this.completed += 1;
        console.log(this.speed);
        this.gameStarter.actions.animateFadeToColor({
            color,
            change: this.change,
            speed: this.speed,
            callback: (): void => {
                this.gameStarter.actions.animateFadeFromColor({
                    color,
                    change: this.change,
                    speed: this.speed,
                    callback: (): void => this.play(),
                });
            },
        });
    }
}
