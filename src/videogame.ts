export enum Platform {
    PC = "PC",
    PS4 = "PS4",
    PS5 = "PS5",
    XBOX_ONE = "XBOX ONE",
    XBOX_SERIES_X = "XBOX SERIES X",
    NINTENDO_SWITCH = "NINTENDO SWITCH",
    STEAM_DECK = "STEAM DECK",
    OTHER = "OTHER"
}

export enum Genre {
    ACTION = "Acción",
    ADVENTURE = "Aventura",
    RPG = "RPG",
    STRATEGY = "Estrategia",
    SIMULATION = "Simulación",
    SPORTS = "Deportes",
    PUZZLE = "Puzzle",
    HORROR = "Horror",
    OTHER = "Otro"
}

export class Videogame {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public platform: Platform,
    public genre: Genre,
    public developer: string,
    public releaseYear: number,
    public multiplayer: boolean,
    public estimatedHours: number,
    public marketValue: number
  ) {
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