import { expect } from "chai";

import { stubBlankGame } from "../../fakes.test";
import { ICharacter, IThing } from ".././Things";
import { Walking } from "./Walking";

describe("Ledge test", () => {
    describe("isCharacterTouchingCharacter", () => {
        const stubCharacterType: [string, any] = ["Lady", {
            height: 16,
            width: 16,
        }];

        const stubLedge: [string, any] = ["Ledge", {
            height: 32,
            width: 32,
        }];

        it("demonstrates an npc cannot jump down a ledge", (): void => {
            // Arrange
            const { clock, player, fsp} = stubBlankGame(
                {
                    width: 512,
                    height: 512,
                },
            );
            const lady = fsp.objectMaker.make<ICharacter>("Lady", {
                    id: "Lady",
            });
            const ledge = fsp.objectMaker.make<ICharacter>("Ledge", {
            });
            fsp.things.add(lady, player.left, player.bottom + 32);
            fsp.things.add(ledge, lady.left, lady.bottom + 16);

            //Act
            fsp.actions.walking.startWalking(lady, 2);
            clock.tick(8);
            fsp.actions.walking.stopWalking(lady);
            console.log(lady);
            console.log(lady.bottom);
            console.log(ledge.top);
            // console.log(ledge.bottom);
            // console.log(lady.bottom);
            //Assert
            expect(ledge.top).to.be.equal(lady.bottom);
        });
    });
});
