class SankakuTag {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
module.exports.SankakuTag = SankakuTag;

class SankakuImage {
  constructor(url, width, height) {
    this.url = url;
    this.width = width;
    this.height = height;
  }
}
module.exports.SankakuImage = SankakuImage;

class SankakuPost {
  constructor(raw_api_post) {
    this.id = raw_api_post.id;
    this.preview = new SankakuImage(raw_api_post.preview_url, raw_api_post.preview_width, raw_api_post.preview_height);
    this.sample = new SankakuImage(raw_api_post.sample_url, raw_api_post.sample_width, raw_api_post.sample_height);
    this.full_res = new SankakuImage(raw_api_post.file_url, raw_api_post.width, raw_api_post.height);
    this.file_type = raw_api_post.file_type;
    this.tags = raw_api_post.tags.map(raw_tag => new SankakuTag(raw_tag.id, raw_tag.name_en));
  }
}
module.exports.SankakuPost = SankakuPost;