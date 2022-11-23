import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  async patchBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Cannot find board with id ${id}`);
    }

    return found;
  }

  async getBoards() {
    const boards = await this.find();
    return boards;
  }

  async deleteBoard(id: number) {
    await this.delete(id);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);

    return board;
  }
}
