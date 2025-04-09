import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll(filter: FilterBookDto): Promise<Book[]> {
    const { author, category, rating, search } = filter;
    
    return this.prisma.book.findMany({
      where: {
        AND: [
          author ? { author: { contains: author } } : {},
          category ? { category: { contains: category } } : {},
          rating ? { rating: { gte: rating } } : {},
          search ? { title: { contains: search } } : {},
        ],
      },
    });
  }

  async findOne(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number): Promise<Book> {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}