import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { findProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model/product.model';

@Controller('product')
export class ProductController {

	@Post('create')
	async create(@Body() dto: Omit<ProductModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	delete(@Param('id') id: string) {}

	@Patch(':id')
	patch(@Param('id') id: string, @Body() dto: ProductModel) {}
	
	@HttpCode(2007)
	@Post()
	find(@Body() dto: findProductDto) {}
}
