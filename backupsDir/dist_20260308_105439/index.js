import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { CollectionManager } from './collection.js';
import { Videogame } from './videogame.js';
// --- FUNCIÓN AUXILIAR PARA LOS COLORES DEL VALOR DE MERCADO ---
// El temario pide al menos 4 rangos de colores diferentes usando chalk
function getColoredValue(value) {
    if (value < 20)
        return chalk.red(`${value}€ (Ganga)`);
    if (value < 40)
        return chalk.yellow(`${value}€ (Económico)`);
    if (value < 70)
        return chalk.blue(`${value}€ (Precio estándar)`);
    return chalk.green(`${value}€ (Juego Premium)`);
}
// --- OPCIONES REUTILIZABLES ---
// Como 'add' y 'update' piden exactamente los mismos datos, los guardamos aquí para no repetir código.
const gameOptions = {
    user: { describe: 'Nombre del usuario', type: 'string', demandOption: true },
    id: { describe: 'ID del videojuego', type: 'number', demandOption: true },
    name: { describe: 'Nombre del videojuego', type: 'string', demandOption: true },
    desc: { describe: 'Descripción del juego', type: 'string', demandOption: true },
    platform: { describe: 'Plataforma', type: 'string', demandOption: true },
    genre: { describe: 'Género', type: 'string', demandOption: true },
    developer: { describe: 'Desarrolladora', type: 'string', demandOption: true },
    year: { describe: 'Año de lanzamiento', type: 'number', demandOption: true },
    multiplayer: { describe: 'Tiene multijugador', type: 'boolean', demandOption: true },
    hours: { describe: 'Horas estimadas de juego', type: 'number', demandOption: true },
    value: { describe: 'Valor de mercado en euros', type: 'number', demandOption: true }
};
// --- CONFIGURACIÓN DE YARGS ---
yargs(hideBin(process.argv))
    // 1. COMANDO ADD (AÑADIR)
    .command('add', 'Añade un nuevo videojuego', gameOptions, async (argv) => {
    try {
        const game = new Videogame(argv.id, argv.name, argv.desc, argv.platform, argv.genre, argv.developer, argv.year, argv.multiplayer, argv.hours, argv.value);
        const manager = new CollectionManager(argv.user);
        await manager.add(game);
        console.log(chalk.green(`New videogame added to ${argv.user} collection!`));
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    // 2. COMANDO UPDATE (MODIFICAR)
    .command('update', 'Modifica un videojuego existente', gameOptions, async (argv) => {
    try {
        const game = new Videogame(argv.id, argv.name, argv.desc, argv.platform, argv.genre, argv.developer, argv.year, argv.multiplayer, argv.hours, argv.value);
        const manager = new CollectionManager(argv.user);
        await manager.update(game);
        console.log(chalk.green(`Videogame updated at ${argv.user} collection!`));
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    // 3. COMANDO REMOVE (ELIMINAR)
    .command('remove', 'Elimina un videojuego', {
    user: { describe: 'Nombre del usuario', type: 'string', demandOption: true },
    id: { describe: 'ID del videojuego', type: 'number', demandOption: true }
}, async (argv) => {
    try {
        const manager = new CollectionManager(argv.user);
        await manager.delete(argv.id);
        console.log(chalk.green(`Videogame removed from ${argv.user} collection!`));
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    // 4. COMANDO READ (LEER UN JUEGO)
    .command('read', 'Muestra la información de un videojuego', {
    user: { describe: 'Nombre del usuario', type: 'string', demandOption: true },
    id: { describe: 'ID del videojuego', type: 'number', demandOption: true }
}, async (argv) => {
    try {
        const manager = new CollectionManager(argv.user);
        const game = await manager.read(argv.id);
        console.log(chalk.green(`\n--- Información del Juego (ID: ${game.id}) ---`));
        console.log(`Nombre: ${game.name}`);
        console.log(`Descripción: ${game.description}`);
        console.log(`Plataforma: ${game.platform}`);
        console.log(`Género: ${game.genre}`);
        console.log(`Desarrolladora: ${game.developer}`);
        console.log(`Año: ${game.releaseYear}`);
        console.log(`Multijugador: ${game.multiplayer ? 'Sí' : 'No'}`);
        console.log(`Horas estimadas: ${game.estimatedHours}h`);
        console.log(`Valor de mercado: ${getColoredValue(game.marketValue)}\n`);
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    // 5. COMANDO LIST (LISTAR TODOS)
    .command('list', 'Lista todos los videojuegos de un usuario', {
    user: { describe: 'Nombre del usuario', type: 'string', demandOption: true }
}, async (argv) => {
    try {
        const manager = new CollectionManager(argv.user);
        const games = await manager.list();
        if (games.length === 0) {
            console.log(chalk.yellow(`${argv.user} videogame collection is empty.`));
            return;
        }
        console.log(chalk.green(`\n${argv.user} videogame collection`));
        for (const game of games) {
            console.log(chalk.gray('--------------------------------'));
            console.log(`ID: ${game.id}`);
            console.log(`Name: ${game.name}`);
            console.log(`Description: ${game.description}`);
            console.log(`Platform: ${game.platform}`);
            console.log(`Genre: ${game.genre}`);
            console.log(`Developer: ${game.developer}`);
            console.log(`Year: ${game.releaseYear}`);
            console.log(`Multiplayer: ${game.multiplayer}`);
            console.log(`Estimated hours: ${game.estimatedHours}`);
            console.log(`Market value: ${getColoredValue(game.marketValue)}`);
        }
        console.log(chalk.gray('--------------------------------\n'));
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    .strict() // Falla si el usuario escribe un comando que no existe
    .help()
    .parse();
