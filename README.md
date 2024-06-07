WHACK A RYHNOC!
DSA-EKSAMEN


 
 
Beskrivelse af projekt
Whack a Rhynoc er et spil, hvor du skal slå Rhynocs, samle ædelsten og undgå at ramme Spyros venner som er Sparx og babydrager. Du skal klikke på elementerne på spillebrættet for at spille spillet.
Beskrivelse af Algoritmer og Datastrukturer
I spillet bruges forskellige algoritmer og datastrukturer til at styre logikken og visualiseringen:
•	Merge Sort: Bruges til at sortere portalpositionerne baseret på gemtyper for at sikre, at ædelstene vises i en bestemt rækkefølge på brættet.
•	Merge Sort-algoritmen er valgt til at sortere portalpositionerne baseret på gemtyper. Denne algoritme har en tidskompleksitet på O(n log n) og en plads kompleksitet på O(n). Ved at bruge Merge Sort sikres det, at ædelstene vises i den rigtige rækkefølge på brættet, hvilket forbedrer spillets æstetik og struktur. Alternativer som Bubble Sort eller Selection Sort kunne resultere i langsommere ydeevne og en mindre behagelig spiloplevelse på grund af deres højere tidskompleksitet.
•	Sammenligningsfunktion: En funktion, der sammenligner gemtyper for at sortere portalpositionerne korrekt efter gemtyper.
•	Tilfældighedsfunktioner: Bruges til at generere tilfældige positioner for Rhynocs, Sparx, babydrager og ædelstene på brættet.
Beskrivelse af Kode Struktur
Koden er struktureret på en måde, der gør det let at forstå og vedligeholde. De vigtigste punkter inkluderer:
•	Funktioner til at placere figurer: Der er separate funktioner til at placere Rhynocs, Sparx, babydrager og ædelstene på brættet.
•	Håndtering af klik på portaler: En funktion, der aktiveres, når en portal klikkes. Denne funktion styrer, hvordan spillet reagerer på brugerinput, f.eks. ved at tilføje point, fjerne ædelstene osv.
•	Modalvindue: Et modalvindue, der vises ved spillets start og slut. Det indeholder en kort instruktion og en knap til at starte eller genstarte spillet.

Inspiration
Spillet er inspireret af "Whack-a-Mole" spillet, hvor spilleren skal slå ting, der dukker op tilfældigt på en skærm. Derudover har jeg hentet inspiration fra følgende kilder:
•	Wikipedia: Merge Sort
•	https://www.geeksforgeeks.org/merge-sort/
Github: https://github.com/MathildeTrendy/WhackARhynoc
Deploy: https://mathildetrendy.github.io/WhackARhynoc/

![image](https://github.com/MathildeTrendy/WhackARhynoc/assets/113180048/d0dce24f-f864-4922-87c3-b3c7611ddb99)
