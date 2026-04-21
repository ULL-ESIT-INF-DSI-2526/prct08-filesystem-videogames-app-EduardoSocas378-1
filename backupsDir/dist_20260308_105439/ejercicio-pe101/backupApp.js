import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import path from 'path';
import { createBackup, listBackups, restoreBackup } from './backupManager.js';
const resolvePath = (p) => path.resolve(process.cwd(), p);
yargs(hideBin(process.argv))
    .command('create', 'Crea una copia de seguridad de un directorio', {
    source: { describe: 'Ruta del directorio a respaldar', type: 'string', demandOption: true },
    dest: { describe: 'Ruta donde guardar la copia', type: 'string', demandOption: true }
}, (argv) => {
    try {
        const sourcePath = resolvePath(argv.source);
        const destPath = resolvePath(argv.dest);
        console.log(chalk.blue(`creando copia de seguridad`));
        createBackup(sourcePath, destPath);
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    .command('list', 'Lista las copias de seguridad existentes en un directorio', {
    location: { describe: 'Directorio donde se guardan las copias', type: 'string', demandOption: true }
}, (argv) => {
    try {
        const locationPath = resolvePath(argv.location);
        listBackups(locationPath);
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    .command('restore', 'Restaura una copia de seguridad en un directorio destino', {
    backup: { describe: 'Ruta exacta de la copia de seguridad a restaurar', type: 'string', demandOption: true },
    dest: { describe: 'Ruta original donde restaurar los archivos', type: 'string', demandOption: true }
}, (argv) => {
    try {
        const backupPath = resolvePath(argv.backup);
        const destPath = resolvePath(argv.dest);
        console.log(chalk.blue(`Iniciando tarea de restauración`));
        restoreBackup(backupPath, destPath);
    }
    catch (error) {
        console.log(chalk.red(error.message));
    }
})
    .strict()
    .help()
    .parse();
