# quickwits

Quiplash clone with new features.

# Dependencies
1. Redis
2. Postgresql

# How to run
1. ```createdb quickwits``` 
2. ```yarn install```
3. ```yarn dev```
4. Check out `localhost:3000/` for the game.
5. Check out `localhost:4000/graphql` for back-end graphql tests.

# Notes
Currently runs in development mode. To run in prod, enable https cookies in ```server/src/index.ts``` and change localhost to the domain name of the sever where it'll be hosted at.

# Game Flow
![game state dfa](https://images-ext-2.discordapp.net/external/v9HMO3khEklTLG3Tv5xKtr4rzNxcTe7FRYH03pFmAQM/http/www.plantuml.com/plantuml/png/TP7Dhjem48NtUOfPWk09Yf1eGUgcj8YgFxl8IORWDXv7up6Gjx_-kLAubjZPu-CptvpPEL4itWnLEbJw0WljljcccPOWLoHOJEYM5S2dCrA737-K5atzsLe3hJMZ9IJPH45o-E95B86mxdja1xqo2CQB4XtB5jgheXuXY0NZVUHW8cvJuU0mjp_bKWbmzEdFQL0JCjZc7xRYeWLZY_g6izLC-svLa1PE1CutHWieSdVa3oo_RPpsHHRviJ0FHGmDbGj-FCyUIQCBV5K6C_qpJ0ngJYMdb6Bsr3tpx9yVIgpz5Tl_yRj3XA2lwzOp8qbIrpLijw5s_FotFl_uzVtmiwuJGL0AUrndrW8bt-mDEMaZoVhL4a5H1tFBRhNAwB1ObfFc03Ahm5qJfGPpjBeLorEHxG6Ti9soHMmsfXKwy444622d80PywBGOorc9Zr4pnhrIfo-L4pjMkt3sPdW3?width=1438&height=269)

![game state example](https://images-ext-1.discordapp.net/external/Hd1cCkESVHgdq3oj5X3wDwp108pMT2aw3I_fE4Z7FHw/http/www.plantuml.com/plantuml/png/pSwnQiD030RW_Pv23s0yT6z9QA5Jcs9ewHOKdx0DFidevAGcvDrxZaCn5Aycqu5-dVvl4mtL-j2wW1syOY0uEwZIko_54pm-WL4q1vrAw2oEWtEUvmMobm0Vq_IIyXO7qYb7hmro1iXM2myPbBKsCGCMhDDgghJhvLOEXy71gM4cJGDtSN-Cs-KLDRUR2vujnnFf_NY-n6XDpL6iuMe1yrmZLoakf6U_8ehfnwwTSnUKlIhn58nR3tFgxaYwed2iaLGv0yBqzx_pRVkzBtQVxo_9ko7sVMX_0G00)

![player state example](https://images-ext-1.discordapp.net/external/nuxr2LXhtgi1VJ-PAGkL9xQnLW5nDoPD6iqv4PqphHE/http/www.plantuml.com/plantuml/png/pPAnoi8m58NtFCLzW7ze_r5GMXn445kqk9QB2JNGt9GaLQJqtKsReUBGoOBRFOVBETzm4klGk5RLJ643UOrFOQ1Zq5fX29M0zGQG6ud4eFAwl6e-cavOnq3owI4uZT6gSNQmlT2ImXsndhrLvE7hMqrTo8jNqFL_4CJ_8FePXfJiGvWb671CdaWcQuxdeftu7Phj3QcIL9rqIto9HSJHH-FEXsNtPUPNP4LwAFDiVopElZKHnFtcNm00)

# Screenshots
![create game](https://media.discordapp.net/attachments/804092432563830865/833144696742215760/image.png?width=1227&height=690)
![lobby](https://user-images.githubusercontent.com/20095580/115130747-12084080-9fc0-11eb-88a9-c5581798c0f0.png)
![prompt creation](https://media.discordapp.net/attachments/804092432563830865/833144749116096522/image.png?width=1227&height=690)
![voting](https://user-images.githubusercontent.com/20095580/115130768-3bc16780-9fc0-11eb-9e79-b12a63538fd7.png)
