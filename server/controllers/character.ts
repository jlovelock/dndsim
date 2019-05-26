// based on template from https://wanago.io/2019/01/14/express-postgres-relational-databases-typeorm/

import { Router, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { NotFoundException } from '../utils/errors';
import { Character, ICreateCharacterRequest } from '../models/character.entity';

class CharacterController {
  public path = '/character';
  public router = Router();
  private characterRepository = getRepository(Character);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createCharacter);
    this.router.get(`${this.path}/:id`, this.getCharacterById);
    this.router.get(this.path, this.getAllCharacters);
  }

  private createCharacter = async (request: Request, response: Response) => {
    const characterData: ICreateCharacterRequest = request.body;
    const newCharacter = this.characterRepository.create(characterData);
    await this.characterRepository.save(newCharacter);
    response.send(newCharacter);
  }

  private getCharacterById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const character = await this.characterRepository.findOne(id);
    if (character) {
      response.send(character);
    } else {
      next(new NotFoundException(id))
    }
  }

  private getAllCharacters = async (request: Request, response: Response) => {
    const characters = await this.characterRepository.find();
    response.send(characters);
  }
}

export default CharacterController;
