## Röviden a projektről:
    -npm install    majd    npm start, segitségevel lehet futatni
    -igyekeztem teljesiteni minden követelményt meg plusz dolgot amit szivesen láttok, az egyetlen ami kimaradt az a next.js használata
    -ezen felül hozzáadtam egy similar movies listát a film részletes nézhetéhez, az ebben lévő filmeket /movie/${movieId}/similar 
    endpointról kértem le, valamint egy recently viewed listát a main pagen ahol azokat az filmeket jelenitem meg amelyekre a user
    rákattintott a sessionje folyamán
    -stilusozáshoz Tailwindet használtam
    -a hibákat egy error fallback scrennel kezeltem le, itt a user megpróbálhatja újra betölteni a meglevő url-t vagy a main
    pagere navigálhat át ahol a trending filmek jelennek meg újból. Nem lekezelt url kérésekor is ez az oldal térül vissza
    -loading statet vezettem be a lista valamint a részletes nézet betöltésének idejére. A main pagen a listában skeleeton cardok jelennek meg
    a loading state alatt a részletes nézetnél egy spinner

Vagány kis assignment volt, amit kiemelnék az a Tailwind, most használtam először de feletébb egyszerűnek és ugyanakkor jónak minősült bármilyen
stilusozás megvalósitásához.
