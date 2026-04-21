/**
 * Funcion que nos permite conocer el tamaño en bytes del directorio
 * en caso de que dentro del directorio exista otro directorio se comprueba el tamaño de el siguiente directorio de forma recursiva
 * @param directoryPath - ruta del directorio de cual queremos saber el tamaño
 * @returns - tamaño en bytes del directorio
 */
export declare function getDirectorySize(directoryPath: string): number;
/**
 * funcion auxiliar que realiza la copia de un directorio
 * @param source - ruta de origen del directorio a copiar
 * @param destination - ruta de destino donde se ubicará la copia
 * @returns - devuelve un valor numerico con el número de ficheros copiados además de realizar la copia en si misma
 */
export declare function copyDirectorySync(source: string, destination: string): number;
/**
 * Funcion que crea un string de con la fecha actual en el formato pedido en el enunciado YYYYMMDD_HHMMSS
 * @returns - devuelve un string con la fecha formateada
 */
export declare function getFormattedDate(): string;
/**
 * Funcion que invoca a la funcion auxiliar copyDirectorySync para realizar la copia de seguridad
 * añadiendole ademas el formato de fecha en el que se creo la copia de seguridad al baseName
 * @param sourceDir - ruta de la direccion de origen del directorio a copiar
 * @param backupLocation - ruta de destino donde se ubicará la copia
 */
export declare function createBackup(sourceDir: string, backupLocation: string): void;
/**
 * Funcion que lista las copias de seguridad de un directorio concreto ordenandolos por su fecha de creacion
 * @param backupLocation - directorio a comprobar
 */
export declare function listBackups(backupLocation: string): void;
/**
 * Funcion para recuperar un fichero de una copia de seguridad sobreescribiendo los archivos del mismo nombre
 * @param backupToRestore - directorio de seguridad a restaurar
 * @param originalLocation - ruta del directorio original a restaurar
 */
export declare function restoreBackup(backupToRestore: string, originalLocation: string): void;
