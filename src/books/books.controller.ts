import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { FilterBookDto } from './dto/filter-book.dto';
  import { AuthGuard } from '../auth/auth.guard';
  
  @Controller('books')
  @UseGuards(AuthGuard)
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
      return this.booksService.create(createBookDto);
    }
  
    @Get()
    findAll(@Query() filter: FilterBookDto) {
      return this.booksService.findAll(filter);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.booksService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
      return this.booksService.update(+id, updateBookDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.booksService.remove(+id);
    }
  }