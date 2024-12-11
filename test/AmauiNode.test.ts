/* tslint:disable: no-shadowed-variable */
import fs from 'fs';
import path from 'path';

import { assert } from '@onesy/test';

import OnesyNode from '../src';

group('OnesyNode', () => {

  group('file', () => {

    to('file', () => {
      const methods = OnesyNode.file;

      assert(methods.add).a('function');
      assert(methods.get).a('function');
      assert(methods.remove).a('function');
    });

    to('add', async () => {
      assert(await OnesyNode.file.add(path.resolve('a.txt'), 'a')).eq(true);

      assert(fs.readFileSync(path.resolve('a.txt'))).exist;
    });

    to('update', async () => {
      await OnesyNode.file.add(path.resolve('a.txt'), 'a');

      await OnesyNode.file.update(path.resolve('a.txt'), 'ad');

      assert(await OnesyNode.file.get(path.resolve('a.txt'), false)).eq('ad');
    });

    group('get', () => {

      pre(async () => await OnesyNode.file.add(path.resolve('a.txt'), 'a'));

      post(async () => await OnesyNode.file.remove(path.resolve('a.txt')));

      to('native', async () => {
        const data = await OnesyNode.file.get(path.resolve('a.txt'), true);

        assert(data.toString('utf-8')).eq('a');
      });

      to('string', async () => {
        const data = await OnesyNode.file.get(path.resolve('a.txt'), false);

        assert(data.toString('utf-8')).eq('a');
      });

    });

    to('remove', async () => {
      await OnesyNode.file.add(path.resolve('a.txt'), 'a');

      assert(await OnesyNode.file.remove(path.resolve('a.txt'))).eq(true);

      try {
        fs.readFileSync(path.resolve('a.txt'));
      }
      catch (error) {
        assert(error).exist;
      }
    });

  });

});
