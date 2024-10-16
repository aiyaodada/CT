export type KeyConfig = {
    site_title?: string;
    site_subTitle?: string;
    site_description?: string;
    site_keywords?: string;
    site_url?: string;
    site_logo?: string;
    site_favicon?: string;
    mail_status?: number; // 使用数字来表示状态
    mail_host?: string;
    mail_port?: number; // 使用数字表示端口
    mail_username?: string; // 可选
    mail_password?: string; // 注意：敏感信息，使用时请小心
    mail_encryption?: string;
    watermark_type?: string;
    watermark_text?: string;
    watermark_image?: string; // 图片 URL
    watermark_status?: number; // 使用数字来表示状态
    watermark_opacity?: number; // 使用数字表示透明度（0到1）
    compress_status?: number; // 使用数字来表示状态
    compress_quality?: number; // 压缩质量，通常是0到100
    compress_thumbnail?: number; // 使用数字来表示状态
    site_contact?: string; // 使用 string 类型来保存 HTML 内容
    storage_type?: string;
    storage_tencentBucket?: string;
    storage_tencentRegion?: string;
    storage_tencentSecretId?: string; // 注意：敏感信息，使用时请小心
    storage_tencentSecretKey?: string; // 注意：敏感信息，使用时请小心
    storage_tencentCompressStyle?: string;
    storage_tencentThumbnailStyle?: string;
    storage_s3Endpoint?: string;
    storage_s3Bucket?: string;
    storage_s3AccessKeyId?: string; // 注意：敏感信息，使用时请小心
    storage_s3SecretAccessKey?: string; // 注意：敏感信息，使用时请小心
    storage_s3Region?: string; // 存储区域
    storage_s3Domain?: string;
    storage_path?: string;
    compress_format?: string;
    integral_s3ForcePathStyle?: number; // 使用数字来表示状态
    integral_articleRewardsIntegral?: number; // 积分值
    integral_commentRewardsIntegral?: number; // 积分值
    integral_likeRewardsIntegral?: number; // 积分值
    integral_articleRewardsTimes?: number; // 使用数字表示倍数
    integral_commentRewardsTimes?: number; // 使用数字表示倍数
    integral_likeRewardsTimes?: number; // 使用数字表示倍数
    integral_viewArticleIntegral?: number; // 积分值
    integral_signRewardsIntegral?: number; // 积分值
    integral_weeklyRewardsIntegral?: number; // 积分值
    integral_authorRewardsPercentage?: number; // 百分比值，通常是0到1
    integral_articleMaximumIntegral?: number; // 最大积分
    integral_dailyMaximumIntegral?: number; // 最大积分
    integral_registerIntegral?: number; // 注册积分
};
