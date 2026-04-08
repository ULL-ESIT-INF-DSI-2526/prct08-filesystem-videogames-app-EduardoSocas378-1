import fs from 'fs/promises';
import path from 'path';
import { Videogame } from './videogame.js';

export class CollectionManager {
   private userDirectory: string;

   constructor(user: string) {
      this.userDirectory = path.join(process.cwd(), user);
   }

   private async ensureDirectoryExists(): Promise<void> {
      try {
         await fs.access(this.userDirectory);
      } catch (error) {
         await fs.mkdir(this.userDirectory, { recursive: true });
      }
   }

   public async add(game: Videogame): Promise<void> {
      await this.ensureDirectoryExists();
      const filePath = path.join(this.userDirectory, `${game.id}.json`);
      
      try {
         await fs.access(filePath);
         throw new Error(`El juego con ID ${game.id} ya existe.`);
      } catch (error: any) {
         if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, JSON.stringify(game, null, 2));
         } else {
            throw error;
         }
      }
    } 

    /**
    * MODIFICAR (UPDATE): Sobrescribe un juego existente.
    */
   public async update(game: Videogame): Promise<void> {
      const filePath = path.join(this.userDirectory, `${game.id}.json`);
      
      try {
         // Verificamos que el archivo SÍ exista antes de actualizar
         await fs.access(filePath);
         // Si llegamos aquí, el archivo existe. Lo sobrescribimos.
         await fs.writeFile(filePath, JSON.stringify(game, null, 2));
      } catch (error: any) {
         if (error.code === 'ENOENT') {
            throw new Error(`Error: El juego con ID ${game.id} no existe en la colección.`);
         }
         throw error;
      }
   }

   /**
    * ELIMINAR (DELETE): Borra el archivo JSON del juego.
    */
   public async delete(id: number): Promise<void> {
      const filePath = path.join(this.userDirectory, `${id}.json`);
      
      try {
         // fs.unlink borra un archivo físicamente del disco
         await fs.unlink(filePath);
      } catch (error: any) {
         if (error.code === 'ENOENT') {
            throw new Error(`Error: No se puede eliminar. El juego con ID ${id} no existe.`);
         }
         throw error;
      }
   }

   /**
    * MOSTRAR/LEER (READ): Lee un JSON y lo convierte de vuelta a un objeto Videogame.
    */
   public async read(id: number): Promise<Videogame> {
      const filePath = path.join(this.userDirectory, `${id}.json`);
      
      try {
         // fs.readFile lee el contenido crudo (Buffer) del archivo. Con 'utf-8' nos lo da en texto.
         const data = await fs.readFile(filePath, 'utf-8');
         const parsed = JSON.parse(data);
         
         // ¡REHIDRATACIÓN! Convertimos el JSON plano en una instancia real de nuestra clase
         return new Videogame(
            parsed.id, parsed.name, parsed.description, parsed.platform, 
            parsed.genre, parsed.developer, parsed.releaseYear, 
            parsed.multiplayer, parsed.estimatedHours, parsed.marketValue
         );
      } catch (error: any) {
         if (error.code === 'ENOENT') {
            throw new Error(`Error: El juego con ID ${id} no se encontró en la colección.`);
         }
         throw error;
      }
   }

   /**
    * LISTAR (LIST): Lee todos los archivos de la carpeta del usuario y devuelve un array de Videogames.
    */
   public async list(): Promise<Videogame[]> {
      await this.ensureDirectoryExists();
      
      try {
         // fs.readdir nos devuelve un array con los nombres de los archivos (ej: ["1.json", "2.json"])
         const files = await fs.readdir(this.userDirectory);
         
         const games: Videogame[] = [];
         
         for (const file of files) {
            if (file.endsWith('.json')) {
               // Extraemos el ID del nombre del archivo (quitándole el .json)
               const id = parseInt(file.replace('.json', ''), 10);
               // Usamos nuestro propio método 'read' para rehidratar el juego
               const game = await this.read(id);
               games.push(game);
            }
         }
         
         return games;
      } catch (error) {
         throw new Error("Error al intentar listar la colección.");
      }
   }
}