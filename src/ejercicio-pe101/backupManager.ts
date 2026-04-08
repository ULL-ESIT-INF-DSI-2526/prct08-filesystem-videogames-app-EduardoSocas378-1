import fs from 'fs'
import path from 'path'

/**
 * Funcion que nos permite conocer el tamaño en bytes del directorio
 * en caso de que dentro del directorio exista otro directorio se comprueba el tamaño de el siguiente directorio de forma recursiva
 * @param directoryPath - ruta del directorio de cual queremos saber el tamaño
 * @returns - tamaño en bytes del directorio
 */
export function getDirectorySize(directoryPath: string): number {
  let directorySize = 0;
  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
        directorySize += getDirectorySize(itemPath);
    } else {
        directorySize += stats.size;
    }
  }
  return directorySize;

}

/**
 * funcion auxiliar que realiza la copia de un directorio 
 * @param source - ruta de origen del directorio a copiar
 * @param destination - ruta de destino donde se ubicará la copia
 * @returns - devuelve un valor numerico con el número de ficheros copiados además de realizar la copia en si misma
 */
export function copyDirectorySync(source: string, destination:string): number {
  let numOfFilesCopied = 0;

  //si no existe el directorio de destino creamos uno nuevo
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, {recursive: true});
  }

  const items = fs.readdirSync(source);

  for (const item of items) {
    const srcPath = path.join(source, item);
    const destPath = path.join(destination, item);
    const stats = fs.statSync(srcPath);
    if (stats.isDirectory()){
      numOfFilesCopied += copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      numOfFilesCopied++;
    }
  }

  return numOfFilesCopied;
}

/**
 * Funcion que crea un string de con la fecha actual en el formato pedido en el enunciado YYYYMMDD_HHMMSS
 * @returns - devuelve un string con la fecha formateada
 */
export function getFormattedDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

/**
 * Funcion que invoca a la funcion auxiliar copyDirectorySync para realizar la copia de seguridad
 * añadiendole ademas el formato de fecha en el que se creo la copia de seguridad al baseName
 * @param sourceDir - ruta de la direccion de origen del directorio a copiar
 * @param backupLocation - ruta de destino donde se ubicará la copia
 */

export function createBackup(sourceDir: string, backupLocation: string): void {
  if(!fs.existsSync(sourceDir)) {
    throw new Error(`${sourceDir} no es un directorio`);
  }
  if(!fs.statSync(sourceDir).isDirectory()) {
    throw new Error(`${sourceDir} no es un directorio`);
  }
  if (!fs.existsSync(backupLocation)) {
    fs.mkdirSync(backupLocation, {recursive: true});
  }

  const baseName = path.basename(sourceDir);
  const time = getFormattedDate();
  const backupFolderName = `${baseName}_${time}`;

  const destinationDir = path.join(backupLocation, backupFolderName);
  const filesCopied = copyDirectorySync(sourceDir, destinationDir);
  console.log(`copia de seguridad de '${baseName} creada con exito en: ${destinationDir}`);
  console.log(`numero de archivos copiados: ${filesCopied}`);
}

/**
 * Funcion que lista las copias de seguridad de un directorio concreto ordenandolos por su fecha de creacion
 * @param backupLocation - directorio a comprobar 
 */
export function listBackups(backupLocation: string): void {
  if (!fs.existsSync(backupLocation)) {
    console.log(`La ubicacion de copias '${backupLocation}' esta vacia o no existe.`);
    return;
  }

  const items = fs.readdirSync(backupLocation);
  const backupsInfo = [];

  for (const item of items) {
    const itemPath = path.join(backupLocation, item);
    const stats = fs.statSync(itemPath);

    if(stats.isDirectory()) {
        const sizeBytes = getDirectorySize(itemPath);
        const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);

        backupsInfo.push({
          name: item,
          size: `${sizeMB} MB`,
          createdAt: stats.birthtime
        });
    }
  }

  backupsInfo.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (backupsInfo.length === 0) {
    console.log("no hay copias de seguridad registradas.");
  } else {
    backupsInfo.forEach((b, index) => {
      console.log(`${b.name} | Tamaño: ${b.size} | Fecha: ${b.createdAt.toLocaleString()}`);
    });
  }
}

/**
 * Funcion para recuperar un fichero de una copia de seguridad sobreescribiendo los archivos del mismo nombre
 * @param backupToRestore - directorio de seguridad a restaurar
 * @param originalLocation - ruta del directorio original a restaurar
 */
export function restoreBackup(backupToRestore: string, originalLocation: string): void{
  if (!fs.existsSync(backupToRestore)){
    throw new Error(`la copia de seguridad no existe`)
  }

  if (fs.existsSync(originalLocation)) {
    const itemsInside = fs.readdirSync(originalLocation);
    if (itemsInside.length > 0) {
      console.log(`se sobreescribirán los archivos con el mismo nombre`);
    }
  }
  const filesRestored = copyDirectorySync(backupToRestore, originalLocation);
  console.log(`archivos restaurados: ${filesRestored}`);
}
