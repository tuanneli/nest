import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PostsModel} from "./posts.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(PostsModel) private postRepository: typeof PostsModel,
                private filesService: FilesService) {
    }

    async createPost(dto: CreatePostDto, image: any) {
        const fileName = await this.filesService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName})
        return post;
    }
}
