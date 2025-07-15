import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IRepository } from '../regions.repository';
import {
    Region,
    RegionListRequestDto,
    RegionListResponseDto,
    RegionTypeEnum,
    SortEnum,
    RegionWithBundlesRequestDto,
} from '@app/shared';

@Injectable()
export class RepositoryMongoDB implements IRepository {
    constructor(@InjectModel(Region.name) private model: Model<Region>) {}

    async findAll(dto: RegionListRequestDto): Promise<RegionListResponseDto> {
        const { sort, searchText, isPopular, acceptLanguage } = dto;
        const [result]: RegionListResponseDto[] = await this.model.aggregate([
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                {
                                    $and: [
                                        ...(isPopular !== undefined
                                            ? [{ isPopular: true }]
                                            : []),
                                        { regionType: RegionTypeEnum.local },
                                    ],
                                },
                                { regionType: RegionTypeEnum.regional },
                                { regionType: RegionTypeEnum.global },
                            ],
                        },
                        ...(searchText
                            ? [{ $text: { $search: searchText } }]
                            : []),
                    ],
                },
            },
            {
                $addFields: {
                    ...(searchText ? [{ score: { $meta: 'textScore' } }] : []),
                    name: {
                        $cond: {
                            if: {
                                $ne: [
                                    {
                                        $ifNull: [
                                            `$name.${acceptLanguage}`,
                                            '',
                                        ],
                                    },
                                    '',
                                ],
                            },
                            then: `$name.${acceptLanguage}`,
                            else: '$name.en',
                        },
                    },
                },
            },
            {
                $sort: {
                    ...(searchText
                        ? { score: { $meta: 'textScore' } }
                        : { listOrderNumber: sort === SortEnum.desc ? 1 : -1 }),
                },
            },
            {
                $lookup: {
                    from: 'bundles',
                    localField: 'code',
                    foreignField: 'regionCode',
                    as: 'bundles',
                },
            },
            {
                $addFields: {
                    totalBundles: { $size: '$bundles' },
                    startingFrom: { $min: '$bundles.price' },
                },
            },
            { $project: { bundles: 0 } },
            {
                $facet: {
                    countries: [
                        {
                            $match: {
                                $and: [
                                    ...(isPopular !== undefined
                                        ? [{ isPopular: true }]
                                        : []),
                                    { regionType: RegionTypeEnum.local },
                                ],
                            },
                        },
                    ],
                    regions: [
                        { $match: { regionType: RegionTypeEnum.regional } },
                    ],
                    globals: [
                        { $match: { regionType: RegionTypeEnum.global } },
                    ],
                },
            },
        ]);
        return result;
    }
    async findOneWithBundles({
        regionCode,
        acceptLanguage,
    }: RegionWithBundlesRequestDto): Promise<Region | null> {
        const [result]: Region[] = await this.model.aggregate<Region>([
            { $match: { code: regionCode } },
            {
                $addFields: {
                    name: {
                        $cond: {
                            if: {
                                $ne: [
                                    {
                                        $ifNull: [
                                            `$name.${acceptLanguage}`,
                                            '',
                                        ],
                                    },
                                    '',
                                ],
                            },
                            then: `$name.${acceptLanguage}`,
                            else: '$name.en',
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'bundles',
                    foreignField: 'regionCode',
                    localField: 'code',
                    pipeline: [
                        { $project: { buyPrice: 0 } },
                        { $sort: { price: 1 } },
                    ],
                    as: 'bundles',
                },
            },
        ]);
        return result;
    }
}
