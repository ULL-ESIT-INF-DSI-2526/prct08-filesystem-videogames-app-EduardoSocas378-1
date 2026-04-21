export declare enum Platform {
    PC = "PC",
    PS4 = "PS4",
    PS5 = "PS5",
    XBOX_ONE = "XBOX ONE",
    XBOX_SERIES_X = "XBOX SERIES X",
    NINTENDO_SWITCH = "NINTENDO SWITCH",
    STEAM_DECK = "STEAM DECK",
    OTHER = "OTHER"
}
export declare enum Genre {
    ACTION = "Acci\u00F3n",
    ADVENTURE = "Aventura",
    RPG = "RPG",
    STRATEGY = "Estrategia",
    SIMULATION = "Simulaci\u00F3n",
    SPORTS = "Deportes",
    PUZZLE = "Puzzle",
    HORROR = "Horror",
    OTHER = "Otro"
}
export declare class Videogame {
    id: number;
    name: string;
    description: string;
    platform: Platform;
    genre: Genre;
    developer: string;
    releaseYear: number;
    multiplayer: boolean;
    estimatedHours: number;
    marketValue: number;
    constructor(id: number, name: string, description: string, platform: Platform, genre: Genre, developer: string, releaseYear: number, multiplayer: boolean, estimatedHours: number, marketValue: number);
}
