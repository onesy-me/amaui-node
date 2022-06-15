/* tslint:disable: no-shadowed-variable */
import fs from 'fs';
import path from 'path';

import { assert } from '@amaui/test';

import AmauiNode from '../src';

group('@amaui/node', () => {

  group('AmauiNode', () => {

    group('file', () => {

      to('file', () => {
        const methods = AmauiNode.file;

        assert(methods.add).a('function');
        assert(methods.get).a('function');
        assert(methods.remove).a('function');
      });

      to('add', async () => {
        assert(await AmauiNode.file.add(path.resolve('a.txt'), 'a')).eq(true);

        assert(fs.readFileSync(path.resolve('a.txt'))).exist;
      });

      to('update', async () => {
        await AmauiNode.file.add(path.resolve('a.txt'), 'a');

        await AmauiNode.file.update(path.resolve('a.txt'), 'ad');

        assert(await AmauiNode.file.get(path.resolve('a.txt'), false)).eq('ad');
      });

      group('get', () => {

        pre(async () => await AmauiNode.file.add(path.resolve('a.txt'), 'a'));

        post(async () => await AmauiNode.file.remove(path.resolve('a.txt')));

        to('native', async () => {
          const data = await AmauiNode.file.get(path.resolve('a.txt'), true);

          assert(data.toString('utf-8')).eq('a');
        });

        to('string', async () => {
          const data = await AmauiNode.file.get(path.resolve('a.txt'), false);

          assert(data.toString('utf-8')).eq('a');
        });

      });

      to('remove', async () => {
        await AmauiNode.file.add(path.resolve('a.txt'), 'a');

        assert(await AmauiNode.file.remove(path.resolve('a.txt'))).eq(true);

        try {
          fs.readFileSync(path.resolve('a.txt'));
        }
        catch (error) {
          assert(error).exist;
        }
      });

    });

  });

});
