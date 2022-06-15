import fs from 'fs';

class AmauiNode {

  public static get file() {
    const add = (name: string, data: any): Promise<boolean | Error> => {
      return new Promise((resolve, reject) => {
        fs.writeFile(name, data, (error: Error) => {
          if (error) return reject(error);

          return resolve(true);
        });
      });
    };

    return {
      add,

      // Alias for add
      update: add,

      get(path: string, native = true): Promise<Buffer | string | Error> {
        return new Promise((resolve, reject) => {
          fs.readFile(path, (error: Error, data: Buffer) => {
            if (error) return reject(error);

            return resolve(native ? data : data.toString('utf-8'));
          });
        });
      },

      remove(path: string): Promise<boolean | Error> {
        return new Promise((resolve, reject) => {
          fs.unlink(path, (error: Error) => {
            if (error) return reject(error);

            return resolve(true);
          });
        });
      }
    };
  }

}

export default AmauiNode;
