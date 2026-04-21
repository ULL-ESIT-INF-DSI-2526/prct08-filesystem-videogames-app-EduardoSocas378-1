import { Videogame } from './videogame.js';
export declare class CollectionManager {
    private userDirectory;
    constructor(user: string);
    private ensureDirectoryExists;
    add(game: Videogame): Promise<void>;
    /**
    * MODIFICAR (UPDATE): Sobrescribe un juego existente.
    */
    update(game: Videogame): Promise<void>;
    /**
     * ELIMINAR (DELETE): Borra el archivo JSON del juego.
     */
    delete(id: number): Promise<void>;
    /**
     * MOSTRAR/LEER (READ): Lee un JSON y lo convierte de vuelta a un objeto Videogame.
     */
    read(id: number): Promise<Videogame>;
    /**
     * LISTAR (LIST): Lee todos los archivos de la carpeta del usuario y devuelve un array de Videogames.
     */
    list(): Promise<Videogame[]>;
}
