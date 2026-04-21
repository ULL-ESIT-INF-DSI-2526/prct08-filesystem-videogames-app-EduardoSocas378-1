export var Platform;
(function (Platform) {
    Platform["PC"] = "PC";
    Platform["PS4"] = "PS4";
    Platform["PS5"] = "PS5";
    Platform["XBOX_ONE"] = "XBOX ONE";
    Platform["XBOX_SERIES_X"] = "XBOX SERIES X";
    Platform["NINTENDO_SWITCH"] = "NINTENDO SWITCH";
    Platform["STEAM_DECK"] = "STEAM DECK";
    Platform["OTHER"] = "OTHER";
})(Platform || (Platform = {}));
export var Genre;
(function (Genre) {
    Genre["ACTION"] = "Acci\u00F3n";
    Genre["ADVENTURE"] = "Aventura";
    Genre["RPG"] = "RPG";
    Genre["STRATEGY"] = "Estrategia";
    Genre["SIMULATION"] = "Simulaci\u00F3n";
    Genre["SPORTS"] = "Deportes";
    Genre["PUZZLE"] = "Puzzle";
    Genre["HORROR"] = "Horror";
    Genre["OTHER"] = "Otro";
})(Genre || (Genre = {}));
export class Videogame {
    id;
    name;
    description;
    platform;
    genre;
    developer;
    releaseYear;
    multiplayer;
    estimatedHours;
    marketValue;
    constructor(id, name, description, platform, genre, developer, releaseYear, multiplayer, estimatedHours, marketValue) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.platform = platform;
        this.genre = genre;
        this.developer = developer;
        this.releaseYear = releaseYear;
        this.multiplayer = multiplayer;
        this.estimatedHours = estimatedHours;
        this.marketValue = marketValue;
        if (releaseYear < 1950 || releaseYear > new Date().getFullYear()) {
            throw new Error("El año de lanzamiento debe estar entre 1950 y el año actual.");
        }
        if (estimatedHours < 0) {
            throw new Error("Las horas estimadas no pueden ser negativas.");
        }
        if (marketValue < 0) {
            throw new Error("El valor de mercado no puede ser negativo.");
        }
    }
}
